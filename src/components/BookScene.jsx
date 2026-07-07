import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { bookPages } from './texts'; // Sesuaikan path

// Musik - gunakan useEffect agar tidak re-render
const backgroundMusic = new Audio('/assets/music/lagu-ulang-tahun.mp3'); 

export default function BookScene({ onComplete }) {
  const [page, setPage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Handle Music
  const playMusic = () => {
    if (!isPlaying) {
      backgroundMusic.loop = true;
      backgroundMusic.play().catch(e => console.log("User interaction needed"));
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    playMusic();
    if (page < bookPages.length - 1) {
      setPage(page + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (page > 0) setPage(page - 1);
  };

  return (
    <div className="scene-container" style={{ 
      display: 'flex', justifyContent: 'center', alignItems: 'center', 
      minHeight: '100vh', background: '#000', overflow: 'hidden' 
    }}>
      
      {/* Container Buku (Bisa diatur ukurannya via CSS/Style) */}
      <motion.div 
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={(e, { offset, velocity }) => {
          if (offset.x < -50) handleNext(); // Geser ke kiri untuk Next
          if (offset.x > 50) handlePrev();  // Geser ke kanan untuk Prev
        }}
        className="book-container"
        style={{
          width: '90%',
          maxWidth: '400px', // Bisa diatur untuk memperbesar/kecil
          aspectRatio: '3/4',
          cursor: 'grab'
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -90, opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ 
              width: '100%', height: '100%', 
              background: 'white', borderRadius: '15px',
              padding: '20px', textAlign: 'center',
              boxShadow: '0 20px 50px rgba(255,255,255,0.1)'
            }}
          >
            <img 
              src={bookPages[page].image} 
              alt="Page" 
              style={{ width: '100%', height: '60%', objectFit: 'cover', borderRadius: '10px' }} 
            />
            <h2 style={{ color: '#b55a5a', marginTop: '20px' }}>{bookPages[page].title}</h2>
            <p style={{ color: '#444' }}>{bookPages[page].body}</p>
          </motion.div>
        </AnimatePresence>
      </motion.div>

    </div>
  );
}
