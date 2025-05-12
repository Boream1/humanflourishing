
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
  // Split the title into two parts if it contains a colon
  const titleParts = title.split(':');
  const lessonNumber = titleParts.length > 1 ? titleParts[0] : '';
  const lessonTitle = titleParts.length > 1 ? titleParts[1].trim() : title;
  return <section className="hero-section bg-gray-100">
      <div className="hero-background" style={backgroundImage ? {
      backgroundImage: `url(${backgroundImage})`
    } : {}}>
        <div className="hero-overlay"></div>
      </div>
      
      <div className="hero-content py-[60px]">
        {/* Main title and image section - two columns */}
        <div className="hero-main-container py-[40px]">
          <div className="hero-title-container">
            {lessonNumber && <span className="hero-lesson-number text-left text-xl">{lessonNumber}</span>}
            <h1 className="hero-main-title text-5xl font-normal">{lessonTitle}</h1>
            {subtitle && <p className="hero-subtitle">{subtitle}</p>}
          </div>
          
          <div className="hero-image-container">
            {backgroundImage && <img src={backgroundImage} alt={title} className="hero-image" />}
            {!backgroundImage && <div className="hero-image-placeholder">Course Image</div>}
          </div>
        </div>
        
        {/* Learning objectives section - grid layout */}
        {objectives && objectives.length > 0 && <div className="hero-objectives-container pb-0">
            <div className="objectives-header">
              <h2 className="objectives-title text-xl text-left">Learning Objectives</h2>
            </div>
            
            <div className="objectives-grid">
              {objectives.map((objective, index) => <div key={index} className="objective-item">
                  <span className="objective-text text-base text-left">{objective}</span>
                </div>)}
            </div>
          </div>}
      </div>
    </section>;
};
export default HeroSection;
