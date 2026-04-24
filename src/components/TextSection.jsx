import React from 'react';

const TextSection = ({ title, subtitle, listItems, footer, differences = false }) => {
    return (
        <>
            <section className="text-section container">
                {differences ? (
                    <div className="list-wrapper">
                        <h2 style={{ textAlign: 'center' }}>{title}</h2>
                        <ul className="differences-list">
                            {listItems.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <>
                        <h2>{title}</h2>
                        <p className={`subtitle list-wrapper ${title === 'Our Vision' ? 'vision-main' : 'exists-main'}`}>
                            {subtitle}
                        </p>
                        
                        <div className="list-wrapper">
                            {title === 'Why Teklearn Exists' && (
                                <p className="exists-sub">Teklearn was created to solve this problem by:</p>
                            )}
                            <ul>
                                {listItems.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                        {footer && (
                            <p className="vision-footer list-wrapper">
                                {footer}
                            </p>
                        )}
                    </>
                )}
            </section>
            <hr className="section-divider" />
        </>
    );
};

export default TextSection;
