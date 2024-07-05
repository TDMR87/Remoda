import axios from "../ApiClient";
import { useState } from 'react'
import { MovieCard } from "../Components/MovieCard"
import { MovieGrid } from "../Components/MovieGrid"
import { SearchBar } from "../Components/SearchBar"
import { Repeat } from '../Components/Repeat'
import { BottomScrollListener } from '../Components/ScrollToBottomObserver'
import { MovieCardSkeleton } from '../Components/MovieCardSkeleton'

export const MovieSearchPage = () => {

  const [movies, setMovies] = useState<MovieDetails[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentSearchTerm, setSearchTerm] = useState('');
  const [currentPage, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchMovies = async (searchTerm: string, page: number) => {
    setLoading(true);
    try {
      const response = await axios.get<MovieSearchResults>('search', { params: { keyword: searchTerm, page } })
      setMovies(page == 1 ? response.data.results : [...movies, ...response.data.results]);
      setTotalPages(response.data.total_pages == totalPages ? totalPages : response.data.total_pages);
    }
    catch {
    }
    finally {
      setLoading(false);
    }
  }

  const resetMovies = () => {
    setMovies([]);
    setPage(1);
    setTotalPages(1);
    setSearchTerm('');
  }

  return (
    <>
      <SearchBar
        onClear={resetMovies}
        onActivate={async (searchTerm) => {
          setPage(1);
          setTotalPages(1);
          setSearchTerm(searchTerm);
          await fetchMovies(searchTerm, 1);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }} />

      <MovieGrid>
        {movies && movies.map((movie, index) => <MovieCard key={index} movie={movie} />)}
        {loading && <Repeat times={8}><MovieCardSkeleton /></Repeat>}
      </MovieGrid>

      <BottomScrollListener onBottomReached={async () => {
        if (!loading && movies.length > 0 && currentPage < totalPages) {
          setPage(currentPage + 1);
          await fetchMovies(currentSearchTerm, currentPage + 1)
        }
      }} />
    </>
  )
}

