
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

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
  // Split the title into two parts if it contains a colon
  const titleParts = title.split(':');
  const lessonNumber = titleParts.length > 1 ? titleParts[0] : '';
  const lessonTitle = titleParts.length > 1 ? titleParts[1].trim() : title;

  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="hero-grid">
          <Card className="hero-title-card">
            <CardContent className="p-6">
              {lessonNumber && <p className="lesson-number">{lessonNumber}</p>}
              <h1 className="lesson-title">{lessonTitle}</h1>
              {subtitle && <p className="hero-subtitle mt-4">{subtitle}</p>}
            </CardContent>
          </Card>

          {objectives && objectives.length > 0 && (
            <Card className="hero-objectives-card">
              <CardHeader className="pb-0">
                <CardTitle className="text-2xl font-normal">Learning Objectives</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mt-2">
                  {objectives.map((objective, index) => (
                    <div key={index} className="objective-item mb-3">
                      <span className="objective-text">{objective}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {backgroundImage && (
            <Card className="hero-image-card">
              <CardContent className="p-0">
                <div className="hero-image">
                  <img src={backgroundImage} alt={title} className="w-full h-full object-cover" />
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
