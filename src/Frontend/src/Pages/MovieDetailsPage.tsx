import { Link, useParams } from 'react-router-dom';
import { MovieDetailsCardSkeleton } from '../Components/MovieDetailsCardSkeleton';
import { MovieDetailsCard } from '../Components/MovieDetailsCard';
import { useAppContext } from "../Contexts/AppContext";
import { useMovieDetails } from "../Hooks/useMovies";
import { ErrorPage } from "./ErrorPage";
import { useEffect, useState } from 'react';

export const MovieDetailsPage = () => {

  const [showSkeleton, setShowSkeleton] = useState(false);

  useEffect(() => {
    // Delay showing the skeleton to avoid flashing
    const skeletonDelay = setTimeout(() => setShowSkeleton(true), 500);
    return () => clearTimeout(skeletonDelay);
  }, []);

  window.scrollTo({ top: 0 });
  const { id } = useParams<{ id: string }>();
  const { colorSchemes } = useAppContext();
  const { status, data, error, isFetching } = useMovieDetails(id ?? "0");

  return (
    <>
      <Link to='/' className="text-sky-600 hover:text-slate-500 p-2">
        <span className={`${colorSchemes.text} text-2xl`}>&larr;</span>
        <span className={`${colorSchemes.text} text-lg`}> Return</span>
      </Link>

      <div className='flex flex-col items-center'>
        {isFetching && showSkeleton && <MovieDetailsCardSkeleton />}
        {status === "success" && data && <MovieDetailsCard movie={data} />}
        {status === "error" && <ErrorPage Title="Oops.." Text={error.message} />}
      </div>
    </>
  )
}