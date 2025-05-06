
import React from "react";

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
  return (
    <section className="chapter-navigation">
      <div className="nav-buttons">
        <a href={prevLink} className="nav-button prev">
          ← {prevText}
        </a>
        <a href={nextLink} className="nav-button next">
          {nextText} →
        </a>
      </div>
    </section>
  );
};

export default ChapterNavigation;
