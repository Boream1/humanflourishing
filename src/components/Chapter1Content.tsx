
import React, { useEffect, useRef } from "react";
import VideoSection from "./VideoSection";
import ReadingSection from "./ReadingSection";
import HeroSection from "./HeroSection";
import ChapterNavigation from "./ChapterNavigation";
import { createRoot } from "react-dom/client";
import ReflectionActivity from "./ReflectionActivity";
import { useLanguage } from "../context/LanguageContext";

const Chapter1Content: React.FC = () => {
  const { t, language } = useLanguage();
  
  const learningObjectives = [
    t("chapter1.objective1"),
    t("chapter1.objective2"),
    t("chapter1.objective3")
  ];
  
  const readings = [{
    title: language === "en" ? 
      "Why a strong social network improves performance, health, and well-being" : 
      "Por qué una red social fuerte mejora el rendimiento, la salud y el bienestar",
    url: "https://www.ie.edu/center-for-health-and-well-being/blog/why-a-strong-social-network-improves-performance-health-and-well-being/"
  }, {
    title: language === "en" ? 
      "Your journey to self-discovery" : 
      "Tu viaje de autodescubrimiento",
    url: "https://www.ie.edu/center-for-health-and-well-being/blog/your-journey-to-self-discovery/"
  }];
  
  const optionalReadings = [{
    title: language === "en" ? 
      "Warmth and Competence Model" : 
      "Modelo de Calidez y Competencia",
    url: "https://www.sciencedirect.com/science/article/abs/pii/S0065260107000020"
  }, {
    title: language === "en" ? 
      "Human Connection in the Age of AI" : 
      "Conexión Humana en la Era de la IA",
    url: "https://www.ie.edu/insights/articles/human-connection-in-the-age-of-ai/"
  }];
  
  // Create a ref to store the React root for the reflection activity
  const reflectionRootRef = useRef<any>(null);
  // Track if feedback event has been set up
  const feedbackSetupRef = useRef<boolean>(false);

  // Video source and poster - ensure poster image path is correctly formatted
  const videoSource = "https://iep-media.ie.edu/olj/human-flourishing/w0v01-welcome-to-the-course/mp4/w0v01-welcome-to-the-course_1080p.mp4";
  const posterImage = "/assets/Poster_Video.png";

  useEffect(() => {
    // Remove loading indicator if it still exists
    const loadingIndicator = document.querySelector('.loading-indicator');
    if (loadingIndicator) {
      loadingIndicator.remove();
    }

    // Mount the reflection activity component
    const mountReflectionActivity = () => {
      const reflectionRoot = document.getElementById("reflection-activity-root");
      if (reflectionRoot && !reflectionRootRef.current) {
        console.log("Mounting ReflectionActivity component");
        try {
          reflectionRootRef.current = createRoot(reflectionRoot);
          reflectionRootRef.current.render(<ReflectionActivity />);
        } catch (error) {
          console.error("Error rendering ReflectionActivity:", error);
        }
      }
    };

    // Safety check to ensure DOM is fully loaded before mounting
    if (document.readyState === 'complete') {
      mountReflectionActivity();
    } else {
      window.addEventListener('load', mountReflectionActivity);
      return () => window.removeEventListener('load', mountReflectionActivity);
    }

    // Set up the feedback trigger for the last video with safer event binding
    const setupFeedbackTrigger = () => {
      if (feedbackSetupRef.current) return;
      
      try {
        const lastVideo = document.getElementById("video-1-6") as HTMLVideoElement;
        
        if (lastVideo && lastVideo instanceof HTMLVideoElement) {
          console.log("Configuring feedback event for last video");
          
          const handleVideoEnd = () => {
            console.log("Last video ended, triggering feedback modal");
            document.dispatchEvent(new CustomEvent("ie-feedback-widget-openModal"));
          };
          
          lastVideo.addEventListener("ended", handleVideoEnd);
          feedbackSetupRef.current = true;
          
          return () => {
            if (lastVideo) {
              lastVideo.removeEventListener("ended", handleVideoEnd);
            }
          };
        }
      } catch (error) {
        console.error("Error setting up feedback trigger:", error);
      }
      
      return undefined;
    };

    // Try to set up feedback trigger with a timeout to ensure video elements are loaded
    const triggerTimeout = setTimeout(() => {
      setupFeedbackTrigger();
    }, 2000);

    // Also set up navigation feedback trigger
    const setupNavigationFeedback = () => {
      try {
        const navButtons = document.querySelectorAll('.nav-button.next');
        const handleNavClick = () => {
          console.log('Navigation button clicked, triggering feedback modal');
          document.dispatchEvent(new CustomEvent('ie-feedback-widget-openModal'));
        };
        
        navButtons.forEach(button => {
          button.addEventListener('click', handleNavClick);
        });
        
        return () => {
          navButtons.forEach(button => {
            button.removeEventListener('click', handleNavClick);
          });
        };
      } catch (error) {
        console.error("Error setting up navigation feedback:", error);
        return undefined;
      }
    };
    
    const navTimeout = setTimeout(setupNavigationFeedback, 1500);

    // Clean up
    return () => {
      clearTimeout(triggerTimeout);
      clearTimeout(navTimeout);
    };
  }, []);

  return (
    <>
      <HeroSection 
        title={t("chapter1.title")}
        objectives={learningObjectives}
        backgroundImage="/assets/talgat-baizrahmanov-BayiApxgDPY-unsplash.jpg"
      />

      <section className="chapter-body">
        <article className="lesson-content">
          <VideoSection 
            id="what-does-it-mean" 
            title={t("chapter1.section1.title")} 
            videoId="video-1-1"
            videoSource={videoSource}
            poster={posterImage}
            keyPointText={t("chapter1.section1.keyPoint")}
            keyPointType="insight"
          />

          <VideoSection 
            id="interconnection" 
            title={t("chapter1.section2.title")} 
            videoId="video-1-2"
            videoSource={videoSource}
            poster={posterImage}
            keyPointText={t("chapter1.section2.keyPoint")}
            keyPointType="wellbeing" 
          />

          <VideoSection 
            id="social-connection" 
            title={t("chapter1.section3.title")} 
            videoId="video-1-3"
            videoSource={videoSource}
            poster={posterImage}
            keyPointText={t("chapter1.section3.keyPoint")}
            keyPointType="social" 
          />

          <ReadingSection 
            title={t("chapter1.readings.title")} 
            introduction={t("chapter1.readings.intro")} 
            links={readings} 
          />

          <section className="lesson-section" id="activity">
            <div id="reflection-activity-root"></div>
          </section>

          <VideoSection 
            id="human-biases" 
            title={t("chapter1.section4.title")} 
            videoId="video-1-4"
            videoSource={videoSource}
            poster={posterImage}
            keyPointText={t("chapter1.section4.keyPoint")}
            keyPointType="awareness"
          />

          <VideoSection 
            id="leading-self" 
            title={t("chapter1.section5.title")} 
            videoId="video-1-5"
            videoSource={videoSource}
            poster={posterImage}
          />

          <VideoSection 
            id="closing-meditation" 
            title={t("chapter1.section6.title")} 
            videoId="video-1-6"
            videoSource={videoSource}
            poster={posterImage}
          />

          <ReadingSection 
            title={t("chapter1.optionalReadings.title")} 
            introduction={t("chapter1.optionalReadings.intro")} 
            links={optionalReadings} 
            isOptional={true} 
          />
        </article>
      </section>

      <ChapterNavigation prevLink="/" nextLink="/chapter2" />
    </>
  );
};

export default Chapter1Content;
