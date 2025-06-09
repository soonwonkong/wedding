import Cover from './components/Cover';
import Couple from './components/Couple';
import WeddingInfo from './components/WeddingInfo';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import './App.scss';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>결혼식 초대장</h1>
      </header>
      <main className="invitation-container">
        <Cover />
        <Couple />
        <WeddingInfo />
        <Gallery />
        <Contact />
      </main>
    </div>
  );
}

export default App;
