import React from 'react';

export default function BookMessage({ bookState }) {
  return (
    <div className="message-card">
      {bookState === 0 && (
        <>
          <h3 className="message-title">Happy Birthday Imelyan! ❤️</h3>
          <p className="message-subtitle">Sentuh buku di bawah untuk membuka</p>
        </>
      )}
      
      {bookState === 1 && (
        <>
          <h4 className="message-title">Dear Imelyan..</h4>
          <p className="message-text">
            Selamat ulang tahun! Di hari yang sangat spesial ini, aku sengaja meluangkan waktu membuatkan website kejutan ini khusus untukmu.
          </p>
          <p className="message-quote">"Happy Birthday Sayang ❤️"</p>
        </>
      )}
      
      {bookState === 2 && (
        <>
          <h4 className="message-title">Harapanku...</h4>
          <p className="message-text">
            Semoga di usia yang baru ini kebahagiaan selalu menyertai setiap langkahmu. Silakan sentuh lagi untuk menutup buku, ada kejutan terakhir untukmu.
          </p>
          <p className="message-quote">"As long as you're here..."</p>
        </>
      )}
    </div>
  );
}
