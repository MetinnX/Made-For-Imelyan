import React, { useState } from 'react';
import { bgMusic } from '/assets/music/background-song.mp3');
  mp3'; // Ambil instansiasi musik yang sama

export default function CollageScene() {
  // State untuk memantau apakah musik sedang bunyi atau dijeda
  const [isPlaying, setIsPlaying] = useState(!bgMusic.paused);

  const toggleMusic = () => {
    if (bgMusic.paused) {
      bgMusic.play();
      setIsPlaying(true);
    } else {
      bgMusic.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="scene-container center-content flex-col fade-in-scene">
      
      {/* --- TOMBOL KONTROL MUSIK (FLOATING BUTTON) --- */}
      <button 
        onClick={toggleMusic}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 100,
          background: 'rgba(255, 255, 255, 0.7)',
          border: 'none',
          borderRadius: '50%',
          width: '45px',
          height: '45px',
          cursor: 'pointer',
          fontSize: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0px 4px 10px rgba(0,0,0,0.1)'
        }}
      >
        {isPlaying ? '🎵' : '🔇'}
      </button>

      {/* Container formasi dibuat pas di tengah */}
      <div className="heart-formation-grid">
        {/* Loop otomatis untuk 17 foto polaroid */}
        {[...Array(17)].map((_, idx) => (
          <div 
            key={idx} 
            className={`scatter-polaroid target-pos-${idx + 1}`}
            style={{ 
              animationDelay: `${0.2 + (idx * 0.15)}s`, 
            }} 
          >
            <div className="polaroid-frame">
              <img src={`/assets/images/love-${idx + 1}.jpg`} alt={`Memory ${idx + 1}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
