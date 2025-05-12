
import React from 'react';
import { Square } from 'lucide-react';

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
      <div className="key-point-header">
        <Square className="key-point-icon" size={24} strokeWidth={2} />
        <h3>Key Point</h3>
      </div>
      <p>{text}</p>
    </div>
  );
};

export default KeyPoint;
