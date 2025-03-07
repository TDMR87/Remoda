import SearchBar from '../Components/SearchBar';
import { useMemo, useState } from 'react';
import { MovieCard } from '../Components/MovieCard';
import { MovieCardSkeleton } from '../Components/MovieCardSkeleton';
import { useMovies } from '../Hooks/useMovies';
import { Error } from '../Components/Error';
import { VisibilityObserver } from '../Components/VisibilityObserver';
import { useAppContext } from '../Contexts/AppContext';
import { MovieGrid } from '../Components/MovieGrid';

export const MovieSearchPage = () => {

    const { setIsSearchActive, currentSearchTerm, setSearchTerm } = useAppContext();
    const { data, error, isLoading, isFetchingNextPage, fetchNextPage } = useMovies(currentSearchTerm);
    const [showSkeleton, setShowSkeleton] = useState(false);

    const movies = useMemo(() =>
        data?.pages.flatMap((page: MovieSearchResults) => page.results) || [],
        [data?.pages]
    );

    const search = (searchTerm: string) => {
        setShowSkeleton(false);
        if (searchTerm.length > 0) {
            window.scrollTo({ top: 0 })
            setIsSearchActive(true);
            setSearchTerm(searchTerm);
            setTimeout(() => { if (!data) setShowSkeleton(true); }, 2500);
        }
    }

    const clear = () => {
        setIsSearchActive(false);
        setShowSkeleton(false);
        setSearchTerm('');
    }

    if (isLoading && showSkeleton) {
        return <>
            <SearchBar onActivate={search} onClear={clear} isSticky={() => true} />

            <MovieGrid>
                {[...Array(8)].map((_, index) => <MovieCardSkeleton key={index} />)}
            </MovieGrid>
        </>
    }

    if (error) {
        return <Error Title='Oops..' Text={error.message} />
    }

    return (
        <>
            <SearchBar onActivate={search} onClear={clear} isSticky={
                () => !data?.pages || data?.pages[0].total_results === 0} />

            <MovieGrid>
                {movies.map((movie: MovieDetails) => <MovieCard key={movie.id} movie={movie} />)}

                {isFetchingNextPage && [...Array(8)].map((_, index) => <MovieCardSkeleton key={index} />)}

                <VisibilityObserver onVisible={fetchNextPage} />
            </MovieGrid>
        </>
    )
}