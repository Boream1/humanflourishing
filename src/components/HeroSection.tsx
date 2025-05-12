import React from 'react';
import { Card } from './ui/card';

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
  backgroundImage = "/assets/talgat-baizrahmanov-BayiApxgDPY-unsplash.jpg" // Updated to use the specified image
}) => {
  // Split the title into two parts if it contains a colon
  const titleParts = title.split(':');
  const lessonNumber = titleParts.length > 1 ? titleParts[0] : '';
  const lessonTitle = titleParts.length > 1 ? titleParts[1].trim() : title;

  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="hero-text-container">
          {lessonNumber && <p className="lesson-number">{lessonNumber}</p>}
          <h1 className="lesson-title">{lessonTitle}</h1>
          {subtitle && <p className="hero-subtitle">{subtitle}</p>}
          
          {objectives && objectives.length > 0 && (
            <Card className="objectives-container">
              <h2 className="objectives-title">Learning Objectives</h2>
              <div className="objectives-list">
                {objectives.map((objective, index) => (
                  <div key={index} className="objective-item">
                    <span className="objective-text">{objective}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
        
        <div className="hero-image-container">
          <Card className="hero-image-card">
            <div className="hero-image">
              <img 
                src={backgroundImage} 
                alt={title} 
                className="w-full h-full object-cover" 
              />
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
