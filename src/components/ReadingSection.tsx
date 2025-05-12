
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

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
                  <CardContent className="p-6 reading-card-content">
                    <div className="reading-icon-container">
                      <BookOpen className="reading-icon" size={24} />
                    </div>
                    <div className="reading-content">
                      <h3 className="reading-title">{link.title}</h3>
                      <Button 
                        variant="ghost" 
                        className="reading-button" 
                        onClick={() => window.open(link.url, "_blank")}
                      >
                        Read More <ArrowRight className="ml-2" size={16} />
                      </Button>
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
}

export default ReadingSection;
