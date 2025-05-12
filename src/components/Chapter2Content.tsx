
import React, { useEffect, useRef } from "react";
import VideoSection from "./VideoSection";
import ReadingSection from "./ReadingSection";
import HeroSection from "./HeroSection";
import ChapterNavigation from "./ChapterNavigation";
import { createRoot } from "react-dom/client";
import KeyPoint from "./KeyPoint";
import { Card, CardContent } from "./ui/card";

const Chapter2Content: React.FC = () => {
  const learningObjectives = [
    "Understand the connection of emotion with values, thinking, and behavior",
    "Appreciate the utility of positive emotions for survival and how this shapes our perspective",
    "Understand metacognition and how to build deeper awareness",
    "Leverage the integration of body, mind, and soul to support our awareness, emotions, and cognition"
  ];
  
  const readings = [{
    title: "The Wheel of Emotional Granularity",
    url: "https://www.restoringhoperca.com/the-feelings-wheel"
  }, {
    title: "The role of emotional granularity in emotional regulation, mental disorders, and well-being",
    url: "https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2022.1080713/full"
  }];
  
  // Video source and poster - ensure poster image path is correctly formatted
  const videoSource = "https://iep-media.ie.edu/olj/human-flourishing/w0v01-welcome-to-the-course/mp4/w0v01-welcome-to-the-course_1080p.mp4";
  const posterImage = "/lovable-uploads/d8922e18-e45a-41bc-9aaa-0faed86084a5.png";

  // Create a ref to store the React root for the reflection activity
  const emotionalGranularityRootRef = useRef<any>(null);
  const whatWentWellRootRef = useRef<any>(null);
  const metacognitionRootRef = useRef<any>(null);
  const leveragingBodyMindSoulRootRef = useRef<any>(null);
  
  // Track if feedback event has been set up
  const feedbackSetupRef = useRef<boolean>(false);

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

  useEffect(() => {
    // Remove loading indicator if it still exists
    const loadingIndicator = document.querySelector('.loading-indicator');
    if (loadingIndicator) {
      loadingIndicator.remove();
    }

    // Set up the feedback trigger for the last video
    const setupFeedbackTrigger = () => {
      if (feedbackSetupRef.current) return;
      
      const lastVideo = document.getElementById("video-2-5") as HTMLVideoElement;
      
      if (lastVideo) {
        console.log("Configuring feedback event for last video");
        
        lastVideo.addEventListener("ended", function() {
          console.log("Last video ended, triggering feedback modal");
          document.dispatchEvent(new CustomEvent("ie-feedback-widget-openModal"));
        });
        
        feedbackSetupRef.current = true;
      }
    };

    // Try multiple times to set up the feedback trigger
    const setupInterval = setInterval(() => {
      setupFeedbackTrigger();
      if (feedbackSetupRef.current) {
        clearInterval(setupInterval);
      }
    }, 2000);

    // Also set up navigation feedback trigger
    const setupNavigationFeedback = () => {
      const navButtons = document.querySelectorAll('.nav-button.next');
      navButtons.forEach(button => {
        button.addEventListener('click', () => {
          console.log('Navigation button clicked, triggering feedback modal');
          document.dispatchEvent(new CustomEvent('ie-feedback-widget-openModal'));
        });
      });
    };
    
    // Wait for DOM to be ready before setting up navigation feedback
    setTimeout(setupNavigationFeedback, 1500);

    // Clean up
    return () => {
      clearInterval(setupInterval);
    };
  }, []);

  return (
    <>
      <HeroSection 
        title="LESSON 2: Cultivating Awareness: Emotions and Cognition"
        objectives={learningObjectives}
        backgroundImage="/assets/talgat-baizrahmanov-BayiApxgDPY-unsplash.jpg"
      />

      <section className="chapter-body">
        <article className="lesson-content">
          <VideoSection 
            id="emotional-granularity" 
            title="What Are Emotions? What is Emotional Granularity?" 
            videoId="video-2-1"
            videoSource={videoSource}
            poster={posterImage}
            keyPointText="Emotional granularity emphasizes the importance of recognizing the nuanced differences between various emotions. This elevated awareness of the range of emotions we experience can help us better interpret our emotional responses and shape our behaviors in a more productive manner."
            keyPointType="awareness" 
          />

          <ReadingSection title="Readings" introduction="Please complete the following readings:" links={readings} />

          <section className="lesson-section" id="reflecting-emotional-granularity">
            <h2 className="section-heading">Activity: Reflecting on Emotional Granularity</h2>
            <div className="content-block">
              <Card className="activity-card">
                <CardContent className="p-6">
                  <p className="mb-4">Can you identify a situation where you felt an emotion from the outermost circle of the wheel of emotional granularity? We encourage you to take your journal or a notebook and describe that situation and how you felt.</p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="lesson-section" id="emotion-pills">
            <h2 className="section-heading">The Emotion Pills We Are All Unknowingly Taking</h2>
            <div className="content-block">
              <p>Lee Newman, Dean of IE Business School, shares some insights on emotions in the video below:</p>
              <p className="mt-4">
                <a href="https://www.youtube.com/watch?v=H8UUWbQEH_E" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
                  https://www.youtube.com/watch?v=H8UUWbQEH_E
                </a>
              </p>
            </div>
          </section>

          <section className="lesson-section" id="what-went-well">
            <h2 className="section-heading">Activity: What Went Well?</h2>
            <div className="content-block">
              <Card className="activity-card">
                <CardContent className="p-6">
                  <p className="mb-4">This is a simple yet powerful exercise rooted in positive psychology. Studies have shown that this exercise has robust effects when it comes to boosting happiness and well-being. Here's how you can do it:</p>
                  
                  <ul className="bullet-list">
                    <li>Take your journal or a notebook.</li>
                    <li>Write down three things that went well today: These can be big achievements or small pleasures. For example, "I had a great conversation with a friend," "I enjoyed a delicious meal," or "I completed a challenging task at work."</li>
                    <li>Reflect on why each event went well: Consider what caused these positive events and what they mean to you. This helps deepen your appreciation and understanding of the good things in your life.</li>
                    <li>Consistency is key: Do this exercise daily for at least a week, but aim for longer to see more significant benefits.</li>
                  </ul>
                  
                  <h3 className="text-lg font-semibold mt-6 mb-3">Benefits:</h3>
                  <ul className="bullet-list">
                    <li>Counteracts negativity bias: This practice helps balance the natural tendency to focus on negative experiences by actively shifting our focus to positive events.</li>
                    <li>Increases gratitude: Regularly acknowledging good things – big or small – fosters a sense of appreciation that enhances well-being.</li>
                    <li>Fosters greater self-compassion: Reflecting on what went well can foster a kinder, more compassionate attitude towards yourself, reducing self-criticism.</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          <VideoSection 
            id="broaden-build" 
            title="The Broaden and Build Theory" 
            videoId="video-2-2"
            videoSource={videoSource}
            poster={posterImage}
            keyPointText="The Broaden and Build Theory, developed by Barbara Fredrickson, suggests that positive emotions broaden our awareness and visual field. As a result, we develop a greater appreciation of and ability to engage with the world around us."
            keyPointType="insight" 
          />

          <VideoSection 
            id="metacognition" 
            title="Metacognition and Increasing Awareness" 
            videoId="video-2-3"
            videoSource={videoSource}
            poster={posterImage}
            keyPointText="Metacognition is the concept of thinking about our thinking. Metacognition gives us a greater awareness of our thinking and learning so that we can be more proactive in our decision-making and work to avoid detrimental biases."
            keyPointType="awareness"
          />

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

          <VideoSection 
            id="body-mind-soul" 
            title="Awareness, Emotions, and Cognition Across Body, Mind, and Soul" 
            videoId="video-2-4"
            videoSource={videoSource}
            poster={posterImage}
          />

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

          <VideoSection 
            id="integrated-approach" 
            title="An Integrated Approach to Learning" 
            videoId="video-2-4"
            videoSource={videoSource}
            poster={posterImage}
          />

          <VideoSection 
            id="closing-meditation" 
            title="Closing Meditation: Lesson 2" 
            videoId="video-2-5"
            videoSource={videoSource}
            poster={posterImage}
          />
        </article>
      </section>

      <ChapterNavigation prevLink="/chapter1" prevText="Previous Chapter" nextLink="/chapter3" nextText="Next Chapter" />
    </>
  );
};

export default Chapter2Content;
