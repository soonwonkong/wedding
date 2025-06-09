import React from 'react';
import { FaHeart } from 'react-icons/fa';
import './Couple.scss';

const Couple: React.FC = () => {
  return (
    <div className="couple-section">
      <div className="couple-grid">
        <div className="couple-card groom">
          <div className="couple-image">
            <img src="/images/couple1.png" alt="신랑" />
          </div>
          <div className="couple-info">
            <span className="label groom">신랑</span>
            <span className="name">강순원</span>
          </div>
        </div>
        
        <div className="heart-center">
          <FaHeart />
        </div>
        
        <div className="couple-card bride">
          <div className="couple-image">
            <img src="/images/couple2.JPG" alt="신부" />
          </div>
          <div className="couple-info">
            <span className="label bride">신부</span>
            <span className="name">강순원</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Couple;
