
import React from "react";

interface YouTubePlayerProps {
  videoId: string;
  title?: string;
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ videoId, title }) => {
  return (
    <div className="youtube-player">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title || "YouTube video player"}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="youtube-iframe"
      />
    </div>
  );
};

export default YouTubePlayer;
