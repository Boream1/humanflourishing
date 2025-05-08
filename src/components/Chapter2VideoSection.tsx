
import React, { useRef, useEffect, useState } from "react";
import KeyPoint from "./KeyPoint";

interface VideoSectionProps {
  id: string;
  title: string;
  videoId: string;
  videoSource?: string;
  poster?: string;
  keyPointText?: string;
}

const Chapter2VideoSection: React.FC<VideoSectionProps> = ({
  id,
  title,
  videoId,
  videoSource = "https://iep-media.ie.edu/olj/human-flourishing/w0v01-welcome-to-the-course/mp4/w0v01-welcome-to-the-course_1080p.mp4",
  poster = "/lovable-uploads/d8922e18-e45a-41bc-9aaa-0faed86084a5.png",
  keyPointText,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handleCanPlay = () => {
      setIsLoading(false);
    };

    const handleError = () => {
      setHasError(true);
      setIsLoading(false);
      console.error("Error loading video:", videoId);
    };

    videoElement.addEventListener("canplay", handleCanPlay);
    videoElement.addEventListener("error", handleError);

    return () => {
      videoElement.removeEventListener("canplay", handleCanPlay);
      videoElement.removeEventListener("error", handleError);
    };
  }, [videoId]);

  return (
    <section className="lesson-section" id={id}>
      <h2 className="section-heading">{title}</h2>
      <div className="content-block">
        <div className="video-container">
          {isLoading && !hasError && (
            <div className="video-loading">
              <div className="loading-spinner"></div>
              <p>Loading video...</p>
            </div>
          )}
          
          {hasError ? (
            <div className="video-error-message">
              <p>There was an error loading the video. Please try refreshing the page.</p>
            </div>
          ) : (
            <video
              ref={videoRef}
              id={videoId}
              className="html5-video"
              controls
              preload="auto"
              poster={poster}
              playsInline
            >
              <source src={videoSource} type="video/mp4" />
              <p>
                Your browser does not support HTML5 video. Please upgrade your browser.
              </p>
            </video>
          )}
        </div>

        {keyPointText && <KeyPoint text={keyPointText} />}
      </div>
    </section>
  );
};

export default Chapter2VideoSection;
