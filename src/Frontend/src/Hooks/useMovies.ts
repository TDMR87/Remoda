import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { searchMovies, getMovie } from "../ApiClient";

export const useMovieSearch = (searchTerm: string) => useInfiniteQuery<MovieSearchResults, Error>({
    queryKey: searchTerm ? ['movies', searchTerm] : ['movies'],
    getNextPageParam: (previousResult) => previousResult.page < previousResult.total_pages ? previousResult.page + 1 : undefined,
    queryFn: ({ pageParam }) => searchMovies(searchTerm, pageParam as number),
    initialPageParam: 1,
    staleTime: 1000 * 60 * 60,
    enabled: !!searchTerm
});

export const useMovieDetails = (movieId: string) => useQuery({
    queryKey: ['movie', movieId],
    queryFn: async () => await getMovie(movieId),
    staleTime: 1000 * 60 * 60,
});