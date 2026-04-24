import React from 'react';
import './about.css';

// Components
import FloatingBackground from '../components/FloatingBackground';
import Hero from '../components/Hero';
import WhoWeAre from '../components/WhoWeAre';
import WhatWeDo from '../components/WhatWeDo';
import Approach from '../components/Approach';
import TextSection from '../components/TextSection';
import Mission from '../components/Mission';
import CTA from '../components/CTA';

const About = () => {
    return (
        <>
            <FloatingBackground />
            
            <Hero />
            <WhoWeAre />
            <WhatWeDo />
            <Approach />
            
            <TextSection 
                title="Why Teklearn Exists"
                subtitle={<>There is a growing gap between what students learn in college and <br/>what companies expect in the industry.</>}
                listItems={[
                    "Making learning practical and outcome-driven.",
                    "Helping students gain real experience before graduation.",
                    "Creating a clear path from learning to earning."
                ]}
            />

            <TextSection 
                title="Our Vision"
                subtitle="To build a future where students graduate not just with degrees, but with:"
                listItems={[
                    "Real skills",
                    "Real experience",
                    "Real opportunities"
                ]}
                footer={<>Our aim is to create a generation of builders, creators, and problem-solvers<br/>who are ready to lead and grow in the modern world.</>}
            />

            <TextSection 
                title="What Makes Us Different"
                differences={true}
                listItems={[
                    "We don't just teach, we build projects that matter.",
                    "Our focus is on a strictly practical approach.",
                    "We simulate a real tech business environment.",
                    "We guide manually on resumes and initial directions.",
                    "Our goal is to help students become company ready faster."
                ]}
            />

            <Mission />
            <CTA />
        </>
    );
};

export default About;
