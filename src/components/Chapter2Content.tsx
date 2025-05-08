
import React from "react";
import Chapter2VideoSection from "./Chapter2VideoSection";
import ReadingSection from "./ReadingSection";
import LearningObjectives from "./LearningObjectives";
import ChapterNavigation from "./ChapterNavigation";

const Chapter2Content: React.FC = () => {
  const learningObjectives = [
    "Understand advanced concepts in human connection",
    "Apply critical thinking to social situations",
    "Evaluate the role of technology in human relationships"
  ];
  
  const readings = [{
    title: "The future of human connection",
    url: "https://www.ie.edu/insights/articles/the-future-of-human-connection/"
  }];

  return (
    <>
      <section className="chapter-header">
        <h1 className="chapter-title text-left">LESSON 2: Advanced Human Connection</h1>
      </section>

      <section className="chapter-body">
        <article className="lesson-content">
          <LearningObjectives objectives={learningObjectives} />

          <Chapter2VideoSection 
            id="advanced-concepts" 
            title="Advanced Concepts in Human Connection" 
            videoId="video-2-1"
            videoSource="https://iep-media.ie.edu/olj/human-flourishing/w0v01-welcome-to-the-course/mp4/w0v01-welcome-to-the-course_1080p.mp4"
            poster="/lovable-uploads/d8922e18-e45a-41bc-9aaa-0faed86084a5.png"
            keyPointText="Building on the foundational aspects of human connection, we now explore how these connections evolve and strengthen over time through consistent positive interactions." 
          />

          <Chapter2VideoSection 
            id="technology-impact" 
            title="The Impact of Technology on Human Connection" 
            videoId="video-2-2"
            videoSource="https://iep-media.ie.edu/olj/human-flourishing/w0v01-welcome-to-the-course/mp4/w0v01-welcome-to-the-course_1080p.mp4"
            poster="/lovable-uploads/d8922e18-e45a-41bc-9aaa-0faed86084a5.png"
            keyPointText="Technology presents both opportunities and challenges for human connection. Understanding how to leverage technology while maintaining authentic relationships is crucial for well-being in the digital age." 
          />

          <ReadingSection title="Readings" introduction="Please complete the readings below to deepen your understanding:" links={readings} />
        </article>
      </section>

      <ChapterNavigation prevLink="/chapter1" prevText="Previous Chapter" nextLink="/" nextText="Return Home" />
    </>
  );
};

export default Chapter2Content;
