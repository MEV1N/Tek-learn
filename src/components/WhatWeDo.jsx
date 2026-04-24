import React from 'react';

const WhatWeDo = () => {
    return (
        <>
            <section className="what-we-do container">
                <div className="what-we-do-header">
                    <h2>What We Do</h2>
                    <p>At Teklearn, we help students transform from learners into<br />industry-ready professionals by focusing on:</p>
                    <p style={{ marginTop: '10px' }}>We don't just teach concepts —<br />👉 we help you build, apply, and grow.</p>
                </div>

                <div className="features-grid">
                    <div className="feature-row">
                        <div className="feature-item item-top-left">
                            <img src="/Images/Frame.png" alt="Project-based learning" className="feature-icon top-icon" style={{ width: '89px', height: '84px' }} />
                            <h3>Real-world, project<br />-based learning</h3>
                        </div>
                        <div className="feature-item right item-top-right">
                            <img src="/Images/Vector.png" alt="Industry workflows" className="feature-icon top-icon" style={{ width: 'auto', height: '40px' }} />
                            <h3>Industry-style workflows<br />and team collaboration</h3>
                        </div>
                    </div>
                    <div className="feature-row">
                        <div className="feature-item item-bottom-left">
                            <img src="/Images/Frame (1).png" alt="Portfolio building" className="feature-icon" style={{ width: '89px', height: '84px' }} />
                            <h3>Portfolio building with<br />practical outputs</h3>
                        </div>
                        <div className="feature-item right item-bottom-right">
                            <img src="/Images/Frame (2).png" alt="Startup exposure" className="feature-icon" style={{ width: 'auto', height: '40px' }} />
                            <h3>Exposure to startup and<br />real business environments</h3>
                        </div>
                    </div>
                </div>
            </section>
            <hr className="section-divider" />
        </>
    );
};

export default WhatWeDo;
