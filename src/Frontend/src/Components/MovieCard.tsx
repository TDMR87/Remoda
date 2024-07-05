import { FC } from "react"
import { Link } from 'react-router-dom'
import { useDarkMode } from "../Hooks/DarkModeContext";

interface MovieCardProps {
  movie: MovieDetails
}

export const MovieCard: FC<MovieCardProps> = ({ movie }) => {

  const { isDarkMode } = useDarkMode();

  return (
    <>
      <div className={`${isDarkMode ? 'bg-slate-900' : 'bg-stone-100'} rounded-xl shadow-lg relative max-w-sm`} >
        <div className="p-4">
          <div className="flex flex-col mb-5 items-center">
            <h3 className={`text-xl font-bold ${isDarkMode ? 'text-stone-100' : 'text-slate-900'}`}>
              {movie.title} ({movie.release_date?.slice(0, 4)})
            </h3>
            <div className="text-yellow-500 mt-2">
              {'★'.repeat(Math.ceil(movie.vote_average || 0))}
              <span className="ml-2">({Math.ceil(movie.vote_average || 0)}/10)</span>
            </div>
          </div>
          <div className="flex flex-col mb-5 items-center">
            <img src={movie.imageBaseAddress + movie.poster_path} />
          </div>
          <div className={`mb-4 ${isDarkMode ? 'text-stone-100' : 'text-slate-900'}`}>
            {movie.overview?.slice(0, 200)}...
            <Link to={`/movie/${movie.id}`} className="w-full text-sky-600 hover:text-slate-700">
              Read more
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}