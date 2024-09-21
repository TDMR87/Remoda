import { useEffect, useRef } from 'react';

interface BottomScrollObserverProps {
  onBottomReached: () => void;
}

export const BottomScrollObserver = ({ onBottomReached }: BottomScrollObserverProps) => {
  const targetElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!targetElementRef.current) return;

    const target = targetElementRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) onBottomReached();
        });
      },
      {
        root: null, // Viewport is the container
        threshold: 0, // 0 means as soon as even one pixel is visible
      }
    );

    if (target) observer.observe(target);

    return () => { if (target) observer.unobserve(target); };
  }, [onBottomReached]);

  return (
    <div id="bottomObserver" className="opacity-0" ref={targetElementRef}></div>
  )
}