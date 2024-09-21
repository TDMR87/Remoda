import { Link } from 'react-router-dom'
import { useDarkMode } from "../Contexts/DarkModeContext";

interface MovieCardProps {
  movie: MovieDetails
}

export const MovieCard = ({ movie }: MovieCardProps) => {

  const { colorSchemes } = useDarkMode();
  const saveScrollPosition = () => sessionStorage.setItem('lastViewedMovieId', `movie-${movie.id}`);

  return (
    <>
      <div id={`movie-${movie.id}`} className={`${colorSchemes.backgroundCard} rounded-xl shadow-lg relative max-w-sm ml-4 mr-4 mb-8 mt-0`}>
        <div className="p-4">
          <div className="flex flex-col mb-5 items-center">
            <h3 className={`text-xl font-bold ${colorSchemes.text}`}>
              {movie.title} ({movie.release_date?.slice(0, 4)})
            </h3>
            <div className="text-lg text-yellow-500 mt-2">
              {'★'.repeat(Math.ceil(movie.vote_average || 0))}
              <span className="ml-2">({Math.ceil(movie.vote_average || 0)}/10)</span>
            </div>
          </div>
          <div className="flex flex-col mb-5 items-center">
            <img src={movie.imageBaseAddress + movie.poster_path} style={{ borderRadius: '10px' }} />
          </div>
          <div className={`mb-4 ${colorSchemes.text}`}>
            {movie.overview?.slice(0, 200)}...
            <Link
              to={`/movie/${movie.id}`}
              onClick={saveScrollPosition}
              className={`w-full text-sky-600 ${colorSchemes.linkHover}`}>
              Read more
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}