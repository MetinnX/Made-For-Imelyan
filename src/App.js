import React, { useState, useEffect } from 'react';
import BookScene from './BookScene';
import MatrixScene from './MatrixScene';
import CollageScene from './CollageScene';

// Taruh audio di file utama agar bisa dikontrol global
const bgMusic = new Audio('/assets/music/background-song.mp3');
bgMusic.loop = true;

export default function App() {
  const [currentScene, setCurrentScene] = useState('book');

  // Putar musik sejak awal aplikasi dimuat
  useEffect(() => {
    bgMusic.play().catch(() => {
      console.log("Autoplay diblokir, akan berbunyi setelah user klik layar.");
    });
  }, []);

  // Fungsi global untuk memaksa musik jalan saat ada interaksi/klik tombol
  const handleUserInteraction = () => {
    if (bgMusic.paused) {
      bgMusic.play().catch(e => console.log(e));
    }
  };

  return (
    <div onClick={handleUserInteraction}> 
      {currentScene === 'book' && (
        <BookScene onComplete={() => setCurrentScene('collage')} />
      )}
      
      {currentScene === 'collage' && (
        <CollageScene bgMusic={bgMusic} /> 
        /* Kamu bisa lempar `bgMusic` sebagai props ke CollageScene jika ingin membuat tombol pause di sana */
      )}
    </div>
  );
}
