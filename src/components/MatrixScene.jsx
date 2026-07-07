import React, { useEffect, useRef, useState } from 'react';
import ParticleText from './ParticleText';

export default function MatrixScene({ onComplete }) {
  const canvasRef = useRef(null);
  const [assetsReady, setAssetsReady] = useState(false);
  const imageList = [...Array.from({ length: 30 }, (_, i) => `/assets/images/${i + 1}.jpg`)];

  useEffect(() => {
    Promise.all(imageList.map(src => new Promise(r => {
      const img = new Image();
      img.onload = r; img.onerror = r; img.src = src;
    }))).then(() => setAssetsReady(true));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const alphabet = "HAPPYBIRTHDAYIMELYAN";
    const fontSize = 16;
    let columns = canvas.width / fontSize;
    let rainDrops = Array.from({ length: columns }).map(() => 1);

    const matrixInterval = setInterval(() => {
      // Background dibuat lebih gelap agar efek neon terlihat lebih terang
      ctx.fillStyle = 'rgba(5, 5, 10, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Hujan dibuat lebih bersinar (glow)
      ctx.shadowBlur = 4;
      ctx.shadowColor = '#ff477e';
      ctx.fillStyle = '#ff7eb3';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet[Math.floor(Math.random() * alphabet.length)];
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);
        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) rainDrops[i] = 0;
        rainDrops[i]++;
      }
      ctx.shadowBlur = 0; // Reset shadow agar tidak mengganggu elemen lain
    }, 40);

    return () => clearInterval(matrixInterval);
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: '#05050a', overflow: 'hidden' }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0 }} />
      {assetsReady && <ParticleText onComplete={onComplete} />}
    </div>
  );
}
