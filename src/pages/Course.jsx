import { useData } from '../context/DataContext';
import { Database, PenTool, FileCode2, TrendingUp, Store, Users, Award, BookOpen, Monitor } from 'lucide-react';
import './SharedPageStyles.css';

const Course = () => {
  const { courses } = useData();

  const getIconComponent = (iconName) => {
    const icons = { Database, PenTool, FileCode2, TrendingUp, Store, Users, Award, BookOpen, Monitor };
    const Icon = icons[iconName] || Database;
    return <Icon className="card-bg-icon" size={200} strokeWidth={1} />;
  };

  const themes = [
    { bg: '#2d3b1f', btn: '#b4d95b', btnText: '#000', color: '#fff' }, // Dark Green
    { bg: '#45274d', btn: '#f8f9fa', btnText: '#000', color: '#fff' }, // Deep Purple
    { bg: '#734015', btn: '#fce168', btnText: '#000', color: '#fff' }, // Earthy Orange
  ];

  return (
    <div className="course-page">
      {/* Hero Section matching screenshot */}
      <header className="page-header" style={{ padding: '8rem 0 5rem 0' }}>
        <div className="container">
          <h1 className="page-title" style={{ color: '#fff', fontSize: '3.5rem', lineHeight: '1.2', maxWidth: '800px', margin: '0 auto 1.5rem auto' }}>
            Tech Courses with<br/>internships
          </h1>
          <p className="page-subtitle" style={{ fontSize: '1.1rem', marginBottom: '3rem' }}>
            Bridge the gap between education and industry with real-world,<br/>
            project-based learning designed for the next generation.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <button className="btn btn-light" style={{ borderRadius: '30px', padding: '0.8rem 2rem', fontWeight: '600' }}>Explore Courses</button>
            <button className="btn btn-dark" style={{ borderRadius: '30px', padding: '0.8rem 2rem', fontWeight: '600' }}>Contact us</button>
          </div>
        </div>
      </header>
      
      {/* Sticky Stacking Courses Section */}
      <section className="page-content container" style={{ paddingBottom: '10rem' }}>
        <h2 style={{ fontSize: '3rem', marginBottom: '3rem', color: '#fff' }}>
          <span style={{ color: 'var(--text-secondary)' }}>Our</span> Courses
        </h2>
        
        <div className="stacking-cards-container">
          {courses.map((course, idx) => {
            const theme = themes[idx % themes.length];
            return (
              <div 
                key={course.id} 
                className="stacking-course-card"
                style={{ 
                  top: `calc(100px + ${idx * 30}px)`, 
                  backgroundColor: theme.bg,
                  color: theme.color,
                  zIndex: idx
                }}
              >
                <div className="card-content-left">
                  <h3 className="course-card-title">{course.title}</h3>
                  <p className="course-card-desc">{course.description}</p>
                  
                  <div className="course-card-meta">
                    <span className="price">{course.price}</span>
                    <span className="duration">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '8px'}}><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
                      {course.duration}
                    </span>
                  </div>
                  
                  <button 
                    className="btn" 
                    style={{ 
                      backgroundColor: theme.btn, 
                      color: theme.btnText,
                      width: '100%',
                      padding: '1rem',
                      fontSize: '1.1rem',
                      fontWeight: '700',
                      border: 'none',
                      borderRadius: '8px'
                    }}
                  >
                    View Course
                  </button>
                </div>
                
                <div className="card-content-right">
                  {course.customIcon ? (
                    <img src={course.customIcon} alt={`${course.title} icon`} className="custom-course-icon" />
                  ) : (
                    getIconComponent(course.iconName)
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Course;
