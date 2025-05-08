
import React, { useEffect, useRef } from "react";

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

// Declare videojs as a property of the window object
declare global {
  interface Window {
    videojs: any;
  }
}

const DEFAULT_VIDEO_SOURCE = "https://iep-media.ie.edu/olj/human-flourishing/w0v01-welcome-to-the-course/mp4/w0v01-welcome-to-the-course_1080p.mp4";
const DEFAULT_POSTER = "/lovable-uploads/d8922e18-e45a-41bc-9aaa-0faed86084a5.png";

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
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<any>(null);
  const initAttemptsRef = useRef<number>(0);
  const mountedRef = useRef<boolean>(true);
  
  useEffect(() => {
    mountedRef.current = true;
    
    // Make sure VideoJS is available
    if (!window.videojs) {
      console.error(`VideoJS not available for ${videoId}`);
      return;
    }
    
    const maxAttempts = 5;
    let initInterval: number | undefined;
    
    // Initialize video player
    const initializePlayer = () => {
      if (!mountedRef.current) return;
      
      if (window.videojs && videoRef.current && initAttemptsRef.current < maxAttempts) {
        try {
          // Check if the player already exists
          let existingPlayer;
          try {
            existingPlayer = window.videojs.getPlayer(videoId);
          } catch (err) {
            // Player doesn't exist, which is what we want
          }
          
          // Clean up existing player if it exists
          if (existingPlayer) {
            try {
              existingPlayer.dispose();
            } catch (err) {
              console.warn(`Error disposing existing player for ${videoId}:`, err);
            }
          }
          
          if (playerRef.current) {
            try {
              playerRef.current.dispose();
            } catch (err) {
              console.warn(`Error disposing player ref for ${videoId}:`, err);
            }
            playerRef.current = null;
          }
          
          // Create new player instance with a short delay
          setTimeout(() => {
            if (!mountedRef.current) return;
            
            try {
              playerRef.current = window.videojs(videoRef.current, {
                playbackRates: [0.75, 1, 1.25, 1.5, 2],
                responsive: true,
                fluid: true,
                controls: true,
                preload: "auto"
              });
              
              // Register error handler
              playerRef.current.on('error', () => {
                if (mountedRef.current && playerRef.current) {
                  console.error(`Video player error for ${videoId}:`, playerRef.current.error());
                }
              });
              
              console.log(`Video player ${videoId} initialized successfully`);
              
              // Clear interval after successful initialization
              if (initInterval) {
                clearInterval(initInterval);
              }
            } catch (error) {
              console.error(`Error initializing video player ${videoId}:`, error);
              initAttemptsRef.current++;
            }
          }, 100);
        } catch (error) {
          console.error(`Error in video player initialization process for ${videoId}:`, error);
          initAttemptsRef.current++;
        }
      } else if (initAttemptsRef.current >= maxAttempts) {
        console.error(`Failed to initialize video player ${videoId} after ${maxAttempts} attempts`);
        if (initInterval) {
          clearInterval(initInterval);
        }
      }
    };
    
    // Start initialization attempts with a small delay to ensure DOM is ready
    setTimeout(() => {
      initInterval = window.setInterval(initializePlayer, 1000);
    }, 500);
    
    // Clean up on unmount
    return () => {
      mountedRef.current = false;
      if (initInterval) {
        clearInterval(initInterval);
      }
      
      if (playerRef.current) {
        try {
          playerRef.current.dispose();
          playerRef.current = null;
        } catch (e) {
          console.error(`Error disposing video player ${videoId}:`, e);
        }
      }
    };
  }, [videoId]);
  
  // Determine video type
  const isHLS = videoSource && videoSource.includes('.m3u8');
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
