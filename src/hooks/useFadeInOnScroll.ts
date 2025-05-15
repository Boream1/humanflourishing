
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
      { threshold: 0.15 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
};

export default useFadeInOnScroll;
