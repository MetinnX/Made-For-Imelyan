import React, { useState } from 'react';
import './App.css';
import MatrixScene from './components/MatrixScene';
import BookScene from './components/BookScene';
import CollageScene from './components/CollageScene';

function App() {
  const [scene, setScene] = useState(1); // Mengatur adegan aktif (1, 2, atau 3)

  return (
    <div className="main-viewport">
      {/* Latar Belakang Bintang Langit Malam */}
      <div className="starfield"></div>

      {/* Logika Perpindahan Adegan */}
      {scene === 1 && <MatrixScene onComplete={() => setScene(2)} />}
      {scene === 2 && <BookScene onComplete={() => setScene(3)} />}
      {scene === 3 && <CollageScene />}

      {/* Musik Latar Otomatis (Pastikan file background-song.mp3 ada di public/assets/music/) */}
      <audio src="/assets/music/background-song.mp3" autoPlay loop hidden />
    </div>
  );
}

export default App;
