import { Link } from 'react-router-dom'
import { useAppContext } from "../Contexts/AppContext";
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { getMovie } from "../ApiClient";
import Rating from './Rating';

interface MovieCardProps {
  movie: MovieDetails
}

export const MovieCard = ({ movie }: MovieCardProps) => {

  const [isLoadingImage, setIsLoadingImage] = useState(true);
  const { colorSchemes } = useAppContext();
  const queryClient = useQueryClient();

  const saveLastViewedMovie = () => sessionStorage.setItem('lastViewedMovieId', `movie-${movie.id}`);

  const preFetchMovie = async (movieId: string) => {
    await queryClient.prefetchQuery({
      queryKey: ['movie', movieId],
      queryFn: async () => await getMovie(movieId.toString())
    })
  };

  return (
    <div id={`movie-${movie.id}`} className={`${colorSchemes.backgroundCard} rounded-xl shadow-lg relative max-w-sm ml-4 mr-4 mb-8 mt-0`}>
      <div className="p-4">
        <div className="flex flex-col mb-5 items-center">
          <h3 className={`text-xl font-bold ${colorSchemes.text}`}>
            {movie.title} ({movie.release_date?.slice(0, 4)})
          </h3>
          <div className="mb-6">
            <Rating starsCount={Math.ceil(movie.vote_average || 0)} />
          </div>
        </div>
        {/* Show image skeleton while the image loads */}
        <div className="flex flex-col mb-5 items-center">
          {isLoadingImage && (
            <div className="flex flex-col mb-5 items-center animate-pulse">
              <div className="w-48 h-64 bg-gray-300 rounded dark:bg-gray-700"></div>
            </div>
          )}
          {/* Image */}
          <img
            onLoad={() => setIsLoadingImage(false)}
            src={movie.imageBaseAddress + movie.poster_path}
            alt={`${movie.title} poster`}
            style={{
              borderRadius: '10px',
              width: isLoadingImage ? '0' : 'auto',  // Set width to 0 while loading
              height: isLoadingImage ? '0' : 'auto', // Set height to 0 while loading
            }}
          />
        </div>
        <div className={`mb-4 ${colorSchemes.text}`}>
          {movie.overview?.slice(0, 200)}...
          <Link
            to={`/movie/${movie.id}`}
            onClick={saveLastViewedMovie}
            onTouchEnd={saveLastViewedMovie}
            onMouseEnter={() => preFetchMovie(movie.id.toString())}
            onTouchStart={() => preFetchMovie(movie.id.toString())}
            className={`w-full text-sky-600 ${colorSchemes.linkHover}`}>
            Read more
          </Link>
        </div>
      </div>
    </div>
  )
}