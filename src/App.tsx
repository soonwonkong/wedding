import Couple from './components/Couple';
import WeddingInfo from './components/WeddingInfo';
import PhotoGallery from './components/PhotoGallery';
import Contact from './components/Contact';
import BankTransfer from './components/BankTransfer';
import CoverImage from './components/CoverImage';
import InvitationMessage from './components/InvitationMessage';
import FloatingControls from './components/FloatingControls';
import './App.scss';

function App() {

  return (
    <div className="app">
      <FloatingControls />
      <main className="invitation-container">
        <div className="section cover-section">
          <CoverImage />
        </div>
        <div className="section">
          <InvitationMessage />
        </div>
        <div className="section">
          <Couple />
        </div>
        <div className="section">
          <WeddingInfo />
        </div>
        <div className="section">
          <PhotoGallery />
        </div>
        <div className="section">
          <Contact />
        </div>
        <div className="section">
          <BankTransfer />
        </div>
      </main>
    </div>
  );
}

export default App;
