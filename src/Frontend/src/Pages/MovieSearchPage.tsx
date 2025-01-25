import SearchBar from '../Components/SearchBar';
import { useState } from 'react';
import { MovieCard } from '../Components/MovieCard';
import { MovieCardSkeleton } from '../Components/MovieCardSkeleton';
import { MovieGrid } from '../Components/MovieGrid';
import { useMovieSearch } from '../Hooks/useMovies';
import { ErrorPage } from './ErrorPage';
import { VisibilityObserver } from '../Components/VisibilityObserver';

export const MovieSearchPage = () => {

    const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);
    const { data: movies, error, isLoading, fetchNextPage } = useMovieSearch(searchTerm);

    if (error) {
        return <ErrorPage Title='Oops..' Text={error.message} />
    }

    return (
        <>
            <SearchBar
                isSticky={() => movies?.pages === undefined || movies?.pages[0].total_results === 0}
                onActivate={setSearchTerm}
                onClear={() => {
                    setSearchTerm('');
                    window.scrollTo({ top: 0 });
                }} />

            <MovieGrid>
                {searchTerm && isLoading && [...Array(8)].map(() => <MovieCardSkeleton />)}
                {searchTerm && !isLoading && movies?.pages.map((searchResults) =>
                    searchResults.results.map((movie: MovieDetails) =>
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                <VisibilityObserver onVisible={fetchNextPage} />
            </MovieGrid>
        </>
    )
}