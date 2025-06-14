import React from 'react';
import './CoverImage.scss';

const CoverImage: React.FC = () => {
  return (
    <div className="cover-image">
      <img src="images/cover.PNG" alt="Wedding Cover" className="cover-image__img" />
      <div className="cover-image__overlay">
        <div className="cover-content">
          <h1>Wedding Invitation</h1>
          <h2>강순원 신랑님 + 강순원 신부님</h2>
          <p>2026년 1월 10일</p>
        </div>
      </div>
    </div>
  );
};

export default CoverImage;
