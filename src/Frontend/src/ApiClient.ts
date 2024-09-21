import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export const ApiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-type": "application/json"
  }
});

export const searchMovies = async (searchTerm: string | undefined, pageNumber: number = 1) => {
  const result = await ApiClient.get<MovieSearchResults>('search', { params: { keyword: searchTerm, page: pageNumber } })
  return result.data;
}

export const getMovie = async (movieId: string) => {
  const result = await ApiClient.get<MovieDetails>('movie/' + movieId)
  return result.data;
}