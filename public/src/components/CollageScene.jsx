import React from 'react';

export default function CollageScene() {
  return (
    <div className="scene-container center-content flex-col fade-in-scene">
      <h1 className="epic-title">I ❤️ YOU</h1>
      <div className="heart-formation-grid">
        {/* Melakukan pengulangan otomatis untuk merender 17 bingkai foto polaroid */}
        {[...Array(17)].map((_, idx) => (
          <div 
            key={idx} 
            className={`scatter-polaroid target-pos-${idx + 1}`}
            style={{ animationDelay: `${0.3 + (idx * 0.25)}s` }} // Memberikan jeda muncul beruntun
          >
            {/* Foto dipanggil berurutan dari love-1.jpg sampai love-17.jpg */}
            <img src={`/assets/images/love-${idx + 1}.jpg`} alt={`Memory ${idx + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
