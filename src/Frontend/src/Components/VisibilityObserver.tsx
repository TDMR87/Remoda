import { useEffect, useRef } from 'react';

interface VisibilityObserverProps {
  onVisible: () => void;
}

export const VisibilityObserver = ({ onVisible }: VisibilityObserverProps) => {
  const targetElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!targetElementRef.current) return;
    const target = targetElementRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onVisible();
          }
        });
      },
      {
        root: null, // Viewport is the container
        threshold: 0, // 0 means as soon as even one pixel is visible
      }
    );

    // Observe the target
    observer.observe(target);

    return () => { if (target) observer.unobserve(target); };
  }, []);

  return (
    <div id="bottomObserver" className="opacity-10" ref={targetElementRef}></div>
  )
}