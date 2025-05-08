
import React from "react";
import VideoSection from "./VideoSection";
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

          <VideoSection 
            id="advanced-concepts" 
            title="Advanced Concepts in Human Connection" 
            videoId="video-2-1"
            keyPointText="Building on the foundational aspects of human connection, we now explore how these connections evolve and strengthen over time through consistent positive interactions." 
          />

          <VideoSection 
            id="technology-impact" 
            title="The Impact of Technology on Human Connection" 
            videoId="video-2-2"
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
