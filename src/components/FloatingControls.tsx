import React from 'react';
import TextSizeToggle from './TextSizeToggle';
import MusicPlayer from './MusicPlayer';
import './FloatingControls.scss';

const FloatingControls: React.FC = () => {
  return (
    <div className="floating-controls">
      <div className="controls-container">
        <TextSizeToggle />
        <MusicPlayer />
      </div>
    </div>
  );
};

export default FloatingControls;
