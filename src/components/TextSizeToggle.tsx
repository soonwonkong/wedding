import React, { useState } from 'react';
import { FaTextHeight } from 'react-icons/fa';

const TextSizeToggle: React.FC = () => {
  const [isLargeText, setIsLargeText] = useState(false);

  const toggleTextSize = () => {
    setIsLargeText(!isLargeText);
    document.body.classList.toggle('large-text');
  };

  return (
    <button 
      onClick={toggleTextSize}
      className="text-size-toggle"
    >
      <FaTextHeight className="text-icon" />
      <span>큰 글씨</span>
    </button>
  );
};

export default TextSizeToggle;
