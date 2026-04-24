import React from 'react';

const Hero = () => {
    return (
        <header className="hero container">
            <img 
                className="logo" 
                src="/Images/Screenshot_2026-04-03_095515-removebg-preview 1.png" 
                alt="Teklearn Logo"
                style={{ width: 'fit-content', height: 'fit-content' }} 
            />
            <br />
            <div className="hero-content">
                <h1>A Software-Driven Learning &<br />Talent Incubation Platform</h1>
                <p>Bridging the Gap Between Education and Industry</p>
            </div>
        </header>
    );
};

export default Hero;
