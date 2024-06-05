import { useEffect, useState } from 'react';
import { getMovieDetails } from '../ApiClient';
import { Link, useParams } from 'react-router-dom';
import { MovieCardSkeleton } from '../Components/MovieCardSkeleton';
import { MovieDetailsCard } from '../Components/MovieDetailsCard';

export const MovieDetailsPage = () => {

  const [movie, setMovieDetails] = useState<MovieDetails | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await getMovieDetails(id);
        setMovieDetails(response.data);
      } catch (error) {
        console.log(error);
      }
      finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, []);

  return (
    <>
      <Link to='/' className="text-white bg-sky-700 hover:bg-sky-900 rounded-md mb-5 px-3 py-2 mt-4">
        Go back
      </Link>
      <div className='flex flex-col items-center'>
        {isLoading && <MovieCardSkeleton />}
        {movie && <MovieDetailsCard movie={movie} />}
      </div>


    </>
  )
}