
import React from "react";

interface TimelineItemProps {
  step: string;
  stepNumber: number;
  isLast?: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ step, stepNumber, isLast = false }) => {
  return (
    <div className="timeline-item">
      <div className="timeline-marker-container">
        <div className="timeline-marker">
          <span className="timeline-number">{stepNumber}</span>
        </div>
        {!isLast && <div className="timeline-line"></div>}
      </div>
      <div className="timeline-content">
        <div className="timeline-card">
          <p>{step}</p>
        </div>
      </div>
    </div>
  );
};

interface TimelineProps {
  items: string[];
}

const Timeline: React.FC<TimelineProps> = ({ items }) => {
  return (
    <div className="timeline-container">
      {items.map((item, index) => (
        <TimelineItem 
          key={index} 
          step={item} 
          stepNumber={index + 1} 
          isLast={index === items.length - 1}
        />
      ))}
    </div>
  );
};

export default Timeline;
