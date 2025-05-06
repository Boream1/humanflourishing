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
  poster = "/lovable-uploads/f583848a-2f31-4283-9f10-9b4b82b71127.png",
  keyPointText,
  englishCaptions,
  spanishCaptions,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<any>(null);
  
  // Check if the video source is a complete URL or needs to be made relative
  const getRelativePath = (path: string) => {
    if (!path) return "";
    
    // If it's already a complete URL with protocol, return it as is
    if (path.startsWith('http')) {
      return path;
    }
    
    // If it's already a relative path starting with / or ./, return it as is
    if (path.startsWith('/') || path.startsWith('./')) {
      return path;
    }
    
    // Otherwise, make it relative to the current location
    return `./${path}`;
  };

  // Get the correct video source path
  const processedVideoSource = getRelativePath(videoSource);
  
  // Get correct poster path
  const processedPoster = getRelativePath(poster);

  // Process caption paths if they exist
  const processedEnglishCaptions = englishCaptions ? getRelativePath(englishCaptions) : undefined;
  const processedSpanishCaptions = spanishCaptions ? getRelativePath(spanishCaptions) : undefined;

  useEffect(() => {
    // Create a flag to track component mount state
    let isMounted = true;
    let attempts = 0;
    const maxAttempts = 10;
    
    const initializePlayer = () => {
      // Check if component is still mounted
      if (!isMounted) return;
      
      // Check if videojs is available and the video element exists
      if (typeof window.videojs === 'function' && videoRef.current && attempts < maxAttempts) {
        try {
          // Make sure we dispose any previous instance first
          if (playerRef.current) {
            playerRef.current.dispose();
            playerRef.current = null;
          }
          
          // Initialize video.js player
          console.log(`Initializing video player for ${videoId} with source ${processedVideoSource}`);
          playerRef.current = window.videojs(videoRef.current, {
            playbackRates: [0.75, 1, 1.25, 1.5, 2],
            responsive: true,
            fluid: true,
            controls: true,
            preload: "auto"
          });
          
          // Add error event handler
          playerRef.current.on('error', (e: any) => {
            if (isMounted) {
              console.error(`Video player error for ${videoId}:`, playerRef.current.error());
            }
          });
          
          console.log(`Video player for ${videoId} initialized successfully`);
        } catch (error) {
          console.error(`Error initializing video player for ${videoId}:`, error);
          attempts++;
          if (attempts < maxAttempts && isMounted) {
            // Try again after a delay
            setTimeout(initializePlayer, 1500); 
          }
        }
      } else if (attempts < maxAttempts && isMounted) {
        console.warn(`VideoJS or video element for ${videoId} not found, will retry (attempt ${attempts + 1}/${maxAttempts})`);
        attempts++;
        setTimeout(initializePlayer, 1500); // retry with a longer delay
      } else if (isMounted) {
        console.error(`Failed to initialize video player for ${videoId} after ${maxAttempts} attempts.`);
      }
    };
    
    // Check if videojs is already available before setting up
    if (window.videojs) {
      // Start initialization after a short delay to ensure DOM is ready
      const initTimer = setTimeout(initializePlayer, 500);
    } else {
      // If videojs isn't available, listen for it to load
      console.log(`Waiting for VideoJS to load for video ${videoId}...`);
      const checkVideoJs = setInterval(() => {
        if (window.videojs) {
          clearInterval(checkVideoJs);
          initializePlayer();
        }
      }, 500);
      
      // Safety timeout to clear interval if videojs never loads
      setTimeout(() => {
        clearInterval(checkVideoJs);
        console.error(`VideoJS failed to load for video ${videoId} after timeout`);
      }, 10000);
    }

    // Clean up on unmount
    return () => {
      isMounted = false;
      if (playerRef.current) {
        try {
          playerRef.current.dispose();
          playerRef.current = null;
        } catch (e) {
          console.error(`Error disposing video player for ${videoId}:`, e);
        }
      }
    };
  }, [videoId, processedVideoSource]);

  // Determine if the video is an HLS stream or a regular MP4
  const isHLS = processedVideoSource.includes('.m3u8');
  const videoType = isHLS ? "application/x-mpegURL" : "video/mp4";

  // Handle separate error for when video fails to load
  const handleVideoError = () => {
    console.error(`Error loading video source: ${processedVideoSource}`);
  };

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
            poster={processedPoster}
            data-setup="{}"
            onError={handleVideoError}
          >
            <source src={processedVideoSource} type={videoType} />
            
            {processedEnglishCaptions && (
              <track
                kind="subtitles"
                src={processedEnglishCaptions}
                srcLang="en"
                label="English"
              />
            )}
            
            {processedSpanishCaptions && (
              <track
                kind="subtitles"
                src={processedSpanishCaptions}
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
