
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
    <section className="hero-section bento-box">
      <div className="hero-background">
        <div className="hero-overlay"></div>
      </div>
      
      <div className="hero-content">
        <div className="bento-grid">
          {/* Left column with main content and image */}
          <Card className="bento-main-card">
            <CardContent className="p-0">
              {backgroundImage && (
                <div className="bento-image">
                  <img src={backgroundImage} alt={title} className="w-full h-full object-cover" />
                </div>
              )}
              {!backgroundImage && (
                <div className="bento-image-placeholder">Course Image</div>
              )}
            </CardContent>
          </Card>

          {/* Right column with title card */}
          <Card className="bento-title-card">
            <CardHeader className="pb-0">
              <CardTitle className="text-3xl font-normal">
                {lessonNumber && <span className="hero-lesson-number block mb-2">{lessonNumber}</span>}
                <span className="hero-title">{lessonTitle}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {subtitle && <p className="hero-subtitle mt-4">{subtitle}</p>}
            </CardContent>
          </Card>

          {/* Learning objectives card */}
          {objectives && objectives.length > 0 && (
            <Card className="bento-objectives-card">
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
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
