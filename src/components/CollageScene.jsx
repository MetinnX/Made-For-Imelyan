import React from 'react';

export default function CollageScene() {
  return (
    <div className="scene-container center-content flex-col fade-in-scene">
      {/* Container formasi dibuat pas di tengah */}
      <div className="heart-formation-grid">
        {/* Loop otomatis untuk 17 foto polaroid */}
        {[...Array(17)].map((_, idx) => (
          <div 
            key={idx} 
            className={`scatter-polaroid target-pos-${idx + 1}`}
            style={{ 
              animationDelay: `${0.2 + (idx * 0.15)}s`, // Animasi sedikit dipercepat agar sebaran terasa mulus
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
