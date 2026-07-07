import React, { useEffect, useRef, useState } from 'react';

export default function ParticleText({ onComplete }) {
  const canvasRef = useRef(null);
  const [text, setText] = useState("3");
  const particlesRef = useRef([]);
  const sequence = ["3", "2", "1", "GIFT", "FORR", "YOUU", "IMEL", "❤️"];

  // 1. Sequence Kata / Huruf
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index++;
      if (index < sequence.length) {
        setText(sequence[index]);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 2000);
      }
    }, 2200);
    
    return () => clearInterval(interval);
  }, [onComplete]);

  // 2. Logika Animasi & Kalkulasi Partikel
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    
    // Set ukuran canvas utama sesuai viewport awal
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Dimensi area teks dibatasi agar TIDAK memenuhi full layar dan anti-lag
    const AREA_WIDTH = 450;
    const AREA_HEIGHT = 250;

    const getTargetCoordinates = (currentWidth, currentHeight) => {
      const offscreen = document.createElement('canvas');
      offscreen.width = AREA_WIDTH;
      offscreen.height = AREA_HEIGHT;
      const octx = offscreen.getContext('2d');
      
      octx.fillStyle = 'white';
      octx.textAlign = 'center';
      octx.textBaseline = 'middle';
      
      // Ukuran font dikunci agar proporsional di tengah kotak area
      const fontSize = text === '❤️' ? 110 : 85;
      octx.font = `900 ${fontSize}px "Arial Black", sans-serif`;
      octx.fillText(text === '❤️' ? '♥' : text, AREA_WIDTH / 2, AREA_HEIGHT / 2);
      
      const imgData = octx.getImageData(0, 0, AREA_WIDTH, AREA_HEIGHT).data;
      const targets = [];
      const step = 5; // Jarak antar partikel (sweet spot)

      for (let y = 0; y < AREA_HEIGHT; y += step) {
        for (let x = 0; x < AREA_WIDTH; x += step) {
          const alpha = imgData[(y * AREA_WIDTH + x) * 4 + 3];
          if (alpha > 128) {
            // Petakan posisi koordinat tepat di tengah-tengah layar utama
            const screenX = (currentWidth / 2) - (AREA_WIDTH / 2) + x;
            const screenY = (currentHeight / 2) - (AREA_HEIGHT / 2) + y;
            targets.push({ x: screenX, y: screenY });
          }
        }
      }
      return targets;
    };

    // Ambil koordinat target awal
    let targets = getTargetCoordinates(canvas.width, canvas.height);
    const currentParticles = particlesRef.current;

    // Siklus daur ulang partikel agar transisi antar kata super smooth
    particlesRef.current = targets.map((t, i) => {
      if (currentParticles[i]) {
        return {
          ...currentParticles[i],
          tx: t.x,
          ty: t.y
        };
      }
      return { 
        x: Math.random() * canvas.width, 
        y: Math.random() * canvas.height,
        vx: 0, 
        vy: 0,
        tx: t.x, 
        ty: t.y 
      };
    });

    // Handle Resize / Zoom browser secara dinamis tanpa merusak jalannya animasi
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const newTargets = getTargetCoordinates(canvas.width, canvas.height);
      particlesRef.current.forEach((p, i) => {
        if (newTargets[i]) {
          p.tx = newTargets[i].x;
          p.ty = newTargets[i].y;
        }
      });
    };
    window.addEventListener('resize', handleResize);

    // Loop Animasi Utama (Render)
    let frame;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // --- EFEK WARNA NEON GLOW SUPER TERANG ---
      ctx.shadowBlur = 15;          // Menaikkan bias cahaya pendaran luar
      ctx.shadowColor = '#ff007f';  // Pendaran pink magenta neon pekat
      ctx.fillStyle = '#ffffff';    // Inti partikel putih bersih (efek lampu pijar LED)
      // ----------------------------------------

      particlesRef.current.forEach(p => {
        const dx = p.tx - p.x;
        const dy = p.ty - p.y;
        
        // Rumus Physics Easing yang disempurnakan
        p.vx += dx * 0.035; 
        p.vy += dy * 0.035;
        p.vx *= 0.80;       
        p.vy *= 0.80;
        
        p.x += p.vx;
        p.y += p.vy;
        
        ctx.beginPath();
        // Ukuran diatur ke 2.3 agar kontras inti putih dan glow luar menyatu sempurna
        ctx.arc(p.x, p.y, 2.3, 0, Math.PI * 2);
        ctx.fill();
      });
      frame = requestAnimationFrame(animate);
    };
    
    animate();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', handleResize);
    };
  }, [text]);

  return (
    <canvas 
      ref={canvasRef} 
      style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100vw', 
        height: '100vh', 
        zIndex: 2,
        pointerEvents: 'none'
      }} 
    />
  );
}
