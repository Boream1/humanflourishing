
import React from "react";
import { useVideoPlayer } from "../hooks/useVideoPlayer";
import { DEFAULT_POSTER, DEFAULT_VIDEO_SOURCE } from "../utils/videoUtils";
import KeyPoint from "./KeyPoint";

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
  const { videoRef } = useVideoPlayer({ videoId });
  
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

        <KeyPoint text={keyPointText} />
      </div>
    </section>
  );
};

export default VideoSection;
