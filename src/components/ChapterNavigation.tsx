
import React from "react";
import { Link } from "react-router-dom";

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
  // Function to trigger feedback modal
  const handleNextClick = () => {
    document.dispatchEvent(new CustomEvent('ie-feedback-widget-openModal'));
  };

  return (
    <section className="chapter-navigation">
      <div className="nav-buttons">
        <Link to={prevLink} className="nav-button prev">
          ← {prevText}
        </Link>
        <Link to={nextLink} className="nav-button next" onClick={handleNextClick}>
          {nextText} →
        </Link>
      </div>
    </section>
  );
};

export default ChapterNavigation;
