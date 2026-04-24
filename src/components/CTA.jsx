import React from 'react';

const CTA = () => {
    return (
        <section className="cta container">
            <h2>Start Your Journey</h2>
            <p>Your career doesn't begin after graduation.<br />It begins with the skills you build today.</p>
            <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'left', marginTop: '40px' }}>
                <a href="#" className="btn-join">
                    Join Teklearn
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </a>
            </div>
            <img src="/Images/Group 12.png" alt="Decor" className="group-12-decor" />
        </section>
    );
};

export default CTA;
