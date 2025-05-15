
import React, { useRef, useEffect, useState } from "react";
import KeyPoint from "./KeyPoint";
import useFadeInOnScroll from "../hooks/useFadeInOnScroll";

interface VideoSectionProps {
  id: string;
  title: string;
  videoId: string;
  videoSource?: string;
  poster?: string;
  keyPointText?: string;
  keyPointType?: 'general' | 'social' | 'awareness' | 'insight' | 'wellbeing';
  englishCaptions?: string;
  spanishCaptions?: string;
}

const VideoSection: React.FC<VideoSectionProps> = ({
  id,
  title,
  videoId,
  videoSource = "https://iep-media.ie.edu/olj/human-flourishing/w0v01-welcome-to-the-course/mp4/w0v01-welcome-to-the-course_1080p.mp4",
  poster = "/assets/Poster_Video.png",
  keyPointText,
  keyPointType = 'general',
  englishCaptions,
  spanishCaptions,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const { ref, isVisible } = useFadeInOnScroll();

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handleCanPlay = () => setIsLoading(false);
    const handleError = (e: Event) => {
      console.error("Video error:", e);
      setHasError(true);
      setIsLoading(false);
    };

    videoElement.addEventListener("canplay", handleCanPlay);
    videoElement.addEventListener("error", handleError);

    let observer: IntersectionObserver | null = null;

    try {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && videoElement.getAttribute("data-src")) {
              videoElement.src = videoElement.getAttribute("data-src") || "";
              videoElement.load();
              observer?.unobserve(videoElement);
            }
          });
        },
        { threshold: 0.1 }
      );

      observer.observe(videoElement);
    } catch (error) {
      console.error("Error setting up IntersectionObserver:", error);
      if (videoElement.getAttribute("data-src")) {
        videoElement.src = videoElement.getAttribute("data-src") || "";
        videoElement.load();
      }
    }

    return () => {
      videoElement.removeEventListener("canplay", handleCanPlay);
      videoElement.removeEventListener("error", handleError);
      if (observer) observer.disconnect();
    };
  }, [videoId]);

  return (
    <section
      className={`lesson-section fade-up${isVisible ? " visible" : ""}`}
      id={id}
      ref={ref as React.RefObject<HTMLElement>}
    >
      <h2 className="section-heading">{title}</h2>
      <div className="content-block video-section-container">
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
              preload="none"
              poster={poster}
              playsInline
              data-src={videoSource}
            >
              <source type="video/mp4" />
              {englishCaptions && (
                <track
                  kind="subtitles"
                  src={englishCaptions}
                  srcLang="en"
                  label="English"
                />
              )}
              {spanishCaptions && (
                <track
                  kind="subtitles"
                  src={spanishCaptions}
                  srcLang="es"
                  label="Spanish"
                />
              )}
              <p>
                Your browser does not support HTML5 video. Please upgrade your browser.
              </p>
            </video>
          )}
        </div>
        {keyPointText && <KeyPoint text={keyPointText} type={keyPointType} />}
      </div>
    </section>
  );
};

export default VideoSection;
