import axios from "../ApiClient";
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MovieDetailsCardSkeleton } from '../Components/MovieDetailsCardSkeleton';
import { MovieDetailsCard } from '../Components/MovieDetailsCard';

export const MovieDetailsPage = () => {

  const [movie, setMovie] = useState<MovieDetails | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get<MovieDetails>('movie/' + id)
        setMovie(response.data);
      }
      catch {
      }
      finally {
        setLoading(false);
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
        {loading && <MovieDetailsCardSkeleton />}
        {movie && <MovieDetailsCard movie={movie} />}
      </div>

    </>
  )
}