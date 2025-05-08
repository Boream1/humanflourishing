
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
  const initTimerRef = useRef<number | undefined>(undefined);
  
  useEffect(() => {
    mountedRef.current = true;
    
    const initializePlayer = () => {
      if (!mountedRef.current) return;
      
      // Check if VideoJS is available
      if (typeof window.videojs === 'undefined') {
        console.warn(`VideoJS not available for ${videoId}, attempt ${initAttemptsRef.current + 1}`);
        initAttemptsRef.current++;
        return; // Continue retrying
      }
      
      try {
        // Clean up existing players to prevent conflicts
        try {
          const existingPlayer = window.videojs.getPlayer(videoId);
          if (existingPlayer) {
            existingPlayer.dispose();
          }
        } catch (e) {
          // Player doesn't exist yet, which is fine
        }
        
        if (playerRef.current) {
          try {
            playerRef.current.dispose();
          } catch (e) {
            // Failed to dispose, but we'll create a new one anyway
          }
          playerRef.current = null;
        }
        
        // Ensure the video element exists
        if (!videoRef.current) {
          console.error(`Video element ref not available for ${videoId}`);
          return;
        }
        
        // Initialize the video player
        console.log(`Initializing video player ${videoId}`);
        playerRef.current = window.videojs(videoRef.current, {
          playbackRates: [0.75, 1, 1.25, 1.5, 2],
          responsive: true,
          fluid: true,
          controls: true,
          preload: "auto"
        });
        
        // Register event handlers
        playerRef.current.on('ready', () => {
          console.log(`Video player ${videoId} is ready`);
        });
        
        playerRef.current.on('error', () => {
          if (mountedRef.current && playerRef.current) {
            console.error(`Video player error for ${videoId}:`, playerRef.current.error());
          }
        });
        
        console.log(`Video player ${videoId} initialized successfully`);
        
        // Clear interval since we succeeded
        if (initTimerRef.current) {
          clearInterval(initTimerRef.current);
          initTimerRef.current = undefined;
        }
      } catch (error) {
        console.error(`Error initializing video player ${videoId}:`, error);
        initAttemptsRef.current++;
      }
    };
    
    // Start initialization attempts
    const maxAttempts = 10;
    
    // First attempt immediately
    initializePlayer();
    
    // Set up interval for retries
    initTimerRef.current = window.setInterval(() => {
      if (initAttemptsRef.current >= maxAttempts) {
        console.error(`Failed to initialize video player ${videoId} after ${maxAttempts} attempts`);
        clearInterval(initTimerRef.current);
        initTimerRef.current = undefined;
        return;
      }
      
      initializePlayer();
    }, 1000) as unknown as number;
    
    // Clean up on unmount
    return () => {
      mountedRef.current = false;
      
      if (initTimerRef.current) {
        clearInterval(initTimerRef.current);
        initTimerRef.current = undefined;
      }
      
      if (playerRef.current) {
        try {
          playerRef.current.dispose();
        } catch (e) {
          console.error(`Error disposing video player ${videoId}:`, e);
        }
        playerRef.current = null;
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
