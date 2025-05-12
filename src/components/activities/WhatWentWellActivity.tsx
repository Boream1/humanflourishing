
import React from "react";
import { Card, CardContent } from "../ui/card";
import Timeline from "../Timeline";

const WhatWentWellActivity: React.FC = () => {
  // What Went Well steps
  const whatWentWellSteps = [
    "Take your journal or a notebook.",
    "Write down three things that went well today: These can be big achievements or small pleasures. For example, \"I had a great conversation with a friend,\" \"I enjoyed a delicious meal,\" or \"I completed a challenging task at work.\"",
    "Reflect on why each event went well: Consider what caused these positive events and what they mean to you. This helps deepen your appreciation and understanding of the good things in your life.",
    "Consistency is key: Do this exercise daily for at least a week, but aim for longer to see more significant benefits."
  ];

  // What Went Well benefits
  const whatWentWellBenefits = [
    {
      title: "Counteracts negativity bias",
      description: "This practice helps balance the natural tendency to focus on negative experiences by actively shifting our focus to positive events."
    },
    {
      title: "Increases gratitude",
      description: "Regularly acknowledging good things – big or small – fosters a sense of appreciation that enhances well-being."
    },
    {
      title: "Fosters greater self-compassion",
      description: "Reflecting on what went well can foster a kinder, more compassionate attitude towards yourself, reducing self-criticism."
    }
  ];

  return (
    <section className="lesson-section" id="what-went-well">
      <h2 className="section-heading">Activity: What Went Well?</h2>
      <div className="content-block">
        <Card className="activity-card">
          <CardContent className="p-6">
            <p className="mb-4">This is a simple yet powerful exercise rooted in positive psychology. Studies have shown that this exercise has robust effects when it comes to boosting happiness and well-being. Follow these steps:</p>
          </CardContent>
        </Card>
        
        <Timeline items={whatWentWellSteps} />
        
        <h3 className="text-lg font-semibold mt-6 mb-3">Benefits:</h3>
        <div className="metacognition-cards">
          {whatWentWellBenefits.map((benefit, index) => (
            <Card key={index} className="activity-card practice-card">
              <CardContent className="p-6">
                <h3 className="mb-2 font-semibold text-lg">{benefit.title}:</h3>
                <p>{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWentWellActivity;
