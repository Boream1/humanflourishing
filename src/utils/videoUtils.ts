
/**
 * Utility functions for working with VideoJS
 */

// Check if VideoJS is loaded in the window object
export const isVideoJSAvailable = (): boolean => {
  return typeof window !== 'undefined' && typeof window.videojs !== 'undefined';
};

// Try to dispose an existing player to prevent conflicts
export const cleanupExistingPlayer = (playerId: string): void => {
  if (!isVideoJSAvailable()) return;
  
  try {
    const existingPlayer = window.videojs.getPlayer(playerId);
    if (existingPlayer) {
      existingPlayer.dispose();
    }
  } catch (e) {
    // Player doesn't exist yet, which is fine
  }
};

// Default video configuration with standard options
export const getDefaultVideoConfig = () => ({
  playbackRates: [0.75, 1, 1.25, 1.5, 2],
  responsive: true,
  fluid: true,
  controls: true,
  preload: "auto"
});

// Constants for default values
export const DEFAULT_VIDEO_SOURCE = "https://iep-media.ie.edu/olj/human-flourishing/w0v01-welcome-to-the-course/mp4/w0v01-welcome-to-the-course_1080p.mp4";

// Ensure the poster path is correct by using the absolute path
export const DEFAULT_POSTER = "/lovable-uploads/d8922e18-e45a-41bc-9aaa-0faed86084a5.png";
