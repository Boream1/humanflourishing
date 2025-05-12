
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
  backgroundImage = "/assets/talgat-baizrahmanov-BayiApxgDPY-unsplash.jpg" 
}) => {
  // Split the title into two parts if it contains a colon
  const titleParts = title.split(':');
  const lessonNumber = titleParts.length > 1 ? titleParts[0] : '';
  const lessonTitle = titleParts.length > 1 ? titleParts[1].trim() : title;

  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="hero-left-column">
          <Card className="title-card">
            {lessonNumber && <p className="lesson-number">{lessonNumber}</p>}
            <h1 className="lesson-title">{lessonTitle}</h1>
            {subtitle && <p className="hero-subtitle">{subtitle}</p>}
          </Card>
          
          {objectives && objectives.length > 0 && (
            <Card className="objectives-card">
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
        
        <div className="hero-right-column">
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
