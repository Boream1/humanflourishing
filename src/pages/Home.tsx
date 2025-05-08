
import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <>
      <section className="hero-section">
        <h2 className="hero-title">Welcome to the Course</h2>
        <p className="hero-description">Brief description of the course and its objectives.</p>
        <Link to="/chapter1" className="cta-button">Begin Course</Link>
      </section>

      <section className="course-overview">
        <h2 className="section-title">Course Content</h2>
        <div className="chapter-cards">
          <div className="chapter-card">
            <h3 className="chapter-title">Chapter 1</h3>
            <p className="chapter-preview">Brief description of the first chapter.</p>
            <Link to="/chapter1" className="chapter-link">View Chapter</Link>
          </div>
          <div className="chapter-card">
            <h3 className="chapter-title">Chapter 2</h3>
            <p className="chapter-preview">Brief description of the second chapter.</p>
            <Link to="/chapter2" className="chapter-link">View Chapter</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
