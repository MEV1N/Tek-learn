import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Course from './pages/Course';
import AdminPanel from './pages/AdminPanel';
import ComingSoon from './pages/ComingSoon';
import Gallery from './pages/Gallery';
import { DataProvider } from './context/DataContext';
import './App.css';

function App() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <DataProvider>
      <Router>
        <div className="app-container">
          {/* Global Glow Cursor Effect */}
          <div className="cursor-glow" ref={cursorRef} />
          
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/course" element={<Course />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/coming-soon" element={<ComingSoon />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
