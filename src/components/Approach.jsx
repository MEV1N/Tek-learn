import React from 'react';

const Approach = () => {
    return (
        <>
            <section className="approach container">
                <h2>Our Approach</h2>
                <p style={{ marginBottom: '40px', fontSize: '28px' }}>Our model is simple and effective:</p>

                <div className="approach-flow">
                    <div className="flow-step">Learn</div>
                    <div className="flow-arrow"></div>
                    <div className="flow-step">Build</div>
                    <div className="flow-arrow"></div>
                    <div className="flow-step">Apply</div>
                    <div className="flow-arrow"></div>
                    <div className="flow-step">Grow</div>
                </div>

                <p className="list-wrapper" style={{ marginTop: '60px' }}>
                    Students work on real tasks, solve real problems, and create real outcomes — just like in a professional environment.<br /><br />
                    This approach ensures that by the time they complete their journey with Teklearn,<br />they are not just trained, but ready to contribute from day one.
                </p>
            </section>
            <hr className="section-divider" />
        </>
    );
};

export default Approach;
