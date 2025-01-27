import { ReactNode, useEffect, useState } from "react";

interface MovieGridProps {
  children?: ReactNode;
}

export const MovieGrid = ({ children }: MovieGridProps) => {

  const [isChildrenVisibile, setIsChildrenVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      const lastViewedMovieId = sessionStorage.getItem('lastViewedMovieId');
      if (lastViewedMovieId) {
        const lastViewedMovieCard = document.getElementById(lastViewedMovieId);
        if (lastViewedMovieCard) {
          lastViewedMovieCard.scrollIntoView({ block: 'center' });
        }
      }

      setIsChildrenVisible(true);
    }, 700);
  }, []);

  return (
    <div className={`${isChildrenVisibile ? 'opacity-100' : 'opacity-0'} flex grow grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4`}>
      {children}
    </div>
  )
}