import { useState } from 'react'
import { searchMovies } from '../ApiClient'
import { MovieCard } from "../Components/MovieCard"
import { MovieGrid } from "../Components/MovieGrid"
import { SearchBar } from "../Components/SearchBar"
import { BottomScrollListener } from '../Components/ScrollToBottomObserver'
import { MovieCardSkeleton } from '../Components/MovieCardSkeleton'

export const HomePage = () => {

  const [loading, setLoading] = useState(false);
  const [currentSearchTerm, setCurrentSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [movies, setMovies] = useState<MovieDetails[]>([]);

  const executeSearch = async (searchTerm: string, page: number = 1) => {
    setLoading(true);
    const response = await searchMovies(searchTerm, page);

    if (searchTerm === currentSearchTerm) {
      setMovies([...movies, ...response.data.results]);
    }
    else {
      setMovies(response.data.results);
    }

    setLoading(false);
    setCurrentPage(response.data.page);
    setTotalPages(response.data.total_pages);
    setCurrentSearchTerm(searchTerm);
  }

  const undoSearch = () => {
    setCurrentSearchTerm('');
    setCurrentPage(0);
    setTotalPages(0);
    setMovies([]);
  }

  return (
    <>
      <SearchBar onActivate={(searchTerm) => executeSearch(searchTerm)} onClear={undoSearch} />
      <MovieGrid>

        {/* Display a few card skeletons while loading */}
        {loading && [...Array(8)].map((index) => <MovieCardSkeleton key={index} />)}

        {movies.map((movie, index) =>
          <>
            <MovieCard key={movie.id} movie={movie} />

            {
              /* If we are on the last item, display a spinner 
              if we are loading more movies */
              loading && index === (movies.length - 1) && <MovieCardSkeleton />
            }

            {
              /* Execute a new search if the user reached the bottom of the page */
              index === movies.length - 1 && (currentPage < totalPages) &&
              <BottomScrollListener onBottomReached={() => executeSearch(currentSearchTerm, currentPage + 1)} />
            }
          </>
        )}
      </MovieGrid>
    </>
  )
}