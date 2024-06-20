import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from './config';

const httpClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-type": "application/json"
  }
});

export const getMovieDetails = async (id: string | undefined): Promise<AxiosResponse<MovieDetails>> => {
  try {
    const response = await httpClient.get('movie/' + id);
    return response;
  } catch {
    throw new Error('Failed to fetch movie details');
  }
}

export const searchMovies = async (keyword: string, page?: number): Promise<AxiosResponse<MovieSearchResults>> => {
  try {
    const response = await httpClient.get('search', { params: { keyword, page } });
    return response;
  } catch {
    throw new Error('Failed to fetch movie details');
  }
}