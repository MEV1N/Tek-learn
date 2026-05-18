import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, TrendingUp, Store, Users, Award, BookOpen, FileCode2, Monitor, PenTool, Database } from 'lucide-react';
import CourseCard from '../components/CourseCard';
import { useData } from '../context/DataContext';
import './Home.css';

const Home = () => {
  const { banners, courses } = useData();
  const [activeCourse, setActiveCourse] = useState(1); // 0, 1, 2
  const [activeFaq, setActiveFaq] = useState(null);
  const [heroWordIndex, setHeroWordIndex] = useState(0);
  const [bannerIndex, setBannerIndex] = useState(0);

  const heroWords = ['Lead', 'Grow', 'Achieve'];

  const getIconComponent = (iconName) => {
    const icons = { Database, PenTool, FileCode2, TrendingUp, Store, Users, Award, BookOpen, Monitor };
    const Icon = icons[iconName] || Database;
    return <Icon size={48} />;
  };

  const faqs = [
    {
      question: "Do I need prior experience to join?",
      answer: "Not at all! All our courses are beginner-friendly. We start from the absolute basics and take you to industry-ready level."
    },
    {
      question: "How does the internship program work?",
      answer: "After completing 60% of your course, you get placed on a live startup project, working as a real team member with real deliverables."
    },
    {
      question: "Will I get a job?",
      answer: "We have a 95% placement rate. Our dedicated career team helps you with resume building, interview prep, and job referrals."
    }
  ];

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setHeroWordIndex((prev) => (prev + 1) % heroWords.length);
    }, 3000);
    return () => clearInterval(wordInterval);
  }, []);



  useEffect(() => {
    const topCoursesLength = Math.min(courses.length, 3);
    if (topCoursesLength === 0) return;
    const interval = setInterval(() => {
      setActiveCourse((prev) => (prev + 1) % topCoursesLength);
    }, 3000);
    return () => clearInterval(interval);
  }, [courses]);



  return (
    <div className="home">
      {/* 1. Hero Section - Main landing view */}
      <section className="hero">
        {/* Floating background animation wrapper */}
        <div className="floating-squares">
          {Array.from({ length: 15 }).map((_, i) => (
            <div key={i} className="square" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 40 + 10}px`,
              height: `${Math.random() * 40 + 10}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`
            }}></div>
          ))}
        </div>
        
        {/* Main hero content container */}
        <div className="container hero-container">
          <h1 className="hero-title text-gradient">
            Empowering The Youth<br/>To <span key={heroWordIndex} className="hero-animated-word">{heroWords[heroWordIndex]}</span>
          </h1>
          <p className="hero-subtitle">
            Bridge the gap between education and industry with real-world,<br/>
            project-based learning designed for the next generation.
          </p>
          {/* Call-to-action button for Hero section */}
          <div className="hero-cta">
            {/* Primary exploration button */}
            <Link to="/course" className="btn btn-outline-light">Explore Courses</Link>
          </div>
        </div>
      </section>

      {/* 2. Featured Programs Section - Banner Slider */}
      <section className="featured-programs-section container">
        <div className="banner-slider">
          <div 
            className="banner-arrow" 
            onClick={() => setBannerIndex(prev => (prev === 0 ? banners.length - 1 : prev - 1))}
          >
            <ChevronLeft size={32} />
          </div>
          
          <div 
            className={`banner-content ${banners[bannerIndex]?.link ? 'banner-clickable' : ''}`}
            onClick={() => {
              const link = banners[bannerIndex]?.link;
              if (link) window.open(link, '_blank', 'noopener,noreferrer');
            }}
          >
            {banners.length > 0 && banners[bannerIndex] && (
              <>
                <h2><span>{banners[bannerIndex].highlight}</span> {banners[bannerIndex].title}</h2>
                <p>{banners[bannerIndex].subtitle}</p>
              </>
            )}
          </div>

          <div 
            className="banner-arrow" 
            onClick={() => setBannerIndex(prev => (prev + 1) % banners.length)}
          >
            <ChevronRight size={32} />
          </div>

          <div className="banner-dots">
            {banners.map((_, idx) => (
              <div 
                key={idx} 
                className={`banner-dot ${idx === bannerIndex ? 'active' : ''}`}
                onClick={() => setBannerIndex(idx)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 3. Why Choose Teklearn (Bento Box) - Feature highlights */}
      <section className="why-choose-bento section-padding container">
        <h2 className="section-title text-center" style={{ marginBottom: '1rem', color: '#fff' }}>Why Choose Teklearn</h2>
        <p className="section-subtitle text-center" style={{ marginBottom: '3rem' }}>Everything you need to launch your tech career with confidence.</p>
        
        {/* CSS Grid layout container for Bento Box items */}
        <div className="bento-grid">
          
          {/* Item 1 - Wide */}
          <div className="bento-item item-1">
            <div className="feature-icon"><TrendingUp size={28} /></div>
            <h3>Project-Based Learning</h3>
            <p>Work on real-world projects that mirror actual industry workflows and outcomes, rather than just following tutorials.</p>
          </div>
          
          {/* Item 2 */}
          <div className="bento-item item-2">
            <div className="feature-icon"><Store size={28} /></div>
            <h3>Industry Simulation</h3>
            <p>Experience a real company environment with sprints, standups, and strict deadlines.</p>
          </div>
          
          {/* Item 3 - Tall */}
          <div className="bento-item item-3">
            <div className="feature-icon"><Users size={28} /></div>
            <h3>Strong Portfolio</h3>
            <p>Graduate with a comprehensive portfolio that speaks for itself. Show potential recruiters and clients actual products you've built, deployed, and scaled.</p>
          </div>
          
          {/* Item 4 - Wide */}
          <div className="bento-item item-4">
            <div className="feature-icon"><Award size={28} /></div>
            <h3>Internship Experience</h3>
            <p>Work on live startup projects and get certified internship experience while you learn.</p>
          </div>

          {/* Item 5 */}
          <div className="bento-item item-5">
            <div className="feature-icon"><BookOpen size={28} /></div>
            <h3>Job-Ready Skills</h3>
            <p>Gain the exact technical and soft skills top employers demand from day one.</p>
          </div>

          {/* Item 6 */}
          <div className="bento-item item-6">
            <div className="feature-icon"><FileCode2 size={28} /></div>
            <h3>Beginner Friendly</h3>
            <p>Zero prerequisites needed. We guide you from absolute basics to a job-ready professional.</p>
          </div>

        </div>

        {/* Centered CTA container */}
        <div className="text-center" style={{ marginTop: '4rem' }}>
          {/* Primary journey starter button */}
          <Link to="/contact" className="btn btn-outline-light" style={{ padding: '1rem 2.5rem', borderRadius: '30px' }}>Start your Journey</Link>
        </div>
      </section>

      {/* 4. Join Hive - Community building section */}
      <section id="hive" className="join-hive-wrapper container section-padding">
        {/* Container with custom glowing border effect */}
        <div className="join-hive-card glowing-border">
          <h2 className="hive-title">Join <span className="text-accent">Hive</span></h2>
          <h3 className="hive-subtitle">BUILD. BREAK. <span className="text-accent">REPEAT.</span></h3>
          <p>Connect, collaborate, and grow with thousands of like-minded tech learners.</p>
          
          {/* Flex container for community features */}
          <div className="hive-features">
            <span>Community Learning</span>
            <span>Collaboration</span>
            <span>Networking</span>
            <span>Growth</span>
          </div>
          
          {/* Button to navigate to Hive community page */}
          <a href="https://www.hiveofficial.in" target="_blank" rel="noopener noreferrer" className="btn btn-accent mt-4" style={{ padding: '0.8rem 2.5rem', borderRadius: '30px', textDecoration: 'none' }}>Explore Hive</a>
        </div>
      </section>

      {/* 5. Our Programs - Distinct offerings for students vs builders */}
      <section className="programs-section section-padding container">
        <h2 className="section-title center text-gradient">Our Programs</h2>
        
        {/* 2-column grid layout for program cards */}
        <div className="grid-2 programs-grid">
          {/* Student program card layout */}
          <div className="program-card">
            <div className="program-badge">For Students</div>
            <h3>College Programs</h3>
            <ul>
              <li>Industry-aligned curriculum</li>
              <li>Placement assistance</li>
              <li>Faculty development programs</li>
            </ul>
            {/* Button to learn more about student programs */}
            <button className="btn mt-auto">Learn More</button>
          </div>
          {/* Startup program card layout */}
          <div className="program-card">
            <div className="program-badge">For Builders</div>
            <h3>Startup Programs</h3>
            <ul>
              <li>Access to trained talent pool</li>
              <li>Customized talent solutions</li>
              <li>Flexible engagement models</li>
            </ul>
            {/* Button to explore builder programs */}
            <button className="btn mt-auto">Explore Program</button>
          </div>
        </div>
      </section>

      {/* 6. Explore Our Courses (Coverflow) - Interactive 3D carousel */}
      <section className="courses-coverflow-section section-padding">
        <div className="container">
          <h2 className="section-title center text-gradient">Explore Our Courses</h2>
          <p className="section-subtitle center">Real projects. Real skills. Real outcomes. Learn from industry professionals.</p>
          
          {/* Container holding absolute-positioned coverflow items */}
          <div className="coverflow-container">
            {courses.slice(0, 3).map((course, idx) => {
              let positionClass = 'hidden';
              if (idx === activeCourse) positionClass = 'active';
              else if (idx === activeCourse - 1) positionClass = 'prev';
              else if (idx === activeCourse + 1) positionClass = 'next';
              
              return (
                <div 
                  key={idx} 
                  className={`coverflow-item ${positionClass}`}
                  onClick={() => {
                    if(idx === activeCourse - 1 || idx === activeCourse + 1) setActiveCourse(idx);
                  }}
                >
                  <CourseCard 
                    title={course.title}
                    description={course.description}
                    price={course.price}
                    duration={course.duration}
                    imagePlaceholder={getIconComponent(course.iconName)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. What Our Students Say - Social proof and reviews */}
      <section className="testimonials-section section-padding container">
        <h2 className="section-title center">What Our Students Say</h2>
        {/* 2-column grid for testimonial cards */}
        <div className="grid-2 testimonials-two-col">
          <div className="testimonial-card">
            <div className="stars">★★★★★</div>
            <p>"Teklearn completely transformed my career. The projects were real and mentors were amazing! Got placed within 2 months of completing."</p>
            <div className="student-info">
              <div className="student-initials">AM</div>
              <div>
                <h4>Arjun Menon</h4>
                <p>Data Analyst @ Infosys</p>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="stars">★★★★★</div>
            <p>"The UI/UX course was fantastic. Working on actual client projects gave me confidence to land my first design role before graduation."</p>
            <div className="student-info">
              <div className="student-initials">PS</div>
              <div>
                <h4>Priya Sharma</h4>
                <p>UI Designer @ Startup</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQs - Frequently Asked Questions block */}
      <section className="faq-section section-padding container">
        <h2 className="section-title center">Frequently Asked Questions</h2>
        {/* Vertical flex list for FAQ items */}
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`faq-item-box ${activeFaq === index ? 'active' : ''}`}
              onClick={() => setActiveFaq(activeFaq === index ? null : index)}
            >
              <h3>{faq.question}</h3>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. Final Call-to-Action section */}
      <section className="cta-section section-padding container" style={{ marginBottom: '4rem' }}>
        {/* Content wrapper card */}
        <div className="cta-card">
          <h2>Start Building Your Career Today</h2>
          {/* Flex container for bottom CTAs */}
          <div className="cta-buttons mt-4">
            {/* Final registration button */}
            <Link to="/contact" className="btn btn-outline-light" style={{ padding: '1rem 2.5rem', borderRadius: '30px' }}>Join Now</Link>
            {/* Consultation booking button */}
            <Link to="/contact" className="btn btn-outline-light" style={{ padding: '1rem 2.5rem', borderRadius: '30px' }}>Book Free Consultation</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
