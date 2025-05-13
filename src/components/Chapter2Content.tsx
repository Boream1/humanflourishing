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
import { useLanguage } from "../context/LanguageContext";

const Chapter2Content: React.FC = () => {
  const { t, language } = useLanguage();
  
  const learningObjectives = [
    t("chapter2.objective1"),
    t("chapter2.objective2"),
    t("chapter2.objective3"),
    t("chapter2.objective4")
  ];
  
  const readings = [{
    title: language === "en" ? 
      "The Wheel of Emotional Granularity" : 
      "La Rueda de la Granularidad Emocional",
    url: "https://www.restoringhoperca.com/the-feelings-wheel"
  }, {
    title: language === "en" ? 
      "The role of emotional granularity in emotional regulation, mental disorders, and well-being" : 
      "El papel de la granularidad emocional en la regulación emocional, trastornos mentales y bienestar",
    url: "https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2022.1080713/full"
  }];
  
  // Video source and poster - ensure poster image path is correctly formatted
  const videoSource = "https://iep-media.ie.edu/olj/human-flourishing/w0v01-welcome-to-the-course/mp4/w0v01-welcome-to-the-course_1080p.mp4";
  const posterImage = "/assets/Poster_Video.png";

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
        title={t("chapter2.title")}
        objectives={learningObjectives}
        backgroundImage="/assets/talgat-baizrahmanov-BayiApxgDPY-unsplash.jpg"
      />

      <section className="chapter-body">
        <article className="lesson-content">
          <VideoSection 
            id="emotional-granularity" 
            title={t("chapter2.section1.title")} 
            videoId="video-2-1"
            videoSource={videoSource}
            poster={posterImage}
            keyPointText={t("chapter2.section1.keyPoint")}
            keyPointType="awareness" 
          />

          <ReadingSection 
            title={t("chapter2.readings.title")} 
            introduction={t("chapter2.readings.intro")} 
            links={readings} 
          />
          
          <EmotionalGranularityActivity />
          
          <EmotionPillsVideo />
          
          <WhatWentWellActivity />

          <VideoSection 
            id="broaden-build" 
            title={t("chapter2.section2.title")} 
            videoId="video-2-2"
            videoSource={videoSource}
            poster={posterImage}
            keyPointText={t("chapter2.section2.keyPoint")}
            keyPointType="insight" 
          />

          <VideoSection 
            id="metacognition" 
            title={t("chapter2.section3.title")} 
            videoId="video-2-3"
            videoSource={videoSource}
            poster={posterImage}
            keyPointText={t("chapter2.section3.keyPoint")}
            keyPointType="awareness"
          />

          <MetacognitionActivity />

          <VideoSection 
            id="body-mind-soul" 
            title={t("chapter2.section4.title")} 
            videoId="video-2-4"
            videoSource={videoSource}
            poster={posterImage}
          />

          <BodyMindSoulActivity />

          <VideoSection 
            id="integrated-approach" 
            title={t("chapter2.section5.title")} 
            videoId="video-2-4"
            videoSource={videoSource}
            poster={posterImage}
          />

          <VideoSection 
            id="closing-meditation" 
            title={t("chapter2.section6.title")} 
            videoId="video-2-5"
            videoSource={videoSource}
            poster={posterImage}
          />
        </article>
      </section>

      <ChapterNavigation prevLink="/chapter1" nextLink="/chapter3" />
    </>
  );
};

export default Chapter2Content;
