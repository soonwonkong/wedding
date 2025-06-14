import { FaTimes, FaPhone, FaSms } from 'react-icons/fa';
import './ContactPopup.scss';

interface ContactInfo {
  type: string;
  name: string;
  phone: string;
  relation: string;
}

interface ContactPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactPopup: React.FC<ContactPopupProps> = ({ isOpen, onClose }) => {
  const contacts: ContactInfo[] = [
    { type: 'groom', name: '신랑', phone: '010-7922-2278', relation: '신랑' },
    { type: 'bride', name: '신부', phone: '010-8803-3899', relation: '신부' },
    { type: 'groom-father', name: '신랑 아버지', phone: '010-7922-2278', relation: '신랑 아버지' },
    { type: 'bride-father', name: '신부 아버지', phone: '010-8803-3899', relation: '신부 아버지' },
    { type: 'groom-mother', name: '신랑 어머니', phone: '010-7922-2278', relation: '신랑 어머니' },
    { type: 'bride-mother', name: '신부 어머니', phone: '010-8803-3899', relation: '신부 어머니' },
  ];

  const getEmoji = (type: string) => {
    switch (type) {
      case 'groom':
        return '👰‍♂️';
      case 'bride':
        return '👰';
      case 'groom-father':
      case 'bride-father':
        return '👨';
      case 'groom-mother':
      case 'bride-mother':
        return '👩';
      default:
        return '👤';
    }
  };

  if (!isOpen) return null;

  // Separate contacts into groom and bride sides
  const groomSide = contacts.filter(contact => contact.type.startsWith('groom'));
  const brideSide = contacts.filter(contact => contact.type.startsWith('bride'));

  const renderContactColumn = (contacts: ContactInfo[], title: string) => (
    <div className="contact-column">
      <h3 className="column-title">{title}</h3>
      <div className="contacts-list">
        {contacts.map((contact) => (
          <div key={contact.type} className="contact-card">
            <div className="contact-header">
              <span className="emoji">{getEmoji(contact.type)}</span>
              <div className="contact-names">
                <div className="name">{contact.name}</div>
                <div className="relation">{contact.relation}</div>
              </div>
            </div>
            <div className="contact-actions">
              <a href={`tel:${contact.phone}`} className="action-button phone">
                <FaPhone /> 전화
              </a>
              <a href={`sms:${contact.phone}`} className="action-button message">
                <FaSms /> 문자
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="contact-popup-overlay" onClick={onClose}>
      <div className="contact-popup" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          <FaTimes />
        </button>
        <h2>연락처 정보</h2>
        <p className="popup-subtitle">축하의 말씀을 전해주세요</p>
        
        <div className="contacts-container">
          {renderContactColumn(groomSide, '신랑 측')}
          {renderContactColumn(brideSide, '신부 측')}
        </div>
      </div>
    </div>
  );
};

export default ContactPopup;
