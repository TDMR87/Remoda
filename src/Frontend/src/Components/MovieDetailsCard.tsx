import { useDarkMode } from "../Hooks/DarkModeContext";

interface MovieDetailsProps {
  movie: MovieDetails
}

export const MovieDetailsCard = ({ movie }: MovieDetailsProps) => {

  const { isDarkMode } = useDarkMode();

  return (
    <div className={`${isDarkMode ? 'bg-slate-900' : 'bg-stone-100'} rounded-xl shadow-lg relative max-w-4xl`}>
      <div className="p-4">
        <div className="flex flex-col md:flex-row mb-5 items-center md:items-start">
          <img src={movie.imageBaseAddress + movie.poster_path} className="mb-5 md:mb-0 md:mr-5 md:w-1/3" />
          <div className="md:w-2/3">
            <h3 className={`text-xl font-bold ${isDarkMode ? 'text-stone-100' : 'text-slate-900'}`}>
              {movie.title} ({movie.release_date?.slice(0, 4)})
            </h3>
            <div className="text-yellow-500 mb-8">
              {'★'.repeat(Math.ceil(movie.vote_average || 0))}
              <span className="ml-2">({Math.ceil(movie.vote_average || 0)}/10)</span>
            </div>
            {movie.tagline && <i className={`mb-4 ${isDarkMode ? 'text-stone-300' : 'text-gray-500'}`}>´´{movie.tagline}´´<br /><br /></i>}
            <p className={`mb-5 ${isDarkMode ? 'text-stone-100' : 'text-slate-900'}`}>
              {movie.overview}
            </p>
            <hr className="mb-5" />
            <p className={`mb-4 ${isDarkMode ? 'text-stone-100' : 'text-slate-900'}`}>
              Release date: {movie.release_date} <br />
              Genres: {movie.genres?.map(genre => genre.name).join(", ")} <br />
              Runtime: {movie.runtime} min
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

