import './SharedPageStyles.css';
import './About.css';
import { CheckCircle2, Rocket, Target, Users, BookOpen, Lightbulb, Zap, TrendingUp, ArrowRight } from 'lucide-react';

const About = () => {
  return (
    <div className="about-page">
      {/* Page Header */}
      <header className="page-header">
        <div className="glow-white"></div>
        <div className="container">
          <h1 className="page-title" style={{ color: '#fff' }}>About <span>Teklearn</span></h1>
          <p className="page-subtitle">Bridging the gap between education and industry through software-driven learning and talent incubation.</p>
        </div>
      </header>

      {/* Who We Are */}
      <section className="about-section container">
        <div className="section-grid">
          <div className="section-header">
            <h2>Who We Are</h2>
          </div>
          <div className="content-block">
            <p>
              Teklearn is a software-driven learning and talent incubation platform built to bridge the gap between education and industry.
            </p>
            <p>
              We believe that traditional learning alone is not enough in today’s fast-changing world. Students need more than just knowledge — they need skills, experience, and the confidence to apply them.
            </p>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="about-section container">
        <div className="section-header text-center" style={{ marginBottom: '3rem' }}>
          <h2>What We Do</h2>
          <p className="page-subtitle">We help students transform into industry-ready professionals.</p>
        </div>
        <div className="feature-list">
          <div className="feature-item">
            <Target size={32} style={{ marginBottom: '1rem', color: '#fff' }} />
            <span>Project-Based Learning</span>
            <p>Focus on real-world tasks that mirror actual industry challenges.</p>
          </div>
          <div className="feature-item">
            <Users size={32} style={{ marginBottom: '1rem', color: '#fff' }} />
            <span>Team Collaboration</span>
            <p>Industry-style workflows and collaborative environments.</p>
          </div>
          <div className="feature-item">
            <BookOpen size={32} style={{ marginBottom: '1rem', color: '#fff' }} />
            <span>Portfolio Building</span>
            <p>Create practical outputs that showcase your real-world capabilities.</p>
          </div>
          <div className="feature-item">
            <Rocket size={32} style={{ marginBottom: '1rem', color: '#fff' }} />
            <span>Startup Exposure</span>
            <p>Real business environments to prepare you for the professional world.</p>
          </div>
        </div>
        <div className="text-center" style={{ marginTop: '3rem' }}>
          <p style={{ fontSize: '1.2rem', fontWeight: '500' }}>
            We don’t just teach concepts — <span>we help you build, apply, and grow.</span>
          </p>
        </div>
      </section>

      {/* Our Approach */}
      <section className="about-section container">
        <div className="section-header text-center">
          <h2>Our Approach</h2>
          <p className="page-subtitle">A simple and effective model for success.</p>
        </div>
        <div className="approach-steps">
          <div className="step">
            <h3>Learn</h3>
            <p>Absorb core concepts and methodologies.</p>
          </div>
          <div className="step-arrow"><ArrowRight /></div>
          <div className="step">
            <h3>Build</h3>
            <p>Apply knowledge to create real projects.</p>
          </div>
          <div className="step-arrow"><ArrowRight /></div>
          <div className="step">
            <h3>Apply</h3>
            <p>Solve real-world problems in professional settings.</p>
          </div>
          <div className="step-arrow"><ArrowRight /></div>
          <div className="step">
            <h3>Grow</h3>
            <p>Accelerate your career with confidence.</p>
          </div>
        </div>
        <div className="content-block text-center" style={{ marginTop: '3rem', maxWidth: '800px', marginInline: 'auto' }}>
          <p>
            Students work on real tasks, solve real problems, and create real outcomes — just like in a professional environment.
          </p>
          <p>
            This approach ensures that by the time they complete their journey with Teklearn, they are not just trained, but ready to contribute from day one.
          </p>
        </div>
      </section>

      {/* Why Teklearn Exists & Vision */}
      <section className="about-section container">
        <div className="section-grid">
          <div>
            <div className="section-header">
              <h2>Why Teklearn Exists</h2>
            </div>
            <div className="content-block">
              <p>There is a growing gap between what students learn in college and what companies expect in the industry.</p>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: '1rem', display: 'flex', gap: '10px' }}>
                  <Zap size={20} style={{ color: '#fff' }} /> Making learning practical and outcome-driven
                </li>
                <li style={{ marginBottom: '1rem', display: 'flex', gap: '10px' }}>
                  <Zap size={20} style={{ color: '#fff' }} /> Helping students gain real experience before graduation
                </li>
                <li style={{ marginBottom: '1rem', display: 'flex', gap: '10px' }}>
                  <Zap size={20} style={{ color: '#fff' }} /> Creating a clear path from learning to earning
                </li>
              </ul>
            </div>
          </div>
          <div>
            <div className="section-header">
              <h2>Our Vision</h2>
            </div>
            <div className="content-block">
              <p>To build a future where students graduate with real skills, experience, and opportunities.</p>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: '1rem', display: 'flex', gap: '10px' }}>
                  <Target size={20} style={{ color: '#fff' }} /> Real Skills
                </li>
                <li style={{ marginBottom: '1rem', display: 'flex', gap: '10px' }}>
                  <Target size={20} style={{ color: '#fff' }} /> Real Experience
                </li>
                <li style={{ marginBottom: '1rem', display: 'flex', gap: '10px' }}>
                  <Target size={20} style={{ color: '#fff' }} /> Real Opportunities
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="about-section container">
        <div className="section-header text-center">
          <h2>What Makes Us Different</h2>
        </div>
        <div className="checklist">
          <div className="check-item">
            <CheckCircle2 className="check-icon" />
            <span>Focus on real-world application, not just theory</span>
          </div>
          <div className="check-item">
            <CheckCircle2 className="check-icon" />
            <span>Portfolio-driven learning approach</span>
          </div>
          <div className="check-item">
            <CheckCircle2 className="check-icon" />
            <span>Industry simulation through team-based work</span>
          </div>
          <div className="check-item">
            <CheckCircle2 className="check-icon" />
            <span>Beginner-friendly pathways with clear direction</span>
          </div>
          <div className="check-item">
            <CheckCircle2 className="check-icon" />
            <span>Designed to help students become career-ready faster</span>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="container">
        <div className="mission-box">
          <div className="glow-white" style={{ position: 'absolute', top: '-20%', left: '-20%', width: '400px', height: '400px' }}></div>
          <h2>Our Mission</h2>
          <p>Empowering The Youth To Lead, To Grow, To Achieve</p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="about-cta container">
        <Rocket size={64} style={{ color: '#fff', marginBottom: '2rem' }} />
        <h2 className="text-gradient">Start Your Journey</h2>
        <p>Your career doesn’t begin after graduation. It begins with the skills you build today.</p>
        <div style={{ marginTop: '2rem' }}>
          <button className="btn">Join Teklearn Now</button>
        </div>
        <p style={{ marginTop: '1.5rem', fontWeight: '500' }}>
          take the first step toward your future.
        </p>
      </section>
    </div>
  );
};

export default About;
