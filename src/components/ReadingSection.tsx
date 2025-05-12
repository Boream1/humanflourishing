
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen } from "lucide-react";
import { Separator } from "@/components/ui/separator";

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
    <section className="reading-section-wrapper">
      <div className="reading-section-inner">
        <section className="lesson-section" id={isOptional ? "optional-reading" : "readings"}>
          <h2 className="section-heading">{title}</h2>
          <div className="content-block">
            {introduction && <p className="mb-4">{introduction}</p>}
            <div className="reading-cards">
              {links.map((link, index) => (
                <Card key={index} className="reading-card">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="reading-icon-container">
                        <BookOpen className="reading-icon" size={24} />
                      </div>
                      <div className="reading-content">
                        <a 
                          href={link.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="reading-link"
                        >
                          {link.title}
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default ReadingSection;
