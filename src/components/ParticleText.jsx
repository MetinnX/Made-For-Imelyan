import React, { useEffect, useRef, useState } from 'react';

export default function ParticleText({ onComplete }) {
  const canvasRef = useRef(null);
  const [text, setText] = useState("3");
  const particlesRef = useRef([]);
  const sequence = ["3", "2", "1", "GIFT", "FORR", "YOUU", "IMELL", "❤️"];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index++;
      if (index < sequence.length) {
        setText(sequence[index]);
      } else {
        clearInterval(interval);
        onComplete();
      }
    }, 1500); // Durasi diperpanjang agar animasi smooth punya waktu lebih lama
    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const getTargetCoordinates = () => {
      const off = document.createElement('canvas');
      off.width = canvas.width; off.height = canvas.height;
      const octx = off.getContext('2d');
      octx.fillStyle = 'white';
      octx.textAlign = 'center';
      octx.textBaseline = 'middle';
      const size = Math.min(canvas.width * 0.4, 400);
      octx.font = `900 ${size}px "Arial Black", sans-serif`;
      octx.fillText(text === '❤️' ? '♥' : text, canvas.width / 2, canvas.height / 2);
      
      const img = octx.getImageData(0, 0, canvas.width, canvas.height).data;
      const targets = [];
      // Step diperkecil (7) untuk bentuk yang jauh lebih detail dan sempurna
      for (let y = 0; y < canvas.height; y += 7) {
        for (let x = 0; x < canvas.width; x += 7) {
          if (img[(y * canvas.width + x) * 4 + 3] > 128) targets.push({ x, y });
        }
      }
      return targets;
    };

    const targets = getTargetCoordinates();
    
    // Inisialisasi/Update partikel dengan sistem velocity
    particlesRef.current = targets.map((t, i) => {
      const p = particlesRef.current[i] || { 
        x: Math.random() * canvas.width, 
        y: Math.random() * canvas.height,
        vx: 0, vy: 0 // Velocity (kecepatan)
      };
      return { ...p, tx: t.x, ty: t.y };
    });

    let frame;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Glow/Neon yang jauh lebih tajam dan terang
      ctx.shadowBlur = 20; 
      ctx.shadowColor = '#ff007f'; // Warna Pink Neon intens
      ctx.fillStyle = '#ff71ce';   // Inti warna pink yang sangat cerah

      particlesRef.current.forEach(p => {
        // Fisika Smooth: Menambahkan akselerasi (spring physics)
        const dx = p.tx - p.x;
        const dy = p.ty - p.y;
        
        p.vx += dx * 0.02; // Acceleration (kekuatan tarikan)
        p.vy += dy * 0.02;
        p.vx *= 0.85;       // Friction (agar gerakan tidak kaku/menghaluskan berhenti)
        p.vy *= 0.85;
        
        p.x += p.vx;
        p.y += p.vy;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.8, 0, Math.PI * 2);
        ctx.fill();
      });
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frame);
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
