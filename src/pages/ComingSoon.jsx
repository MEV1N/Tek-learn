import { Link } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';
import './SharedPageStyles.css';

const ComingSoon = () => {
  return (
    <div className="section-padding" style={{ minHeight: 'calc(100vh - 80px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="container text-center">
        <div style={{ marginBottom: '2rem', color: 'var(--accent-color)' }}>
          <Clock size={64} style={{ margin: '0 auto' }} />
        </div>
        <h1 className="page-title" style={{ fontSize: '4rem', marginBottom: '1rem', color: '#fff' }}>
          Coming <span style={{ color: 'var(--text-secondary)' }}>Soon</span>
        </h1>
        <p className="page-subtitle" style={{ fontSize: '1.2rem', marginBottom: '3rem', maxWidth: '500px' }}>
          We're working hard to bring you this feature. Check back later for updates!
        </p>
        <Link to="/" className="btn btn-outline-light" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          <ArrowLeft size={20} /> Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ComingSoon;
