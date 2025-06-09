import './WeddingInfo.scss';

interface WeddingData {
  date: string;
  time: string;
  location: string;
  address: string;
  dressCode: string;
  mapUrl: string;
}

const weddingData: WeddingData = {
  date: '2025년 6월 10일 (토)',
  time: '오후 2시',
  location: '서울웨딩홀',
  address: '서울특별시 강남구',
  dressCode: '정장',
  mapUrl: '#'
};

export default function WeddingInfo() {
  return (
    <div className="wedding-info-section">
      <h2>결혼식 정보</h2>
      <div className="info-grid">
        <div className="info-item" data-index="0">
          <h3>일시</h3>
          <p>{weddingData.date}</p>
          <p>{weddingData.time}</p>
        </div>
        <div className="info-item" data-index="1">
          <h3>장소</h3>
          <p>{weddingData.location}</p>
          <p>{weddingData.address}</p>
        </div>
        <div className="info-item" data-index="2">
          <h3>드레스코드</h3>
          <p>{weddingData.dressCode}</p>
        </div>
        <div className="info-item" data-index="3">
          <h3>지도</h3>
          <a href={weddingData.mapUrl} target="_blank" rel="noopener noreferrer" className="map-link">
            지도보기
          </a>
        </div>
      </div>
    </div>
  );
}
