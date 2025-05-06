
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
  poster = "assets/video-poster.jpg",
  keyPointText,
  englishCaptions,
  spanishCaptions,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Initialize the video player when the component mounts
    if (window.videojs && document.getElementById(videoId)) {
      try {
        const player = window.videojs(videoId, {
          playbackRates: [0.75, 1, 1.25, 1.5, 2],
          responsive: true,
        });

        // Cleanup on unmount
        return () => {
          if (player) {
            player.dispose();
          }
        };
      } catch (error) {
        console.error(`Error initializing video player for ${videoId}:`, error);
      }
    } else {
      console.warn(`VideoJS or video element ${videoId} not found`);
    }
  }, [videoId]);

  // Determine if the video is an HLS stream or a regular MP4
  const isHLS = videoSource.includes('.m3u8');
  const videoType = isHLS ? "application/x-mpegURL" : "video/mp4";

  // Function to handle capturing poster image when no poster is provided
  const handleCapturePoster = () => {
    if (videoRef.current && !poster && videoRef.current.duration > 0) {
      // Seek to 5% of the video (to avoid black frames at the beginning)
      try {
        videoRef.current.currentTime = videoRef.current.duration * 0.05;
        console.log("Attempting to capture poster frame from video");
      } catch (error) {
        console.error("Error seeking video for poster capture:", error);
      }
    }
  };

  return (
    <section className="lesson-section" id={id}>
      <h2 className="section-heading">{title}</h2>
      <div className="content-block">
        <div className="video-container">
          <video
            id={videoId}
            ref={videoRef}
            className="video-js vjs-16-9 vjs-big-play-centered"
            controls
            preload="auto"
            poster={poster}
            data-setup="{}"
            onLoadedMetadata={handleCapturePoster}
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
