
import React from "react";

interface LearningObjectivesProps {
  objectives: string[];
}

const LearningObjectives: React.FC<LearningObjectivesProps> = ({ objectives }) => {
  return (
    <section className="lesson-section" id="learning-objectives">
      <h2 className="section-heading">Lesson 1 Learning Objectives</h2>
      <div className="content-block">
        <ul className="bullet-list">
          {objectives.map((objective, index) => (
            <li key={index}>{objective}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default LearningObjectives;
