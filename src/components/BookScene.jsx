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
      
      {/* --- KOTAK TEKS DI ATAS BUKU --- */}
      <div className="message-card" style={{
        background: 'white',
        padding: '15px 25px',
        borderRadius: '12px',
        width: '80%',
        maxWidth: '350px',
        textAlign: 'center',
        marginBottom: '40px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
      }}>
        {bookState === 0 && (
          <>
            <h3 style={{ margin: 0, color: '#b55a5a' }}>Happy Birthday Anita! ❤️</h3>
            <p style={{ margin: '5px 0 0 0', fontSize: '0.85rem', color: '#666' }}>Sentuh buku di bawah untuk membuka</p>
          </>
        )}
        
        {bookState === 1 && (
          <>
            <h4 style={{ margin: 0, color: '#b55a5a' }}>Dear Anita...</h4>
            <p style={{ margin: '8px 0', fontSize: '0.9rem', color: '#444' }}>
              Selamat ulang tahun! Di hari yang sangat spesial ini, aku sengaja meluangkan waktu membuatkan website kejutan ini khusus untukmu.
            </p>
            <p style={{ margin: 0, fontSize: '0.8rem', fontStyle: 'italic', color: '#888' }}>
              "Happy Birthday Sayang ❤️"
            </p>
          </>
        )}
        
        {bookState === 2 && (
          <>
            <h4 style={{ margin: 0, color: '#b55a5a' }}>Harapanku...</h4>
            <p style={{ margin: '8px 0', fontSize: '0.9rem', color: '#444' }}>
              Semoga di usia yang baru ini kebahagiaan selalu menyertai setiap langkahmu. Silakan sentuh lagi untuk menutup buku, ada kejutan terakhir untukmu.
            </p>
            <p style={{ margin: 0, fontSize: '0.8rem', fontStyle: 'italic', color: '#888' }}>
              "As long as you're here..."
            </p>
          </>
        )}
      </div>

      {/* --- BAGIAN BUKU --- */}
      <div className={`book-3d ${bookState > 0 ? 'is-opened' : ''}`}>
        
        {/* LEMBARAN 1: COVER DEPAN & KIRI (BUKA PERTAMA) */}
        <div 
          className={`book-sheet cover-sheet ${bookState >= 1 ? 'flipped-180' : ''}`} 
          onClick={advanceBook}
          style={{ 
            cursor: 'pointer', 
            zIndex: bookState === 0 ? 3 : 1 // Saat ditutup ada di paling atas, saat dibuka tertumpuk di paling bawah kiri
          }}
        >
          {/* SAMPUL DEPAN */}
          <div className="sheet-face face-front cover-front" style={{ width: '100%', height: '100%', padding: 0, overflow: 'hidden' }}>
            <img 
              src="/assets/images/cover-buku.jpg" 
              alt="Cover Depan" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
            />
          </div>
          {/* HALAMAN KIRI 1 */}
          <div className="sheet-face face-back page-bg" style={{ width: '100%', height: '100%', padding: 0, overflow: 'hidden' }}>
            <img 
              src="/assets/images/pasangan-kiri-1.jpg" 
              alt="Foto Pasangan Kiri 1" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
            />
          </div>
        </div>

        {/* LEMBARAN 2: KANAN (BUKA PERTAMA) & KIRI (BUKA KEDUA) */}
        <div 
          className={`book-sheet middle-sheet ${bookState >= 2 ? 'flipped-180' : ''}`} 
          onClick={advanceBook}
          style={{ 
            cursor: 'pointer', 
            zIndex: 2 // Lembaran ini selalu berada di urutan tengah
          }}
        >
          {/* HALAMAN KANAN 1 */}
          <div className="sheet-face face-front page-bg" style={{ width: '100%', height: '100%', padding: 0, overflow: 'hidden' }}>
            <img 
              src="/assets/images/pasangan-kanan-1.jpg" 
              alt="Foto Pasangan Kanan 1" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
            />
          </div>
          {/* HALAMAN KIRI 2 */}
          <div className="sheet-face face-back page-bg" style={{ width: '100%', height: '100%', padding: 0, overflow: 'hidden' }}>
            <img 
              src="/assets/images/pasangan-kiri-2.jpg" 
              alt="Foto Pasangan Kiri 2" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
            />
          </div>
        </div>

        {/* HALAMAN DASAR BUKU: KANAN (BUKA KEDUA) */}
        <div 
          className="book-sheet base-sheet page-bg" 
          onClick={advanceBook}
          style={{ 
            cursor: 'pointer', 
            zIndex: 1 // Selalu berada di urutan paling bawah (dasar buku)
          }}
        >
          {/* HALAMAN KANAN 2 */}
          <div className="sheet-face face-front" style={{ width: '100%', height: '100%', padding: 0, overflow: 'hidden' }}>
            <img 
              src="/assets/images/pasangan-kanan-2.jpg" 
              alt="Foto Pasangan Kanan 2" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
            />
          </div>
        </div>
      </div>
      
    </div>
  );
}
