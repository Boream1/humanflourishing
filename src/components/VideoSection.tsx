
import React, { useEffect, useState } from "react";
import { useVideoPlayer } from "../hooks/useVideoPlayer";
import { DEFAULT_POSTER, DEFAULT_VIDEO_SOURCE } from "../utils/videoUtils";
import KeyPoint from "./KeyPoint";

interface VideoSectionProps {
  id: string;
  title: string;
  videoId: string;
  videoSource?: string;
  poster?: string;
  keyPointText?: string;
  englishCaptions?: string;
  spanishCaptions?: string;
}

const VideoSection: React.FC<VideoSectionProps> = ({
  id,
  title,
  videoId,
  videoSource = DEFAULT_VIDEO_SOURCE,
  poster = DEFAULT_POSTER,
  keyPointText,
  englishCaptions,
  spanishCaptions,
}) => {
  const { videoRef } = useVideoPlayer({ videoId });
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  
  // Determine video type
  const isHLS = videoSource && videoSource.includes('.m3u8');
  const videoType = isHLS ? "application/x-mpegURL" : "video/mp4";

  // Ensure poster has correct path
  const posterUrl = poster.startsWith('/') || poster.startsWith('http') 
    ? poster 
    : `/${poster}`;
  
  useEffect(() => {
    // Check if VideoJS is loaded after component mount
    const checkVideoJS = () => {
      if (typeof window !== 'undefined' && window.videojs) {
        setIsLoading(false);
      }
    };
    
    // Try immediately
    checkVideoJS();
    
    // Then set up an interval to check periodically
    const interval = setInterval(checkVideoJS, 1000);
    
    // Clean up
    return () => clearInterval(interval);
  }, []);

  // Log the poster URL to help with debugging
  useEffect(() => {
    console.log(`Video ${videoId} poster URL: ${posterUrl}`);
  }, [videoId, posterUrl]);

  return (
    <section className="lesson-section" id={id}>
      <h2 className="section-heading">{title}</h2>
      <div className="content-block">
        <div className="video-container">
          {hasError ? (
            <div className="video-error-message">
              <p>There was an error loading the video. Please try refreshing the page.</p>
            </div>
          ) : (
            <video
              ref={videoRef}
              id={videoId}
              className="video-js vjs-16-9 vjs-big-play-centered"
              controls
              preload="auto"
              poster={posterUrl}
              data-setup="{}"
              onError={() => setHasError(true)}
            >
              <source src={videoSource} type={videoType} />
              
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
              
              <p className="vjs-no-js">
                To view this video please enable JavaScript, and consider upgrading
                to a web browser that{" "}
                <a
                  href="https://videojs.com/html5-video-support/"
                  target="_blank"
                  rel="noreferrer"
                >
                  supports HTML5 video
                </a>
              </p>
            </video>
          )}
          {isLoading && (
            <div className="video-loading">
              <div className="loading-spinner"></div>
              <p>Loading video player...</p>
            </div>
          )}
        </div>

        <KeyPoint text={keyPointText} />
      </div>
    </section>
  );
};

export default VideoSection;
