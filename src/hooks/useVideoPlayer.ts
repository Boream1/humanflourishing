
import { useEffect, useRef } from 'react';
import { cleanupExistingPlayer, getDefaultVideoConfig, isVideoJSAvailable } from '../utils/videoUtils';

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
  maxAttempts = 15, 
  attemptInterval = 1000 
}: UseVideoPlayerOptions) => {
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
        
        // Ensure the video element exists
        if (!videoRef.current) {
          console.error(`Video element ref not available for ${videoId}`);
          return;
        }
        
        // Initialize the video player
        console.log(`Initializing video player ${videoId}`);
        playerRef.current = window.videojs(videoRef.current, getDefaultVideoConfig());
        
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
    }, attemptInterval) as unknown as number;
    
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
  }, [videoId, maxAttempts, attemptInterval]);

  return { videoRef };
};
