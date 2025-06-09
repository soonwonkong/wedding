import { useState } from 'react';
import './InvitationCard.scss';

interface InvitationData {
  name: string;
  date: string;
  time: string;
  location: string;
  address: string;
  dressCode: string;
}

const InvitationData: InvitationData = {
  name: '박정민 신부님 + 김지연 신부님',
  date: '2023년 10월 14일',
  time: '12:00',
  location: '서울 웨딩홀',
  address: '서울특별시 강남구',
  dressCode: '정장',
};

export default function InvitationCard() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="invitation-card">
      <div className="card-header">
        <div className="card-title">결혼식 초대장</div>
        <button
          className="expand-button"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? '▲' : '▼'}
        </button>
      </div>
      
      {isExpanded && (
        <div className="card-content">
          <div className="couple-names">
            {InvitationData.name}
          </div>
          <div className="event-details">
            <div className="date">{InvitationData.date}</div>
            <div className="time">{InvitationData.time}</div>
            <div className="location">{InvitationData.location}</div>
            <div className="address">{InvitationData.address}</div>
            <div className="dress-code">드레스코드: {InvitationData.dressCode}</div>
          </div>
        </div>
      )}
    </div>
  );
}
