
import React from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';

const Home: React.FC = () => {
  return (
    <>
      <HeroSection 
        title="Human Flourishing"
        subtitle="Explore what it means to be human and discover the path to wellbeing and fulfillment."
      />

      <section className="course-overview">
        <h2 className="section-title">Course Content</h2>
        <div className="chapter-cards">
          <div className="chapter-card">
            <h3 className="chapter-title">Chapter 1: Being Human</h3>
            <p className="chapter-preview">Explore the complexity of human beings, social connections, and the role of biases in our lives.</p>
            <Link to="/chapter1" className="chapter-link">View Chapter</Link>
          </div>
          <div className="chapter-card">
            <h3 className="chapter-title">Chapter 2: Cultivating Awareness</h3>
            <p className="chapter-preview">Learn techniques to develop greater awareness of yourself and your impact on others.</p>
            <Link to="/chapter2" className="chapter-link">View Chapter</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
