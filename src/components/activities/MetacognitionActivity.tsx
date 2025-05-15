
import React from "react";
import { Card, CardContent } from "../ui/card";
import { useLanguage } from "../../context/LanguageContext";
import useFadeInOnScroll from "../../hooks/useFadeInOnScroll";

const MetacognitionActivity: React.FC = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useFadeInOnScroll();

  // Metacognition practices
  const getMetacognitionPractices = () => {
    return [
      {
        title: t("chapter2.activity2.practice1.title"),
        description: t("chapter2.activity2.practice1.description")
      },
      {
        title: t("chapter2.activity2.practice2.title"),
        description: t("chapter2.activity2.practice2.description")
      },
      {
        title: t("chapter2.activity2.practice3.title"),
        description: t("chapter2.activity2.practice3.description")
      },
      {
        title: t("chapter2.activity2.practice4.title"),
        description: t("chapter2.activity2.practice4.description")
      },
      {
        title: t("chapter2.activity2.practice5.title"),
        description: t("chapter2.activity2.practice5.description")
      },
      {
        title: t("chapter2.activity2.practice6.title"),
        description: t("chapter2.activity2.practice6.description")
      }
    ];
  };

  const metacognitionPractices = getMetacognitionPractices();

  return (
    <section
      className={`lesson-section fade-up${isVisible ? " visible" : ""}`}
      id="practicing-metacognition"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <h2 className="section-heading">{t("chapter2.activity2.title")}</h2>
      <div className="content-block">
        <p className="mb-4">{t("chapter2.activity2.description")}</p>
        <div className="metacognition-cards">
          {metacognitionPractices.map((practice, index) => (
            <Card key={index} className="activity-card practice-card">
              <CardContent className="p-6">
                <h3 className="mb-2 font-semibold text-lg">{practice.title}:</h3>
                <p>{practice.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MetacognitionActivity;
