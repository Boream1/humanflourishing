
import React from "react";
import YouTubePlayer from "./YouTubePlayer";

const EmotionPillsVideo: React.FC = () => {
  return (
    <section className="lesson-section" id="emotion-pills">
      <h2 className="section-heading">The Emotion Pills We Are All Unknowingly Taking</h2>
      <div className="content-block">
        <p>Lee Newman, Dean of IE Business School, shares some insights on emotions in the video below:</p>
        <div className="youtube-video-container">
          <YouTubePlayer videoId="H8UUWbQEH_E" title="The Emotion Pills We Are All Unknowingly Taking" />
        </div>
      </div>
    </section>
  );
};

export default EmotionPillsVideo;
