import { useDarkMode } from "../Contexts/DarkModeContext";

interface MovieDetailsProps {
  movie: MovieDetails
}

export const MovieDetailsCard = ({ movie }: MovieDetailsProps) => {

  const { colorSchemes } = useDarkMode();

  return (
    <div className={`${colorSchemes.background} rounded-xl shadow-sm relative max-w-4xl`}>
      <div className="p-4">
        <div className="flex flex-col md:flex-row mb-5 items-center md:items-start">
          <img src={movie.imageBaseAddress + movie.poster_path} className="mb-5 md:mb-0 md:mr-5 md:w-1/3" style={{ borderRadius: '10px' }} />
          <div className="md:w-2/3">
            <h3 className={`text-xl font-bold ${colorSchemes.text}`}>
              {movie.title} ({movie.release_date?.slice(0, 4)})
            </h3>
            <div className="text-lg text-yellow-500 mb-8 mt-2">
              {'★'.repeat(Math.ceil(movie.vote_average || 0))}
              <span className="ml-2">({Math.round(movie.vote_average || 0)}/10)</span>
              <p className='text-xs'>{movie.vote_count} vote(s)</p>
            </div>
            {movie.tagline && <i className={`mb-4 ${colorSchemes.text}`}>´´{movie.tagline}´´<br /><br /></i>}
            <p className={`mb-5 ${colorSchemes.text}`}>
              {movie.overview}
            </p>
            <hr className="mb-5" />
            <p className={`mb-4 ${colorSchemes.text}`}>
              Genres: {movie.genres?.map(genre => genre.name).join(", ")} <br />
              Release date: {movie.release_date} <br />
              Runtime: {movie.runtime} min
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

