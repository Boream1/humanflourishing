
import React, { useEffect, useRef } from "react";

interface VideoSectionProps {
  id: string;
  title: string;
  videoId: string;
  videoSource: string;
  poster?: string;
  keyPointText?: string;
  englishCaptions?: string;
  spanishCaptions?: string;
}

// Declare videojs as a property of the window object
declare global {
  interface Window {
    videojs: any;
  }
}

const VideoSection: React.FC<VideoSectionProps> = ({
  id,
  title,
  videoId,
  videoSource,
  poster = "/lovable-uploads/d8922e18-e45a-41bc-9aaa-0faed86084a5.png",
  keyPointText,
  englishCaptions,
  spanishCaptions,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    // Wait for DOM to be ready and videojs to be available
    const initializePlayer = () => {
      if (window.videojs && videoRef.current) {
        try {
          // Make sure we dispose any previous instance first
          if (playerRef.current) {
            playerRef.current.dispose();
          }
          
          // Initialize the player
          playerRef.current = window.videojs(videoRef.current, {
            playbackRates: [0.75, 1, 1.25, 1.5, 2],
            responsive: true,
            fluid: true,
          });
          
          console.log(`Video player for ${videoId} initialized successfully`);
        } catch (error) {
          console.error(`Error initializing video player for ${videoId}:`, error);
        }
      } else {
        console.warn(`VideoJS or video element for ${videoId} not found, will retry`);
        setTimeout(initializePlayer, 500); // retry after a delay
      }
    };

    // Start initialization
    setTimeout(initializePlayer, 100);

    // Clean up on unmount
    return () => {
      if (playerRef.current) {
        try {
          playerRef.current.dispose();
        } catch (e) {
          console.error("Error disposing video player:", e);
        }
      }
    };
  }, [videoId]);

  // Determine if the video is an HLS stream or a regular MP4
  const isHLS = videoSource.includes('.m3u8');
  const videoType = isHLS ? "application/x-mpegURL" : "video/mp4";

  return (
    <section className="lesson-section" id={id}>
      <h2 className="section-heading">{title}</h2>
      <div className="content-block">
        <div className="video-container">
          <video
            ref={videoRef}
            id={videoId}
            className="video-js vjs-16-9 vjs-big-play-centered"
            controls
            preload="auto"
            poster={poster}
            data-setup="{}"
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
        </div>

        {keyPointText && (
          <div className="key-point">
            <h3>Key Point</h3>
            <p>{keyPointText}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default VideoSection;
