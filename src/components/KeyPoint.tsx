
import React from 'react';

interface KeyPointProps {
  text: string;
}

/**
 * Component for displaying key points in educational content
 */
const KeyPoint: React.FC<KeyPointProps> = ({ text }) => {
  if (!text) return null;
  
  return (
    <div className="key-point">
      <h3>Key Point</h3>
      <p>{text}</p>
    </div>
  );
};

export default KeyPoint;
