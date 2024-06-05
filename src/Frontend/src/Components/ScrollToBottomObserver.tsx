import { useEffect, useRef } from 'react';

interface BottomScrollListenerProps {
  onBottomReached: () => void;
}

export const BottomScrollListener = ({ onBottomReached }: BottomScrollListenerProps) => {
  const bottomTriggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onBottomReached();
          }
        });
      },
      {
        root: null,
        rootMargin: "100px",
        threshold: 0.1,
      }
    );

    if (bottomTriggerRef.current) {
      observer.observe(bottomTriggerRef.current);
    }

    return () => {
      if (bottomTriggerRef.current) {
        observer.unobserve(bottomTriggerRef.current);
      }
    };
  }, [onBottomReached]);

  return (<div ref={bottomTriggerRef}></div>)
}