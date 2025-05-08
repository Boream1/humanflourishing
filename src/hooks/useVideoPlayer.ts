
import { useEffect, useRef, useState } from 'react';
import { cleanupExistingPlayer, getDefaultVideoConfig, isVideoJSAvailable, applyPoster, forceShowPoster } from '../utils/videoUtils';

interface UseVideoPlayerOptions {
  videoId: string;
  maxAttempts?: number;
  attemptInterval?: number;
}

/**
 * Custom hook for managing VideoJS player initialization and cleanup
 */
export const useVideoPlayer = ({ 
  videoId, 
  maxAttempts = 30,
  attemptInterval = 500
}: UseVideoPlayerOptions) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<any>(null);
  const initAttemptsRef = useRef<number>(0);
  const mountedRef = useRef<boolean>(true);
  const initTimerRef = useRef<number | undefined>(undefined);
  const [playerReady, setPlayerReady] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  // Function to initialize the player
  const initializePlayer = () => {
    if (!mountedRef.current) return;
    
    // Make sure DOM is fully loaded
    if (document.readyState !== 'complete') {
      initAttemptsRef.current++;
      return;
    }
    
    // Check if VideoJS is available
    if (!isVideoJSAvailable()) {
      console.warn(`VideoJS not available for ${videoId}, attempt ${initAttemptsRef.current + 1}`);
      initAttemptsRef.current++;
      return; // Continue retrying
    }
    
    try {
      // Clean up existing players to prevent conflicts
      cleanupExistingPlayer(videoId);
      
      if (playerRef.current) {
        try {
          playerRef.current.dispose();
        } catch (e) {
          // Failed to dispose, but we'll create a new one anyway
        }
        playerRef.current = null;
      }
      
      // Ensure the video element exists and is in the DOM
      if (!videoRef.current || !document.body.contains(videoRef.current)) {
        console.warn(`Video element ref not available or not in DOM for ${videoId}`);
        initAttemptsRef.current++;
        return;
      }
      
      // Store the poster URL before initializing VideoJS
      const posterUrl = videoRef.current.getAttribute('poster');
      
      // Initialize the video player
      console.log(`Initializing video player ${videoId}`);
      playerRef.current = window.videojs(videoRef.current, getDefaultVideoConfig());
      
      // Register event handlers
      playerRef.current.on('ready', () => {
        console.log(`Video player ${videoId} is ready`);
        setPlayerReady(true);
        
        // Ensure poster is applied correctly after player is ready
        if (posterUrl) {
          applyPoster(videoRef.current!, posterUrl);
          forceShowPoster(videoId, posterUrl);
          
          // Also ensure poster is visible when video pauses
          playerRef.current.on('pause', () => {
            setTimeout(() => {
              if (videoRef.current && mountedRef.current) {
                applyPoster(videoRef.current, posterUrl);
                forceShowPoster(videoId, posterUrl);
              }
            }, 50);
          });
          
          // Fix for poster not showing initially
          setTimeout(() => {
            if (videoRef.current && mountedRef.current) {
              applyPoster(videoRef.current, posterUrl);
              forceShowPoster(videoId, posterUrl);
            }
          }, 100);
        }
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
  
  // Use Intersection Observer to lazy load videos
  useEffect(() => {
    mountedRef.current = true;
    
    // Create intersection observer to initialize video only when visible
    const setupObserver = () => {
      if (!videoRef.current) return;
      
      observerRef.current = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          
          if (entry.isIntersecting) {
            console.log(`Video ${videoId} is in viewport, initializing`);
            // Small delay before first attempt to ensure DOM is ready
            setTimeout(initializePlayer, 100);
            
            // Set up interval for retries
            initTimerRef.current = window.setInterval(() => {
              if (playerReady || initAttemptsRef.current >= maxAttempts) {
                if (initAttemptsRef.current >= maxAttempts) {
                  console.error(`Failed to initialize video player ${videoId} after ${maxAttempts} attempts`);
                }
                clearInterval(initTimerRef.current);
                initTimerRef.current = undefined;
                return;
              }
              
              initializePlayer();
            }, attemptInterval) as unknown as number;
            
            // Disconnect observer once we start initialization
            observerRef.current?.disconnect();
          }
        },
        { threshold: 0.1 } // Trigger when at least 10% of the video is visible
      );
      
      observerRef.current.observe(videoRef.current);
    };
    
    // Wait a bit for the DOM to be ready
    setTimeout(setupObserver, 300);
    
    // Clean up on unmount
    return () => {
      mountedRef.current = false;
      
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      
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
  }, [videoId, maxAttempts, attemptInterval, playerReady]);

  return { videoRef, playerReady };
};
