import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link to="/" className="logo">
          <img src="/img/logo.png" alt="Teklearn Logo" className="nav-logo-img" />
        </Link>
        
        <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </div>

        {/* We can still render the links in the mobile menu overlay */}
        <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
          <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
          <li><Link to="/about" onClick={() => setIsOpen(false)}>About</Link></li>
          <li><Link to="/gallery" onClick={() => setIsOpen(false)}>Events</Link></li>
          <li><Link to="/course" onClick={() => setIsOpen(false)}>Courses</Link></li>
          <li>
            <a 
              href="/#hive" 
              style={{ color: '#fcd34d', cursor: 'pointer' }} 
              onClick={(e) => {
                if (window.location.pathname === '/') {
                  e.preventDefault();
                  document.getElementById('hive')?.scrollIntoView({ behavior: 'smooth' });
                }
                setIsOpen(false);
              }}
            >
              Hive
            </a>
          </li>
          <li><Link to="/coming-soon" onClick={() => setIsOpen(false)}>Portfolio</Link></li>
          <li><Link to="/coming-soon" className="btn btn-light nav-btn" onClick={() => setIsOpen(false)}>Login</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
