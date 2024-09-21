import SearchBar from '../Components/SearchBar';
import { useState } from 'react';
import { MovieCard } from '../Components/MovieCard';
import { MovieCardSkeleton } from '../Components/MovieCardSkeleton';
import { MovieGrid } from '../Components/MovieGrid';
import { Repeater } from '../Components/Repeater';
import { useMovieSearch } from '../Hooks/useMovies';
import { ErrorPage } from './ErrorPage';
import { BottomScrollObserver } from '../Components/BottomScrollObserver';

export const MovieSearchPage = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const { data: movies, error, isLoading, isFetchingNextPage, fetchNextPage } = useMovieSearch(searchTerm);

    if (error) return <ErrorPage Title='Oops..' Text={error.message} />

    return (
        <>
            <SearchBar onActivate={setSearchTerm} onClear={() => { setSearchTerm('') }} />

            <MovieGrid>
                {movies?.pages.map((page) => {
                    return page.results.map((movie: MovieDetails) => {
                        return <MovieCard key={movie.id} movie={movie} />
                    });
                })}

                {searchTerm && (isLoading || isFetchingNextPage) && <Repeater count={8}>
                    <MovieCardSkeleton />
                </Repeater>}

                <BottomScrollObserver onBottomReached={fetchNextPage} />
            </MovieGrid>
        </>
    )
}