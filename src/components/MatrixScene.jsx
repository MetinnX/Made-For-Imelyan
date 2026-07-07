import React, { useEffect, useRef, useState } from 'react';

export default function MatrixScene({ onComplete }) {
  const canvasRef = useRef(null);
  const [assetsReady, setAssetsReady] = useState(false);
  const imageList = [...Array.from({ length: 30 }, (_, i) => `/assets/images/${i + 1}.jpg`)];

  // 1. Preload Gambar
  useEffect(() => {
    Promise.all(
      imageList.map(
        (src) =>
          new Promise((r) => {
            const img = new Image();
            img.onload = r;
            img.onerror = r;
            img.src = src;
          })
      )
    ).then(() => setAssetsReady(true));
  }, []);

  // 2. Efek Matrix + Partikel Teks Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const alphabet = "HAPPYBIRTHDAYANITA";
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const rainDrops = Array.from({ length: columns }).map(() => 1);

    // Urutan yang akan dimunculkan
    const sequence = ["3", "2", "1", "HAPPY", "BIRTHDAY", "TO", "ANITA", "♥"];
    let currentSeqIndex = -1;
    let particles = []; // Menyimpan titik koordinat (x, y) untuk membentuk huruf
    let lastSeqTime = 0;
    let matrixInterval;

    // Fungsi untuk membaca piksel dari teks dan mengubahnya menjadi titik partikel
    const getParticles = (text) => {
      const offscreen = document.createElement('canvas');
      offscreen.width = canvas.width;
      offscreen.height = canvas.height;
      const octx = offscreen.getContext('2d', { willReadFrequently: true });

      octx.fillStyle = 'white';
      octx.textBaseline = 'middle';
      octx.textAlign = 'center';
      
      // Mengatur ukuran font agar responsif di HP (portrait) maupun Desktop
      let dynamicFontSize;
      if (text === '♥') {
        dynamicFontSize = Math.min(canvas.width * 0.6, 250);
      } else if (text.length === 1) {
        dynamicFontSize = Math.min(canvas.width * 0.5, 300); // Untuk angka 3, 2, 1
      } else {
        dynamicFontSize = Math.min((canvas.width / text.length) * 1.5, 120); // Untuk kata-kata
      }
      
      octx.font = `bold ${dynamicFontSize}px monospace`;
      octx.fillText(text, canvas.width / 2, canvas.height / 2);

      const imgData = octx.getImageData(0, 0, canvas.width, canvas.height).data;
      const newParticles = [];
      const step = 12; // Kepadatan titik (semakin kecil = semakin rapat)

      for (let y = 0; y < canvas.height; y += step) {
        for (let x = 0; x < canvas.width; x += step) {
          const alpha = imgData[(y * canvas.width + x) * 4 + 3];
          // Jika piksel tersebut tidak transparan (bagian dari teks)
          if (alpha > 128) {
            newParticles.push({ x, y });
          }
        }
      }
      return newParticles;
    };

    const draw = () => {
      const now = Date.now();
      
      // Pindah ke kata/angka berikutnya setiap 1.2 detik (1200ms)
      if (now - lastSeqTime > 1200 && currentSeqIndex < sequence.length - 1) {
        currentSeqIndex++;
        lastSeqTime = now;
        particles = getParticles(sequence[currentSeqIndex]);
      }

      // Efek jejak Matrix (membuat background memudar pelan)
      ctx.fillStyle = 'rgba(11, 9, 20, 0.2)'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // --- A. Render Hujan Matrix Background ---
      ctx.font = fontSize + 'px monospace';
      for (let i = 0; i < rainDrops.length; i++) {
        // Warna hujan di background sengaja dibuat lebih redup agar teks tengah menonjol
        ctx.fillStyle = 'rgba(255, 71, 126, 0.3)'; 
        const text = alphabet[Math.floor(Math.random() * alphabet.length)];
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }

      // --- B. Render Teks Partikel Foreground ---
      // Ini yang membentuk angka 3, 2, 1, dan huruf dengan karakter acak
      ctx.fillStyle = '#ff477e'; // Warna neon pink terang
      ctx.font = 'bold 12px monospace';
      particles.forEach(p => {
        // Pilih huruf acak terus-menerus untuk menciptakan efek 'noise/berkedip' khas Matrix
        const randomChar = alphabet[Math.floor(Math.random() * alphabet.length)];
        ctx.fillText(randomChar, p.x, p.y);
      });
    };

    matrixInterval = setInterval(draw, 40);

    // Durasi timer sebelum pindah ke scene selanjutnya
    const totalDuration = sequence.length * 1200 + 2000; 
    const sceneTimer = setTimeout(() => {
      if (assetsReady) {
        onComplete();
        return;
      }
      const i = setInterval(() => {
        if (assetsReady) {
          clearInterval(i);
          onComplete();
        }
      }, 100);
    }, totalDuration);

    return () => {
      clearInterval(matrixInterval);
      clearTimeout(sceneTimer);
    };
  }, [onComplete, assetsReady]);

  return (
    <div className="scene-container center-content" style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {/* Semua efek sekarang digambar murni dari dalam Canvas */}
      <canvas ref={canvasRef} className="matrix-canvas" style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }} />
      
      {/* Elemen h1 dan div hati sudah dihapus agar tidak numpuk */}
      <div className="overlay-text-wrapper" style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%', paddingBottom: '10vh' }}>
        <p style={{ color: "white", fontSize: 14, opacity: 0.5, fontFamily: 'monospace' }}>
          {assetsReady ? "" : "Loading memories..."}
        </p>
      </div>
    </div>
  );
}
