
import React from "react";
import { Link, useNavigate } from "react-router-dom";

interface ChapterNavigationProps {
  prevLink: string;
  prevText: string;
  nextLink: string;
  nextText: string;
}

const ChapterNavigation: React.FC<ChapterNavigationProps> = ({
  prevLink,
  prevText,
  nextLink,
  nextText,
}) => {
  const navigate = useNavigate();
  
  // Handle navigation with scroll to top
  const handleNavigation = (path: string, isTriggerFeedback: boolean = false) => {
    // First trigger feedback if it's the next button
    if (isTriggerFeedback) {
      document.dispatchEvent(new CustomEvent('ie-feedback-widget-openModal'));
    }
    
    // Navigate to the page
    navigate(path);
    
    // Scroll to the top of the page
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <section className="chapter-navigation">
      <div className="nav-buttons">
        <button 
          onClick={() => handleNavigation(prevLink)} 
          className="nav-button prev"
        >
          ← {prevText}
        </button>
        <button 
          onClick={() => handleNavigation(nextLink, true)} 
          className="nav-button next"
        >
          {nextText} →
        </button>
      </div>
    </section>
  );
};

export default ChapterNavigation;
