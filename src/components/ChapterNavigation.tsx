import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

interface ChapterNavigationProps {
  prevLink: string;
  nextLink: string;
  prevText?: string;
  nextText?: string;
}

const ChapterNavigation: React.FC<ChapterNavigationProps> = ({
  prevLink,
  nextLink,
  prevText,
  nextText
}) => {
  const { t } = useLanguage();

  // Determine default text based on links
  const defaultPrevText = prevLink === "/" ? t('backToHome') : t('previousChapter');
  const defaultNextText = t('nextChapter');

  return (
    <div className="chapter-navigation">
      <div className="nav-container">
        <Link className="nav-button prev" to={prevLink}>
          {prevText || defaultPrevText}
        </Link>
        <Link className="nav-button next" to={nextLink}>
          {nextText || defaultNextText}
        </Link>
      </div>
    </div>
  );
};

export default ChapterNavigation;
