import './WeddingInfo.scss';

interface WeddingData {
  date: string;
  time: string;
  location: string;
  address: string;
  mapUrl: string;
  mapLat: string;
  mapLng: string;
}

const weddingData: WeddingData = {
  date: '2025년 6월 10일 (토)',
  time: '오후 2시',
  location: 'AW컨벤션',
  address: '경기 안산시 단원구 광덕1로 171',
  mapUrl: 'https://m.map.naver.com/map.naver?lat=37.3082131&lng=126.8287927&dlevel=20&mapMode=&pinTitle=AW%EC%BB%A8%EB%B2%A4%EC%85%98&boundary=&traffic=',
  mapLat: '37.3082131',
  mapLng: '126.8287927'
};

export default function WeddingInfo() {
  const startNavigation = (app: string) => {
    const { mapLat, mapLng, location, address } = weddingData;
    const fullAddress = `${address} ${location}`;
    
    if (app === 'tmap') {
      window.open(`tmap://route?goalx=${mapLng}&goaly=${mapLat}&goalname=${encodeURIComponent(location)}`);
    } else if (app === 'kakao') {
      window.open(`kakaomap://route?ep=${mapLat},${mapLng}&by=PUBLIC_TRANSIT&e=${encodeURIComponent(location)}`);
    } else {
      window.open(`https://m.map.naver.com/search2/search.nhn?query=${encodeURIComponent(fullAddress)}`);
    }
  };

  return (
    <div className="wedding-info-section">
      <div className="wedding-details">
        <h2>결혼식 정보</h2>
        <div className="info-item">
          <h3>일시</h3>
          <p>{weddingData.date}</p>
          <p>{weddingData.time}</p>
        </div>
        <div className="info-item">
          <h3>장소</h3>
          <p>{weddingData.location}</p>
          <p>{weddingData.address}</p>
        </div>
      </div>

      <div className="map-section">
        <h3>오시는 길</h3>
        <div className="map-buttons">
          <button onClick={() => startNavigation('tmap')} className="map-button">
            티맵
          </button>
          <button onClick={() => startNavigation('kakao')} className="map-button">
            카카오내비
          </button>
          <button onClick={() => startNavigation('naver')} className="map-button">
            네이버 지도
          </button>
        </div>
      </div>
    </div>
  );
}
