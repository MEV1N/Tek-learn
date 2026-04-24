import React from 'react';

const WhoWeAre = () => {
    return (
        <>
            <section className="who-we-are container">
                <div className="who-we-are-icon">
                    <img src="/Images/Group 7.png" alt="Who We Are Icon" style={{ width: '80px', height: 'auto' }} />
                </div>
                <div>
                    <h2>Who We Are</h2>
                    <p>We believe that traditional learning alone is not enough in today's fast-changing world. Students need more than just knowledge — they need skills, experience, and the confidence to apply them.</p>
                </div>
            </section>
            <hr className="section-divider" />
        </>
    );
};

export default WhoWeAre;
