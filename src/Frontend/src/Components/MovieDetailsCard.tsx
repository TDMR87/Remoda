import { useState } from "react";
import { useDarkMode } from "../Contexts/DarkModeContext";
import Rating from "./Rating";

interface MovieDetailsProps {
  movie: MovieDetails
}

export const MovieDetailsCard = ({ movie }: MovieDetailsProps) => {

  const [isLoadingImage, setIsLoadingImage] = useState(true);
  const { colorSchemes } = useDarkMode();

  return (
    <div className={`${colorSchemes.background} relative max-w-4xl`}>
      <div className="p-4">
        <div className="flex flex-col md:flex-row mb-5 items-center md:items-start">
          {isLoadingImage && (
            <div className="flex flex-col mb-5 items-center animate-pulse">
              <div className="w-64 h-96 bg-gray-200 rounded dark:bg-gray-700"></div>
            </div>
          )}
          <img
            onLoad={() => setIsLoadingImage(false)}
            src={movie.imageBaseAddress + movie.poster_path}
            className="mb-5 md:mb-0 md:mr-5 md:w-1/3"
            alt={`${movie.title} poster`}
            style={{
              borderRadius: '10px',
              width: isLoadingImage ? '0' : '250px',
              height: isLoadingImage ? '0' : 'auto'
            }} />
          <div className="md:w-2/3">
            <h3 className={`text-xl font-bold ${colorSchemes.text}`}>
              {movie.title} ({movie.release_date?.slice(0, 4)})
            </h3>
            <div className="mb-6">
              <Rating starsCount={Math.ceil(movie.vote_average || 0)} />
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

