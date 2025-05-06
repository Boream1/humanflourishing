
import React, { useEffect } from "react";
import VideoSection from "./VideoSection";
import ReadingSection from "./ReadingSection";
import LearningObjectives from "./LearningObjectives";
import ChapterNavigation from "./ChapterNavigation";
import { createRoot } from "react-dom/client";
import ReflectionActivity from "./ReflectionActivity";

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

  useEffect(() => {
    // Mount the reflection activity component
    const reflectionRoot = document.getElementById("reflection-activity-root");
    if (reflectionRoot) {
      console.log("Mounting ReflectionActivity component");
      const root = createRoot(reflectionRoot);
      root.render(<ReflectionActivity />);
    } else {
      console.error("Reflection activity root element not found");
    }

    // Add event to dispatch feedback when user reaches the end
    const configureLastVideo = () => {
      const lastVideo = document.getElementById("video-1-6");
      if (lastVideo && window.videojs) {
        console.log("Configuring last video events");
        try {
          const player = window.videojs(lastVideo);
          player.on("ended", function () {
            console.log("Last video ended, triggering feedback modal");
            // Only trigger the feedback modal when the last video ends
            document.dispatchEvent(new CustomEvent("ie-feedback-widget-openModal"));
          });
        } catch (error) {
          console.error("Error setting up video end event:", error);
        }
      } else {
        console.warn("Last video element or videojs not found, will retry");
        // Try again in a moment as the video might not be fully initialized
        setTimeout(configureLastVideo, 1000);
      }
    };

    // Start checking for the last video after components have rendered
    setTimeout(configureLastVideo, 500);
  }, []);

  return <>
      <section className="chapter-header">
        <h1 className="chapter-title text-left">LESSON 1: Being Human</h1>
      </section>

      <section className="chapter-body">
        <article className="lesson-content">
          <LearningObjectives objectives={learningObjectives} />

          <VideoSection id="what-does-it-mean" title="What Does It Mean to Be Human?" videoId="video-1-1" videoSource="videos/w1v01-what-does-it-mean-to-be-human.mp4" englishCaptions="videos/captions/en/w1v01-what-does-it-mean-to-be-human.vtt" spanishCaptions="videos/captions/es/w1v01-what-does-it-mean-to-be-human.vtt" keyPointText="As humans, we are programmed for survival. This instinct is still relevant in our lives today, even if we do not often face life-threatening situations. As a result, our brains may interpret certain events, such as an email or an exam, as a threat, even though these things are not life-threatening. Recognizing these kinds of 'primitive' responses as part of our human identity is a crucial step toward self-awareness and, ultimately, flourishing." />

          <VideoSection id="interconnection" title="Being Human: The Interconnection of Body, Mind, and Soul" videoId="video-1-2" videoSource="videos/w1v02-being-human-the-interconnection-of-body-mind-and-soul.mp4" englishCaptions="videos/captions/en/w1v02-being-human-the-interconnection-of-body-mind-and-soul.vtt" spanishCaptions="videos/captions/es/w1v02-being-human-the-interconnection-of-body-mind-and-soul.vtt" keyPointText="Understanding the interconnection of the body, mind, and soul is key to promoting well-being. For example, by understanding the relationship between the amygdala and the prefrontal cortex and how physical exercise can affect that relationship, we can take more informed actions to promote our overall health." />

          <VideoSection id="social-connection" title="The Importance of Human Social Connection" videoId="video-1-3" videoSource="videos/w1v03-the-importance-of-human-social-connection.mp4" englishCaptions="videos/captions/en/w1v03-the-importance-of-human-social-connection.vtt" spanishCaptions="videos/captions/es/w1v03-the-importance-of-human-social-connection.vtt" keyPointText="As humans, we are wired for social connection. Research shows that meaningful social connection contributes to our happiness. In contrast, feelings of loneliness can have a significant detrimental impact on our well-being." />

          <ReadingSection title="Readings" introduction="Please complete the readings below to engage with the following activities:" links={readings} />

          <section className="lesson-section" id="activity">
            <div id="reflection-activity-root"></div>
          </section>

          <VideoSection id="human-biases" title="Human Biases" videoId="video-1-4" videoSource="videos/w1v04-human-biases.mp4" englishCaptions="videos/captions/en/w1v04-human-biases.vtt" spanishCaptions="videos/captions/es/w1v04-human-biases.vtt" keyPointText="As humans, we all have biases. These biases are rooted in the need for survival and exist as a way for our brains to make quick, efficient decisions; however, they can also negatively affect our well-being. By understanding our biases and how they function, we can better cultivate practices that contribute to our flourishing." />

          <VideoSection id="leading-self" title="Leading Self for Greater Impact in What We Do" videoId="video-1-5" videoSource="videos/w6v02-leadingself-for-greater-impact-in-what-we-do.mp4" englishCaptions="videos/captions/en/w6v02-leadingself-for-greater-impact-in-what-we-do.vtt" spanishCaptions="videos/captions/es/w6v02-leadingself-for-greater-impact-in-what-we-do.vtt" />

          <VideoSection id="closing-meditation" title="Closing Meditation: Lesson 1" videoId="video-1-6" videoSource="videos/w7v01-embracing-the-fullness-of-being-human.mp4" englishCaptions="videos/captions/en/w7v01-embracing-the-fullness-of-being-human.vtt" spanishCaptions="videos/captions/es/w7v01-embracing-the-fullness-of-being-human.vtt" />

          <ReadingSection title="Optional Reading" introduction="Please complete the following readings if they are of interest to you!" links={optionalReadings} isOptional={true} />
        </article>
      </section>

      <ChapterNavigation prevLink="index.html" prevText="Back to Home" nextLink="chapter2.html" nextText="Next Chapter" />
    </>;
};

export default Chapter1Content;
