import React, { useState } from 'react';
import BookMessage from './BookMessage';
import './BookScene.css'; // Pastikan CSS di bawah ini diimport

export default function BookScene({ onComplete }) {
  const [bookState, setBookState] = useState(0); // 0: Tertutup, 1: Buka Hal 1, 2: Buka Hal 2

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
      {/* --- KOTAK TEKS DI ATAS BUKU (DARI FILE TERPISAH) --- */}
      <BookMessage bookState={bookState} />

      {/* --- BAGIAN BUKU (UKURAN DIATUR VIA CSS) --- */}
      <div className="book-wrapper">
        <div className={`book-3d ${bookState > 0 ? 'is-opened' : ''}`}>
          
          {/* LEMBARAN 1: COVER DEPAN & KIRI (BUKA PERTAMA) */}
          <div 
            className={`book-sheet ${bookState >= 1 ? 'flipped' : ''}`} 
            onClick={advanceBook}
            style={{ zIndex: bookState === 0 ? 3 : 1 }}
          >
            {/* SAMPUL DEPAN */}
            <div className="sheet-face face-front">
              <img src="/assets/images/cover-buku.jpg" alt="Cover Depan" />
            </div>
            {/* HALAMAN KIRI 1 */}
            <div className="sheet-face face-back">
              <img src="/assets/images/pasangan-kiri-1.jpg" alt="Foto Kiri 1" />
            </div>
          </div>

          {/* LEMBARAN 2: KANAN (BUKA PERTAMA) & KIRI (BUKA KEDUA) */}
          <div 
            className={`book-sheet ${bookState >= 2 ? 'flipped' : ''}`} 
            onClick={advanceBook}
            style={{ zIndex: 2 }}
          >
            {/* HALAMAN KANAN 1 */}
            <div className="sheet-face face-front">
              <img src="/assets/images/pasangan-kanan-1.jpg" alt="Foto Kanan 1" />
            </div>
            {/* HALAMAN KIRI 2 */}
            <div className="sheet-face face-back">
              <img src="/assets/images/pasangan-kiri-2.jpg" alt="Foto Kiri 2" />
            </div>
          </div>

          {/* HALAMAN DASAR BUKU: KANAN (BUKA KEDUA) */}
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
