
import React from "react";
import { Card, CardContent } from "../ui/card";
import { useLanguage } from "../../context/LanguageContext";

const BodyMindSoulActivity: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="lesson-section" id="leveraging-body-mind-soul">
      <h2 className="section-heading">{t("chapter2.activity3.title")}</h2>
      <div className="content-block">
        <Card className="activity-card">
          <CardContent className="p-6">
            <p className="mb-4">{t("chapter2.activity3.description")}</p>
            <p className="mt-4">{t("chapter2.activity3.question")}</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default BodyMindSoulActivity;
