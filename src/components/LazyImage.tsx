
import React, { useState, useRef, useEffect } from 'react';
import { ImageIcon } from 'lucide-react';

interface LazyImageProps {
  src: string;
  webpSrc?: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  aspectRatio?: '16-9' | '4-3' | '1-1' | 'auto';
  onLoad?: () => void;
  onError?: () => void;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  webpSrc,
  alt,
  className = '',
  fallbackSrc = '/placeholder.svg',
  aspectRatio = 'auto',
  onLoad,
  onError
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const imgRef = useRef<HTMLImageElement>(null);
  const [isInView, setIsInView] = useState(false);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isInView) {
            setIsInView(true);
            setIsLoading(true);
            
            // Choose the best image source - prefer original src over webp for simplicity
            const bestSrc = src;
            setImageSrc(bestSrc);
            
            observer.unobserve(img);
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    observer.observe(img);

    return () => {
      observer.disconnect();
    };
  }, [src, isInView]);

  const handleLoad = () => {
    setIsLoaded(true);
    setIsLoading(false);
    setHasError(false);
    if (onLoad) onLoad();
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    
    // Try fallback image
    if (imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
      return;
    }
    
    if (onError) onError();
  };

  const aspectRatioClass = aspectRatio !== 'auto' ? `aspect-${aspectRatio}` : '';
  
  if (hasError && imageSrc === fallbackSrc) {
    return (
      <div className={`image-fallback ${aspectRatioClass} ${className}`}>
        <ImageIcon className="image-fallback-icon" />
        <span>Image not available</span>
      </div>
    );
  }

  return (
    <div className={`relative ${aspectRatioClass}`} ref={imgRef}>
      {imageSrc && (
        <img
          src={imageSrc}
          alt={alt}
          className={`lazy-image ${isLoaded ? 'loaded' : ''} ${isLoading ? 'loading' : ''} ${className}`}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
          decoding="async"
        />
      )}
      
      {isLoading && !isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="loading-spinner"></div>
        </div>
      )}
    </div>
  );
};

export default LazyImage;
