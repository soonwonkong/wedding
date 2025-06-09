import React from 'react';
import './Couple.scss';

interface Couple {
  name: string;
  image: string;
  description: string;
}

const coupleData: Couple[] = [
  {
    name: '박정민 신부님',
    image: '/couple1.jpg',
    description: '신랑 소개글이 들어갑니다.'
  },
  {
    name: '김지연 신부님',
    image: '/couple2.jpg',
    description: '신부 소개글이 들어갑니다.'
  }
];

export default function Couple(): JSX.Element {
  return (
    <div className="couple-section">
      <h2>신랑 신부 소개</h2>
      <div className="couple-grid">
        {coupleData.map((couple: typeof Couple, index: number) => (
          <div key={index} className="couple-card" data-index={index}>
            <div className="couple-image">
              <img src={couple.image} alt={couple.name} />
            </div>
            <div className="couple-info">
              <h3>{couple.name}</h3>
              <p>{couple.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
            <div className="couple-image">
              <img src={couple.image} alt={couple.name} />
            </div>
            <div className="couple-info">
              <h3>{couple.name}</h3>
              <p>{couple.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
