
import { useEffect, useRef, useState } from "react";

/**
 * useFadeInOnScroll hook
 * Adds fade+slide-up when element is visible on scroll.
 * Returns a ref and a boolean isVisible.
 */
const useFadeInOnScroll = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      // Threshold increased: must estar al menos ~45% visible para animarse, ¡más notorio en primer scroll!
      { threshold: 0.45 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
};

export default useFadeInOnScroll;

