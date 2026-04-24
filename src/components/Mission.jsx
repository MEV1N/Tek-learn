import React from 'react';

const Mission = () => {
    return (
        <>
            <section className="mission container">
                <img src="/Images/Star 3.png" alt="Mission Star" className="mission-icon" />
                <br /><br />
                <div className="mission-title">
                    <svg width="80" height="24" viewBox="0 0 80 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="16" y1="12" x2="80" y2="12" stroke="white" strokeWidth="4" />
                        <polygon points="0,12 16,4 16,20" fill="white" />
                    </svg>
                    <h2>Our Mission</h2>
                    <svg width="80" height="24" viewBox="0 0 80 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="0" y1="12" x2="64" y2="12" stroke="white" strokeWidth="4" />
                        <polygon points="80,12 64,4 64,20" fill="white" />
                    </svg>
                </div>
                <h3>Empowering The Youth To Lead, To Grow, To Achieve</h3>
            </section>
            <hr className="section-divider" />
        </>
    );
};

export default Mission;
