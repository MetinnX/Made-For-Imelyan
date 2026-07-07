import React, { useEffect, useRef, useState } from 'react';
import ParticleText from './ParticleText';

export default function MatrixScene({ onComplete }) {
  const canvasRef = useRef(null);
  const [assetsReady, setAssetsReady] = useState(false);
  const imageList = [...Array.from({ length: 30 }, (_, i) => `/assets/images/${i + 1}.jpg`)];

  // Preload gambar tetap dipertahankan
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

    const alphabet = "HAPPYBIRTHDAYANITA";
    const fontSize = 16;
    let columns = canvas.width / fontSize;
    let rainDrops = Array.from({ length: columns }).map(() => 1);

    const matrixInterval = setInterval(() => {
      ctx.fillStyle = 'rgba(11, 9, 20, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(255, 71, 126, 0.15)';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet[Math.floor(Math.random() * alphabet.length)];
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);
        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) rainDrops[i] = 0;
        rainDrops[i]++;
      }
    }, 40);

    return () => clearInterval(matrixInterval);
  }, []);

  return (
    <div className="scene-container" style={{ position: 'relative', width: '100vw', height: '100vh', backgroundColor: '#0b0914' }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }} />
      {/* ParticleText dijalankan setelah aset siap */}
      {assetsReady && <ParticleText onComplete={onComplete} />}
    </div>
  );
}
