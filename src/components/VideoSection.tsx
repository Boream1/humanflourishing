
import React, { useRef, useEffect, useState } from "react";
import KeyPoint from "./KeyPoint";
import { Card, CardContent, CardHeader } from "./ui/card";

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
  poster = "/lovable-uploads/d70cbd33-ee63-4b9b-86d7-da464c08ee54.png",
  keyPointText,
  keyPointType = 'general',
  englishCaptions,
  spanishCaptions,
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

    // Set up lazy loading with Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && videoElement.getAttribute("data-src")) {
            videoElement.src = videoElement.getAttribute("data-src") || "";
            videoElement.load();
            observer.unobserve(videoElement);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(videoElement);

    return () => {
      videoElement.removeEventListener("canplay", handleCanPlay);
      videoElement.removeEventListener("error", handleError);
      observer.disconnect();
    };
  }, [videoId]);

  return (
    <section className="lesson-section bento-container" id={id}>
      <Card className="video-module-card">
        <CardHeader>
          <h2 className="section-heading">{title}</h2>
        </CardHeader>
        <CardContent>
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

            {keyPointText && (
              <div className="key-point-container">
                <KeyPoint text={keyPointText} type={keyPointType} />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default VideoSection;
