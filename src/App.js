import React, { useEffect, useState } from 'react';
import './App.css';
import MatrixScene from './components/MatrixScene';
import BookScene from './components/BookScene';
import CollageScene from './components/CollageScene';
import { getBgMusic } from './utils/music';

function App() {
  const [scene, setScene] = useState(1); // Mengatur adegan aktif (1, 2, atau 3)

  useEffect(() => {
    // Menyiapkan objek musik sekali saja agar tetap berjalan lintas scene.
    getBgMusic();
  }, []);

  return (
    <div className="main-viewport">
      {/* Latar Belakang Bintang Langit Malam */}
      <div className="starfield"></div>

      {/* Logika Perpindahan Adegan */}
      {scene === 1 && <MatrixScene onComplete={() => setScene(2)} />}
      {scene === 2 && <BookScene onComplete={() => setScene(3)} />}
      {scene === 3 && <CollageScene />}
    </div>
  );
}

export default App;
