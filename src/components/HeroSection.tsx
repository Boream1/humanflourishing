
import React from 'react';

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  objectives?: string[];
  backgroundImage?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ 
  title, 
  subtitle, 
  objectives,
  backgroundImage 
}) => {
  return (
    <section className="hero-section">
      <div className="hero-background" style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}}>
        <div className="hero-overlay"></div>
      </div>
      
      <div className="hero-content">
        <div className="hero-title-container">
          <h1 className="hero-main-title">{title}</h1>
          {subtitle && <p className="hero-subtitle">{subtitle}</p>}
        </div>
        
        {objectives && objectives.length > 0 && (
          <div className="hero-objectives">
            <h2 className="objectives-title">Learning Objectives</h2>
            <ul className="objectives-list">
              {objectives.map((objective, index) => (
                <li key={index} className="objective-item">
                  {objective}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
