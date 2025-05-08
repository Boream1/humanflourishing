
import React, { useEffect, useState, useCallback, useRef } from "react";
import { useVideoPlayer } from "../hooks/useVideoPlayer";
import { DEFAULT_POSTER, DEFAULT_VIDEO_SOURCE, ensureAbsolutePath } from "../utils/videoUtils";
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
  const [posterFailed, setPosterFailed] = useState(false);
  const posterImgRef = useRef<HTMLImageElement>(null);
  
  // Determine video type
  const isHLS = videoSource && videoSource.includes('.m3u8');
  const videoType = isHLS ? "application/x-mpegURL" : "video/mp4";

  // Ensure poster has correct absolute path
  const posterUrl = posterFailed ? DEFAULT_POSTER : ensureAbsolutePath(poster);
  
  // Make sure captions have absolute paths if provided
  const englishCaptionsUrl = englishCaptions ? ensureAbsolutePath(englishCaptions) : undefined;
  const spanishCaptionsUrl = spanishCaptions ? ensureAbsolutePath(spanishCaptions) : undefined;
  
  // Handle poster image error
  const handlePosterError = useCallback(() => {
    console.error(`Failed to load poster image for video ${videoId}: ${posterUrl}`);
    setPosterFailed(true);
  }, [videoId, posterUrl]);
  
  // Force poster to be visible after video is loaded
  useEffect(() => {
    if (!isLoading && videoRef.current) {
      const videoElement = videoRef.current;
      const forcePosterVisibility = () => {
        const posterElement = videoElement.querySelector('.vjs-poster');
        if (posterElement) {
          posterElement.style.display = 'block';
          posterElement.style.visibility = 'visible';
          posterElement.style.opacity = '1';
        }
      };
      
      // Apply immediately and after a delay to ensure it takes effect
      forcePosterVisibility();
      setTimeout(forcePosterVisibility, 100);
    }
  }, [isLoading, videoRef]);

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

  // Log the poster URL for debugging
  useEffect(() => {
    console.log(`Video ${videoId} poster URL: ${posterUrl}`);
  }, [videoId, posterUrl]);

  return (
    <section className="lesson-section" id={id}>
      <h2 className="section-heading">{title}</h2>
      <div className="content-block">
        <div className="video-container">
          {/* Hidden image preload to ensure poster is loaded */}
          <img 
            ref={posterImgRef}
            src={posterUrl}
            alt=""
            style={{ display: 'none' }}
            onError={handlePosterError}
          />
          
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
              
              {englishCaptionsUrl && (
                <track
                  kind="subtitles"
                  src={englishCaptionsUrl}
                  srcLang="en"
                  label="English"
                />
              )}
              
              {spanishCaptionsUrl && (
                <track
                  kind="subtitles"
                  src={spanishCaptionsUrl}
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

        {keyPointText && <KeyPoint text={keyPointText} />}
      </div>
    </section>
  );
};

export default VideoSection;
