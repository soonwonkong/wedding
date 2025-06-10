import { useState } from 'react';
import './Contact.scss';

export default function Contact() {
  const [activeContact, setActiveContact] = useState<string | null>(null);

  const toggleContact = (type: string) => {
    setActiveContact(activeContact === type ? null : type);
  };

  const renderContactInfo = (type: string, name: string, phone: string) => (
    <div className={`contact-info ${activeContact === type ? 'active' : ''}`}>
      <div className="contact-header" onClick={() => toggleContact(type)}>
        <span className="emoji">
          {type === 'groom' && '👰‍♂️'}
          {type === 'bride' && '👰'}
          {type === 'groom-father' && '👨'}
          {type === 'groom-mother' && '👩'}
          {type === 'bride-father' && '👨'}
          {type === 'bride-mother' && '👩'}
        </span>
        <div className="name">
          {name}
        </div>
        <span className="toggle">{activeContact === type ? '▲' : '▼'}</span>
      </div>
      {activeContact === type && (
        <a href={`sms:${phone}`} className="phone">
          {phone}
        </a>
      )}
    </div>
  );

  return (
    <div className="contacts-section">
      <h2 className="contacts-title">연락처</h2>
      <p className="contacts-subtitle">축하의 말씀을 전해주세요</p>
      
      <div className="contacts-grid">
        <div className="contact-row">
          {renderContactInfo('groom', '신랑', '010-7922-2278')}
          {renderContactInfo('bride', '신부', '010-8803-3899')}
        </div>
        <div className="contact-row">
          {renderContactInfo('groom-father', '신랑 아버지', '010-7922-2278')}
          {renderContactInfo('bride-father', '신부 아버지', '010-8803-3899')}
        </div>
        <div className="contact-row">
          {renderContactInfo('groom-mother', '신랑 어머니', '010-7922-2278')}
          {renderContactInfo('bride-mother', '신부 어머니', '010-8803-3899')}
        </div>
      </div>
    </div>
  );
}
