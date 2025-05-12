
import React from "react";
import { Card, CardContent } from "../ui/card";

const BodyMindSoulActivity: React.FC = () => {
  return (
    <section className="lesson-section" id="leveraging-body-mind-soul">
      <h2 className="section-heading">Activity: Leveraging Body, Mind, and Soul</h2>
      <div className="content-block">
        <Card className="activity-card">
          <CardContent className="p-6">
            <p className="mb-4">We can leverage the integration of body, mind, and soul to support our awareness, emotions, and cognition. Specifically, we can leverage aspects of the body, mind, and soul so that they enhance each other. For example, if we're feeling mentally sluggish at work, we can activate the body by going for a walk. By energizing the body through physical activity, we can energize the mind. Similarly, if we're feeling physically tired, we can tap into the soul by connecting with others. By energizing the soul with human connection, we can energize the body.</p>
            
            <p className="mt-4">Given these examples, what practices can you cultivate to better leverage the body, mind, and soul connection to support you in your flourishing?</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default BodyMindSoulActivity;
