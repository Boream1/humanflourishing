
import React from "react";

interface ReadingLink {
  title: string;
  url: string;
}

interface ReadingSectionProps {
  title: string;
  introduction?: string;
  links: ReadingLink[];
  isOptional?: boolean;
}

const ReadingSection: React.FC<ReadingSectionProps> = ({
  title,
  introduction,
  links,
  isOptional = false,
}) => {
  return (
    <section className="lesson-section" id={isOptional ? "optional-reading" : "readings"}>
      <h2 className="section-heading">{title}</h2>
      <div className="content-block">
        {introduction && <p>{introduction}</p>}
        <ul className="bullet-list">
          {links.map((link, index) => (
            <li key={index}>
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {link.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ReadingSection;
