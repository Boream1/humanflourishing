
import React from "react";
import { Card, CardContent } from "../ui/card";
import { useLanguage } from "../../context/LanguageContext";
import useFadeInOnScroll from "../../hooks/useFadeInOnScroll";

const EmotionalGranularityActivity: React.FC = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useFadeInOnScroll();

  return (
    <section
      className={`lesson-section fade-up${isVisible ? " visible" : ""}`}
      id="reflecting-emotional-granularity"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <h2 className="section-heading">{t("chapter2.activity1.title")}</h2>
      <div className="content-block">
        <Card className="activity-card">
          <CardContent className="p-6">
            <p className="mb-4">{t("chapter2.activity1.description")}</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default EmotionalGranularityActivity;
