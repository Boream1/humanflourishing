
import React from 'react';
import { Key, Users, AlertCircle, Lightbulb, Heart } from 'lucide-react';

interface KeyPointProps {
  text: string;
  type?: 'general' | 'social' | 'awareness' | 'insight' | 'wellbeing';
}

/**
 * Component for displaying key points in educational content
 * The icon changes based on the type of key point
 */
const KeyPoint: React.FC<KeyPointProps> = ({ text, type = 'general' }) => {
  if (!text) return null;
  
  // Select appropriate icon based on the key point type
  const getIcon = () => {
    switch (type) {
      case 'social':
        return <Users className="key-point-icon" size={28} strokeWidth={2} />;
      case 'awareness':
        return <AlertCircle className="key-point-icon" size={28} strokeWidth={2} />;
      case 'insight':
        return <Lightbulb className="key-point-icon" size={28} strokeWidth={2} />;
      case 'wellbeing':
        return <Heart className="key-point-icon" size={28} strokeWidth={2} />;
      default:
        return <Key className="key-point-icon" size={28} strokeWidth={2} />;
    }
  };
  
  return (
    <div className="key-point">
      <div className="key-point-header">
        {getIcon()}
        <h3>Key Point</h3>
      </div>
      <p>{text}</p>
    </div>
  );
};

export default KeyPoint;
