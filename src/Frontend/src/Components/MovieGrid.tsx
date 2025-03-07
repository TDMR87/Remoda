import { ReactNode, useEffect, useRef, useState } from "react";

interface MovieGridProps {
  children?: ReactNode;
}

export const MovieGrid = ({ children }: MovieGridProps) => {

  const [isChildrenVisibile, setIsChildrenVisible] = useState(false);
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const lastViewedMovieId = sessionStorage.getItem('lastViewedMovieId');
      if (lastViewedMovieId) {
        const lastViewedMovieCard = document.getElementById(lastViewedMovieId);
        if (lastViewedMovieCard) {
          lastViewedMovieCard.scrollIntoView({ block: 'center' });
          observer.disconnect(); // Stop observing after scrolling
        }
      }
      setIsChildrenVisible(true);
    });

    if (gridRef.current) {
      observer.observe(gridRef.current, { childList: true, subtree: true });
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={gridRef} className={`${isChildrenVisibile ? 'opacity-100' : 'opacity-0'} 
      mt-36 flex grow grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4`}>
      {children}
    </div>
  )
}