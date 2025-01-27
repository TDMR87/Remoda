import SearchBar from '../Components/SearchBar';
import { useEffect, useState } from 'react';
import { MovieCard } from '../Components/MovieCard';
import { MovieCardSkeleton } from '../Components/MovieCardSkeleton';
import { MovieGrid } from '../Components/MovieGrid';
import { useMovieSearch } from '../Hooks/useMovies';
import { ErrorPage } from './ErrorPage';
import { VisibilityObserver } from '../Components/VisibilityObserver';
import { useAppContext } from '../Contexts/AppContext';

export const MovieSearchPage = () => {

    const { setSearchMode } = useAppContext();
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [showSkeleton, setShowSkeleton] = useState(false);
    const { data: movies, error, isLoading, fetchNextPage } = useMovieSearch(searchTerm);

    useEffect(() => {
        const skeletonDelay = setTimeout(() => setShowSkeleton(true), 2000);
        return () => clearTimeout(skeletonDelay);
    }, [searchTerm]);

    const search = (searchTerm: string) => {
        setShowSkeleton(false);
        if (searchTerm.length > 0) {
            setSearchMode(true);
            setSearchTerm(searchTerm);
        } else {
            setSearchMode(false);
        }
    }

    const clear = () => {
        setSearchMode(false);
        setSearchTerm('');
        window.scrollTo({ top: 0 })
    }

    return (
        <>
            <SearchBar
                isSticky={() => movies?.pages === undefined || movies?.pages[0].total_results === 0}
                onActivate={search}
                onClear={clear} />

            {error && <ErrorPage Title='Oops..' Text={error.message} />}

            <div className="mt-36">
                <MovieGrid>
                    {searchTerm && isLoading && showSkeleton && [...Array(8)].map((_, index) =>
                        <MovieCardSkeleton key={index} />)}

                    {searchTerm && !isLoading && movies?.pages.map((searchResults) =>
                        searchResults.results.map((movie: MovieDetails) =>
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    <VisibilityObserver onVisible={fetchNextPage} />
                </MovieGrid>
            </div>
        </>
    )
}