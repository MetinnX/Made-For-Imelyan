uimport React, { useState } from 'react';
import BookMessage from './BookMessage';
const bgMusic = new Audio('/assets/music/background-song.mp3');


export default function BookScene({ onComplete }) {
  const [bookState, setBookState] = useState(0);

  const advanceBook = () => {
    if (bookState === 0) {
      setBookState(1);
    } else if (bookState === 1) {
      setBookState(2);
    } else if (bookState === 2) {
      setBookState(0);
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 1500);
    }
  };

  return (
    <div className="scene-container">
      {/* --- LAPISAN BINTANG BERTERBANGAN (BACKGROUND) --- */}
      <div className="starfield"></div>

      {/* --- KOTAK TEKS DI ATAS BUKU --- */}
      <BookMessage bookState={bookState} />

      {/* --- BAGIAN BUKU --- */}
      <div className="book-wrapper">
        <div className={`book-3d ${bookState > 0 ? 'is-opened' : ''}`}>
          
          {/* LEMBARAN 1 (Cover Depan & Halaman Kiri 1) */}
          <div 
            className={`book-sheet ${bookState >= 1 ? 'flipped-180' : ''}`} 
            onClick={advanceBook}
            style={{ zIndex: bookState === 0 ? 3 : 1 }}
          >
            <div className="sheet-face face-front">
              <img src="/assets/images/cover-buku.jpg" alt="Cover Depan" />
            </div>
            <div className="sheet-face face-back">
              <img src="/assets/images/pasangan-kiri-1.jpg" alt="Foto Kiri 1" />
            </div>
          </div>

          {/* LEMBARAN 2 (Halaman Kanan 1 & Halaman Kiri 2) */}
          <div 
            className={`book-sheet ${bookState >= 2 ? 'flipped-180' : ''}`} 
            onClick={advanceBook}
            style={{ zIndex: 2 }}
          >
            <div className="sheet-face face-front">
              <img src="/assets/images/pasangan-kanan-1.jpg" alt="Foto Kanan 1" />
            </div>
            <div className="sheet-face face-back">
              <img src="/assets/images/pasangan-kiri-2.jpg" alt="Foto Kiri 2" />
            </div>
          </div>

          {/* HALAMAN DASAR (Halaman Kanan 2 / Terakhir) */}
          <div className="book-sheet base-sheet" onClick={advanceBook} style={{ zIndex: 1 }}>
            <div className="sheet-face face-front">
              <img src="/assets/images/pasangankanan2.jpg" alt="Foto Kanan 2" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
