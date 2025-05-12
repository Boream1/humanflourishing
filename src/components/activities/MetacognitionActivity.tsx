
import React from "react";
import { Card, CardContent } from "../ui/card";

const MetacognitionActivity: React.FC = () => {
  // Metacognition practices
  const metacognitionPractices = [
    {
      title: "Journaling",
      description: "Writing down your thoughts, feelings, and experiences helps increase self-awareness and provides insights into your thinking patterns."
    },
    {
      title: "Mindfulness",
      description: "Focusing your awareness on the present moment can reduce stress and improve cognitive clarity by preventing your mind from wandering."
    },
    {
      title: "Take time to pause",
      description: "Deliberately pausing before reacting allows you to consider your thoughts and responses, leading to more thoughtful decision-making."
    },
    {
      title: "Stand up and move around",
      description: "Physical movement can boost brain function and creativity, helping you think more clearly and effectively."
    },
    {
      title: "Appreciate nature",
      description: "Spending time in nature, or even just looking through a window to appreciate the natural world, can reduce stress and enhance your mood, providing a fresh perspective and mental clarity."
    },
    {
      title: "Connect with another human being",
      description: "Engaging in meaningful conversations can provide new insights and help you reflect on your own thoughts and feelings."
    }
  ];

  return (
    <section className="lesson-section" id="practicing-metacognition">
      <h2 className="section-heading">Activity: Practicing Metacognition</h2>
      <div className="content-block">
        <p className="mb-4">Now it's time to practice some ways to elevate your metacognition. Choose at least two of these practices and try them out!</p>
        
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
