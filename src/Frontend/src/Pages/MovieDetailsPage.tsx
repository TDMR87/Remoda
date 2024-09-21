import { Link, useParams } from 'react-router-dom';
import { MovieDetailsCardSkeleton } from '../Components/MovieDetailsCardSkeleton';
import { MovieDetailsCard } from '../Components/MovieDetailsCard';
import { useDarkMode } from "../Contexts/DarkModeContext";
import { useMovieDetails } from "../Hooks/useMovies";
import { ErrorPage } from "./ErrorPage";

export const MovieDetailsPage = () => {

  window.scrollTo({ top: 0 });
  const { id } = useParams<{ id: string }>();
  const { colorSchemes } = useDarkMode();
  const { status, data, error, isFetching } = useMovieDetails(id ?? "0");

  return (
    <>
      <Link to='/' className="text-sky-600 hover:text-slate-500 p-3">
        <span className={`${colorSchemes.text} text-2xl`}>&larr;</span>
        <span className={`${colorSchemes.text} text-lg`}> Return</span>
      </Link>

      <div className='flex flex-col items-center'>
        {isFetching && <MovieDetailsCardSkeleton />}
        {status === "success" && data && <MovieDetailsCard movie={data} />}
        {status === "error" && <ErrorPage Title="Oops.." Text={error.message} />}
      </div>
    </>
  )
}