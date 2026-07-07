import React, { useEffect, useRef } from 'react';

export default function MatrixScene({ onComplete }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const alphabet = "HAPPYBIRTHDAYIMELYAN❤️";
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const rainDrops = Array.from({ length: columns }).map(() => 1);

    const matrixInterval = setInterval(() => {
      ctx.fillStyle = 'rgba(11, 9, 20, 0.1)'; // Memberikan efek bayangan memudar
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#ff477e'; // Warna teks pink neon
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet[Math.floor(Math.random() * alphabet.length)];
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
    }, 30);

    // Durasi Scene 1 adalah 7 detik, lalu otomatis pindah ke Scene Buku
    const sceneTimer = setTimeout(() => {
      onComplete();
    }, 7000);

    return () => {
      clearInterval(matrixInterval);
      clearTimeout(sceneTimer);
    };
  }, [onComplete]);

  return (
    <div className="scene-container center-content">
      <canvas ref={canvasRef} className="matrix-canvas" />
      <div className="overlay-text-wrapper">
        <h1 className="pulse-text-matrix">TO IMELYAN</h1>
        <div className="matrix-heart">❤️</div>
      </div>
    </div>
  );
}
