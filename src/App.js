import React, { useState } from 'react';
import './App.css'; // <-- PENTING: Tambahkan baris ini agar efek bintang dari App.css aktif!
import MatrixScene from './MatrixScene';
import BookScene from './BookScene';
import CollageScene from './CollageScene';

export default function App() {
  const [scene, setScene] = useState(1);

  return (
    <div className="main-viewport">
      {/* 1. BINTANG DIKUNCI DI SINI (GLOBAL BACKGROUND) */}
      <div className="starfield"></div>

      {/* 2. KONTEN PROGRAM / SCENE BERGANTI DI BAWAHNYA */}
      {scene === 1 && <MatrixScene onComplete={() => setScene(2)} />}
      {scene === 2 && <BookScene onComplete={() => setScene(3)} />}
      {scene === 3 && <CollageScene />}
    </div>
  );
}
