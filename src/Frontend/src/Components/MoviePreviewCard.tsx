import { FC } from "react"
import { Link } from 'react-router-dom'

interface MoviePreviewProps {
  movie: MovieDetails
}

export const MovieCard: FC<MoviePreviewProps> = ({ movie }) => {

  return (
    <>
      <div className="bg-stone-100 rounded-xl shadow-lg relative max-w-sm">
        <div className="p-4">
          <div className="flex flex-col mb-5 items-center">
            <h3 className="text-xl font-bold">
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
          <div className="mb-5">
            {movie.overview?.slice(0, 100)}...
          </div>
          <div className="flex flex-col lg:flex-row justify-between mb-4">
            <Link to={`/movie/${movie.id}`} className="w-full h-[36px] bg-sky-700 hover:bg-sky-900 text-white px-4 py-2 rounded-lg text-center text-sm">
              Read more
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}