
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
  preload: "auto",
  // Show poster even after video starts playing
  poster: {
    showOnVideoEnd: true,
    showOnPause: true
  }
});

// Helper function to ensure URLs are absolute regardless of router path
export const ensureAbsolutePath = (path: string): string => {
  // Handle empty paths
  if (!path) {
    return '';
  }

  // If it's already absolute (starts with http or /), return as is
  if (path.startsWith('http') || path.startsWith('/')) {
    return path;
  }
  // Otherwise, make it absolute
  return `/${path}`;
};

// Constants for default values
export const DEFAULT_VIDEO_SOURCE = "https://iep-media.ie.edu/olj/human-flourishing/w0v01-welcome-to-the-course/mp4/w0v01-welcome-to-the-course_1080p.mp4";

// Default poster with uploaded image
export const DEFAULT_POSTER = "/lovable-uploads/3e5fe53a-d9c8-4204-8e14-c0874ad02f9b.png";

// Apply poster manually to video element
export const applyPoster = (videoElement: HTMLVideoElement, posterUrl: string): void => {
  if (!videoElement) return;
  
  // Set poster attribute
  videoElement.setAttribute('poster', posterUrl);
  
  // Also apply to VideoJS poster element if it exists
  setTimeout(() => {
    try {
      const posterDiv = videoElement.parentElement?.querySelector('.vjs-poster');
      if (posterDiv) {
        (posterDiv as HTMLElement).style.backgroundImage = `url(${posterUrl})`;
        (posterDiv as HTMLElement).style.display = 'block';
        (posterDiv as HTMLElement).style.visibility = 'visible';
        (posterDiv as HTMLElement).style.opacity = '1';
      }
    } catch (e) {
      console.error('Error applying poster manually:', e);
    }
  }, 100);
};
