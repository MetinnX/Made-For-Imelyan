import React, { useState } from 'react';

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
        onComplete();
      }, 1500);
    }
  };

  return (
    <div className="scene-container center-content flex-col fade-in-scene">
      {/* 
         KETERANGAN: Tombol sudah dihapus. 
         Fungsi klik dipindahkan ke dalam komponen .book-sheet 
      */}

      <div className={`book-3d ${bookState > 0 ? 'is-opened' : ''}`}>
        
        {/* LEMBARAN 1: COVER DEPAN (Dapat diklik untuk membuka) */}
        <div 
          className={`book-sheet cover-sheet ${bookState >= 1 ? 'flipped-180' : ''}`} 
          onClick={advanceBook}
          style={{ cursor: 'pointer' }}
        >
          <div className="sheet-face face-front cover-front">
            <h2>Happy Birthday Anita!</h2>
            <p className="sub-hint">Sentuh buku untuk membuka ❤️</p>
          </div>
          <div className="sheet-face face-back page-bg">
            <h3>Dear Anita...</h3>
            <p className="letter-text">
              Selamat ulang tahun! Di hari yang sangat spesial ini, aku sengaja meluangkan waktu membuatkan website kejutan ini khusus untukmu.
            </p>
          </div>
        </div>

        {/* LEMBARAN 2: FOTO HALAMAN (Dapat diklik untuk lanjut) */}
        <div 
          className={`book-sheet middle-sheet ${bookState >= 2 ? 'flipped-180' : ''}`} 
          onClick={advanceBook}
          style={{ cursor: 'pointer' }}
        >
          <div className="sheet-face face-front page-bg">
            <div className="photo-frame-container">
              <img src="/assets/images/anita-page1.jpg" alt="Anita Page 1" className="embedded-img" />
            </div>
            <p className="photo-caption">"Happy Birthday Sayang ❤️"</p>
          </div>
          <div className="sheet-face face-back page-bg">
            <div className="photo-frame-container">
              <img src="/assets/images/anita-page2.jpg" alt="Anita Page 2" className="embedded-img" />
            </div>
            <p className="photo-caption">"As long as you're here..."</p>
          </div>
        </div>

        {/* HALAMAN DASAR BUKU (Dapat diklik untuk menutup) */}
        <div 
          className="book-sheet base-sheet page-bg" 
          onClick={advanceBook}
          style={{ cursor: 'pointer' }}
        >
          <div className="sheet-face face-front">
            <h3>Harapanku...</h3>
            <p className="letter-text">
              Semoga di usia yang baru ini kebahagiaan selalu menyertai setiap langkahmu. Silakan tutup bukunya, ada satu kejutan terakhir untukmu.
            </p>
            <p className="signature">With Love ❤️</p>
          </div>
        </div>
      </div>
    </div>
  );
}
