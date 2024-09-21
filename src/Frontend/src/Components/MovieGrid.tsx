import { ReactNode, useEffect, useRef } from "react";

interface MovieGridProps {
  children?: ReactNode;
}

export const MovieGrid = ({ children }: MovieGridProps) => {

  const movieGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lastViewedMovieId = sessionStorage.getItem('lastViewedMovieId');

    const scrollToLastViewedMovie = () => {
      if (lastViewedMovieId) {
        const lastViwewedMovieCard = document.getElementById(lastViewedMovieId!);
        if (lastViwewedMovieCard) {
          lastViwewedMovieCard.scrollIntoView({ block: 'center' });
        }
      }
    }

    // Delay auto-scrolling to ensure cards are rendered
    setTimeout(() => {
      scrollToLastViewedMovie();
    }, 800);
  }, []);

  return (
    <div ref={movieGridRef} className="flex grow grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-32">
      {children}
    </div>
  )
}