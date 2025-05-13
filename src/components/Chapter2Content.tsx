
import React, { useEffect, useRef } from "react";
import VideoSection from "./VideoSection";
import ReadingSection from "./ReadingSection";
import HeroSection from "./HeroSection";
import ChapterNavigation from "./ChapterNavigation";
import EmotionalGranularityActivity from "./activities/EmotionalGranularityActivity";
import MetacognitionActivity from "./activities/MetacognitionActivity";
import WhatWentWellActivity from "./activities/WhatWentWellActivity";
import BodyMindSoulActivity from "./activities/BodyMindSoulActivity";
import EmotionPillsVideo from "./EmotionPillsVideo";

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
  const posterImage = "/assets/video-poster.jpg";

  // Track if feedback event has been set up
  const feedbackSetupRef = useRef<boolean>(false);

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
          
          <EmotionalGranularityActivity />
          
          <EmotionPillsVideo />
          
          <WhatWentWellActivity />

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

          <MetacognitionActivity />

          <VideoSection 
            id="body-mind-soul" 
            title="Awareness, Emotions, and Cognition Across Body, Mind, and Soul" 
            videoId="video-2-4"
            videoSource={videoSource}
            poster={posterImage}
          />

          <BodyMindSoulActivity />

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
