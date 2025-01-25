import { ReactNode, useEffect } from "react";

interface MovieGridProps {
  children?: ReactNode;
}

export const MovieGrid = ({ children }: MovieGridProps) => {
  useEffect(() => {
    setTimeout(() => {
      const lastViewedMovieId = sessionStorage.getItem('lastViewedMovieId');
      if (lastViewedMovieId) {
        const lastViewedMovieCard = document.getElementById(lastViewedMovieId);
        if (lastViewedMovieCard) {
          lastViewedMovieCard.scrollIntoView({ block: 'center' });
        }
      }
    }, 700);
  }, []);

  return (
    <div className="flex grow grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 mt-32">
      {children}
    </div>
  )
}