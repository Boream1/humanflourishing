
import React, { useEffect, useRef } from "react";
import VideoSection from "./VideoSection";
import ReadingSection from "./ReadingSection";
import LearningObjectives from "./LearningObjectives";
import ChapterNavigation from "./ChapterNavigation";
import { createRoot } from "react-dom/client";
import ReflectionActivity from "./ReflectionActivity";
import { DEFAULT_VIDEO_SOURCE, DEFAULT_POSTER } from "../utils/videoUtils";

const Chapter1Content: React.FC = () => {
  const learningObjectives = ["Appreciate the complexity of human beings", "Understand the human need for social connection", "Evaluate the role and paradox of human biases"];
  const readings = [{
    title: "Why a strong social network improves performance, health, and well-being",
    url: "https://www.ie.edu/center-for-health-and-well-being/blog/why-a-strong-social-network-improves-performance-health-and-well-being/"
  }, {
    title: "Your journey to self-discovery",
    url: "https://www.ie.edu/center-for-health-and-well-being/blog/your-journey-to-self-discovery/"
  }];
  const optionalReadings = [{
    title: "Warmth and Competence Model",
    url: "https://www.sciencedirect.com/science/article/abs/pii/S0065260107000020"
  }, {
    title: "Human Connection in the Age of AI",
    url: "https://www.ie.edu/insights/articles/human-connection-in-the-age-of-ai/"
  }];
  
  // Create a ref to store the React root for the reflection activity
  const reflectionRootRef = useRef<any>(null);
  // Track if feedback event has been set up
  const feedbackSetupRef = useRef<boolean>(false);

  // Default video source and poster
  const videoSource = DEFAULT_VIDEO_SOURCE;
  const posterImage = DEFAULT_POSTER;

  useEffect(() => {
    // Remove loading indicator if it still exists
    const loadingIndicator = document.querySelector('.loading-indicator');
    if (loadingIndicator) {
      loadingIndicator.remove();
    }

    // Mount the reflection activity component
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

    // Configure feedback modal trigger for the last video with retries
    const configureFeedbackTrigger = () => {
      if (feedbackSetupRef.current) return;
      
      if (window.videojs) {
        try {
          // Try to get the last video player
          const lastVideoId = "video-1-6";
          const lastVideo = window.videojs.getPlayer(lastVideoId);
          
          if (lastVideo) {
            console.log("Configuring feedback event for last video");
            
            // Set up the ended event handler
            lastVideo.on("ended", function() {
              console.log("Last video ended, triggering feedback modal");
              document.dispatchEvent(new CustomEvent("ie-feedback-widget-openModal"));
            });
            
            feedbackSetupRef.current = true;
          }
        } catch (error) {
          console.error("Error setting up video end event:", error);
        }
      }
    };

    // Try multiple times to set up the feedback trigger
    const setupInterval = setInterval(() => {
      configureFeedbackTrigger();
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
      <section className="chapter-header">
        <h1 className="chapter-title text-left">LESSON 1: Being Human</h1>
      </section>

      <section className="chapter-body">
        <article className="lesson-content">
          <LearningObjectives objectives={learningObjectives} />

          <VideoSection 
            id="what-does-it-mean" 
            title="What Does It Mean to Be Human?" 
            videoId="video-1-1"
            videoSource={videoSource}
            poster={posterImage}
            keyPointText="As humans, we are programmed for survival. This instinct is still relevant in our lives today, even if we do not often face life-threatening situations. As a result, our brains may interpret certain events, such as an email or an exam, as a threat, even though these things are not life-threatening. Recognizing these kinds of 'primitive' responses as part of our human identity is a crucial step toward self-awareness and, ultimately, flourishing." 
          />

          <VideoSection 
            id="interconnection" 
            title="Being Human: The Interconnection of Body, Mind, and Soul" 
            videoId="video-1-2"
            videoSource={videoSource}
            poster={posterImage}
            keyPointText="Understanding the interconnection of the body, mind, and soul is key to promoting well-being. For example, by understanding the relationship between the amygdala and the prefrontal cortex and how physical exercise can affect that relationship, we can take more informed actions to promote our overall health." 
          />

          <VideoSection 
            id="social-connection" 
            title="The Importance of Human Social Connection" 
            videoId="video-1-3"
            videoSource={videoSource}
            poster={posterImage}
            keyPointText="As humans, we are wired for social connection. Research shows that meaningful social connection contributes to our happiness. In contrast, feelings of loneliness can have a significant detrimental impact on our well-being." 
          />

          <ReadingSection title="Readings" introduction="Please complete the readings below to engage with the following activities:" links={readings} />

          <section className="lesson-section" id="activity">
            <div id="reflection-activity-root"></div>
          </section>

          <VideoSection 
            id="human-biases" 
            title="Human Biases" 
            videoId="video-1-4"
            videoSource={videoSource}
            poster={posterImage}
            keyPointText="As humans, we all have biases. These biases are rooted in the need for survival and exist as a way for our brains to make quick, efficient decisions; however, they can also negatively affect our well-being. By understanding our biases and how they function, we can better cultivate practices that contribute to our flourishing." 
          />

          <VideoSection 
            id="leading-self" 
            title="Leading Self for Greater Impact in What We Do" 
            videoId="video-1-5"
            videoSource={videoSource}
            poster={posterImage}
          />

          <VideoSection 
            id="closing-meditation" 
            title="Closing Meditation: Lesson 1" 
            videoId="video-1-6"
            videoSource={videoSource}
            poster={posterImage}
          />

          <ReadingSection title="Optional Reading" introduction="Please complete the following readings if they are of interest to you!" links={optionalReadings} isOptional={true} />
        </article>
      </section>

      <ChapterNavigation prevLink="index.html" prevText="Back to Home" nextLink="chapter2.html" nextText="Next Chapter" />
    </>
  );
};

export default Chapter1Content;
