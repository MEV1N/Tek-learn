import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <img src="/img/logo.png" alt="Teklearn Logo" className="footer-logo-img" />
          <p>Real projects. Real skills. Real outcomes. Learn from industry professionals.</p>
          <div className="social-links">
            <a href="mailto:teklearn1@gmail.com" aria-label="Email"><Mail size={20} /></a>
            <a href="tel:+917306134850" aria-label="Phone"><Phone size={20} /></a>
            <a href="https://share.google/9IWLLlJkAt5tiM6fv" target="_blank" rel="noopener noreferrer" aria-label="Location"><MapPin size={20} /></a>
          </div>
        </div>
        
        <div className="footer-links">
          <div className="link-group">
            <h4>Company</h4>
            <Link to="/about">About Us</Link>
            <Link to="/services">Careers</Link>
            <Link to="/contact">Contact</Link>
          </div>
          
          <div className="link-group">
            <h4>Contact</h4>
            <a href="tel:+917306134850" className="contact-link">
              <Phone size={16} />
              <span>+91 73061 34850</span>
            </a>
            <a href="mailto:teklearn1@gmail.com" className="contact-link">
              <Mail size={16} />
              <span>teklearn1@gmail.com</span>
            </a>
            <a href="https://share.google/9IWLLlJkAt5tiM6fv" target="_blank" rel="noopener noreferrer" className="contact-link">
              <MapPin size={16} />
              <span>Our Location</span>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} TekLearn. All rights reserved.</p>
        <p style={{ marginTop: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Made by <a href="https://www.hiveofficial.in/teams/Tech" target="_blank" rel="noopener noreferrer" style={{ color: '#fcd34d', textDecoration: 'none' }}>Hive Team</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
