import { Link, useParams } from 'react-router-dom';
import { MovieDetailsCardSkeleton } from '../Components/MovieDetailsCardSkeleton';
import { MovieDetailsCard } from '../Components/MovieDetailsCard';
import { useAppContext } from "../Contexts/AppContext";
import { useMovieDetails } from "../Hooks/useMovies";
import { Error } from "../Components/Error";
import { useEffect, useState } from 'react';

export const MovieDetailsPage = () => {

  window.scrollTo({ top: 0 });

  const [showSkeleton, setShowSkeleton] = useState(false);

  useEffect(() => {
    const skeletonDelay = setTimeout(() => {
      if (isLoading) setShowSkeleton(true);
    }, 2000);
    return () => clearTimeout(skeletonDelay);
  }, []);

  const { id } = useParams<{ id: string }>();
  const { colorSchemes } = useAppContext();
  const { data, isError, error, isLoading } = useMovieDetails(id ?? "0");

  if (isLoading && showSkeleton) {
    return <MovieDetailsCardSkeleton />
  }

  if (isError) {
    return <Error Title='Oops..' Text={error.message} />
  }

  return (
    <>
      <Link to='/' className="text-sky-600 hover:text-slate-500 p-2">
        <span className={`${colorSchemes.text} text-2xl`}>&larr;</span>
        <span className={`${colorSchemes.text} text-lg`}> Return</span>
      </Link>

      {data && <div className='flex flex-col items-center'>
        <MovieDetailsCard movie={data} />
      </div>}
    </>
  )
}