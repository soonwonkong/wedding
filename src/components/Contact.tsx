import './Contact.scss';

interface Contact {
  name: string;
  phone: string;
  email: string;
}

const contactData = [
  {
    name: '신랑',
    phone: '010-1234-5678',
    email: 'groom@example.com'
  },
  {
    name: '신부',
    phone: '010-9876-5432',
    email: 'bride@example.com'
  }
];

export default function Contact() {
  return (
    <div className="contact-section">
      <h2>연락처</h2>
      <div className="contact-grid">
        {contactData.map((contact, index) => (
          <div key={index} className="contact-card" data-index={index}>
            <div className="contact-info">
              <h3>{contact.name}</h3>
              <div className="contact-item">
                <span className="contact-label">전화:</span>
                <a href={`tel:${contact.phone}`} className="contact-link">
                  {contact.phone}
                </a>
              </div>
              <div className="contact-item">
                <span className="contact-label">이메일:</span>
                <a href={`mailto:${contact.email}`} className="contact-link">
                  {contact.email}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
