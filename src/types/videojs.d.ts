
// Type definitions for video.js
declare namespace videojs {
  interface VideoJsPlayer {
    on(event: string, callback: Function): void;
    dispose(): void;
  }
}

interface Window {
  videojs: any;
}
