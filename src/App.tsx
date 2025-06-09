import React, { useState, useEffect } from 'react';
import { FaMusic, FaPause } from 'react-icons/fa';
import Couple from './components/Couple';
import WeddingInfo from './components/WeddingInfo';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import CoverImage from './components/CoverImage';
import InvitationMessage from './components/InvitationMessage';
import CoupleInfo from './components/CoupleInfo';
import TextSizeToggle from './components/TextSizeToggle';
import './App.scss';
import './components/TextSizeToggle.scss';

function App() {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio('/music/wedding-song.mp3');
    audio.loop = true;
    
    if (isMusicPlaying) {
      audio.play();
    }

    return () => audio.pause();
  }, [isMusicPlaying]);

  return (
    <div className="app">
      <main className="invitation-container">
        <div className="section cover-section">
          <div className="music-icon">
            <button 
              className="music-toggle" 
              onClick={() => setIsMusicPlaying(!isMusicPlaying)}
            >
              {isMusicPlaying ? <FaPause /> : <FaMusic />}
            </button>
          </div>
          <div className="text-size-control">
            <TextSizeToggle />
          </div>
          <CoverImage />
        </div>
        <div className="section">
          <InvitationMessage />
        </div>
        <div className="section">
          <Couple />
        </div>
        <div className="section">
          <WeddingInfo />
        </div>
        <div className="section">
          <Gallery />
        </div>
        <div className="section">
          <Contact />
        </div>
        <div className="section">
          <CoupleInfo />
        </div>
      </main>
    </div>
  );
}

export default App;
