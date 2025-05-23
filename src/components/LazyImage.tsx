
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
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const imgRef = useRef<HTMLImageElement>(null);
  const [supportsWebP, setSupportsWebP] = useState(false);

  // Check WebP support
  useEffect(() => {
    const checkWebPSupport = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    };
    
    setSupportsWebP(checkWebPSupport());
  }, []);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isLoading && !isLoaded) {
            setIsLoading(true);
            
            // Choose the best image source
            const bestSrc = supportsWebP && webpSrc ? webpSrc : src;
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
  }, [src, webpSrc, supportsWebP, isLoading, isLoaded]);

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

  const aspectRatioClass = aspectRatio !== 'auto' ? `aspect-ratio-${aspectRatio}` : '';
  
  if (hasError && imageSrc === fallbackSrc) {
    return (
      <div className={`image-fallback ${aspectRatioClass} ${className}`}>
        <ImageIcon className="image-fallback-icon" />
        <span>Image not available</span>
      </div>
    );
  }

  return (
    <div className={`relative ${aspectRatioClass}`}>
      <img
        ref={imgRef}
        src={imageSrc}
        alt={alt}
        className={`lazy-image ${isLoaded ? 'loaded' : ''} ${isLoading ? 'loading' : ''} ${className}`}
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
        decoding="async"
      />
      
      {isLoading && !isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="loading-spinner"></div>
        </div>
      )}
    </div>
  );
};

export default LazyImage;
