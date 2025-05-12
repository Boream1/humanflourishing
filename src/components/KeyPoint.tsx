
import React from 'react';
import { Key, Users, AlertCircle, Lightbulb, Heart } from 'lucide-react';
import { Separator } from "./ui/separator";
import { Card, CardContent, CardHeader } from "./ui/card";

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
    <div className="key-point-card">
      <div className="key-point-header">
        <div className="key-point-icon-wrapper">
          {getIcon()}
        </div>
        <h3 className="key-point-title">Key Point</h3>
        <Separator className="my-2" />
      </div>
      <div className="key-point-content">
        <p className="key-point-text">{text}</p>
      </div>
    </div>
  );
};

export default KeyPoint;
