import React from 'react';

export default function BookMessage({ bookState }) {
  return (
    <div className="message-card">
      {bookState === 0 && (
        <>
          <h3 className="message-title">Hallow Sayangku! ❤️</h3>
          <p className="message-subtitle">Sentuh buku di bawah untuk membuka</p>
        </>
      )}
      
      {bookState === 1 && (
        <>
          <h4 className="message-title">Dear Imelyan..</h4>
          <p className="message-text">
            Maaf sayang belum bisa bakase yang terbaik untk brpa bulan ini🙂, Tapi kalau aku ad rejeki tetap aku m bantu apa yang kau sukaa yaa

          </p>
          <p className="message-quote">"Jadi tmbah syangg aku ini ❤️"</p>
        </>
      )}
      
      {bookState === 2 && (
        <>
          <h4 className="message-title">Hrapansihh...</h4>
          <p className="message-text">
            Semoga trng bisa bkasee trun trng p EGOO!! biar mslah sbesar apapun. suapaya trang ttap SAMA - SAMA TURUS🫂.
          </p>
          <p className="message-quote">"Loveyouu syngkuu imell..."</p>
        </>
      )}
    </div>
  );
}
