import axios from 'axios';
import type { Movie } from '../types/movie';

interface TmdbApiResponse {
  results: Movie[];
}

const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const apiClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
  },
} );

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const response = await apiClient.get<TmdbApiResponse>(
    '/search/movie',
    {
      params: {
        query,
        include_adult: false,
        language: 'en-US',
        page: 1,
      },
    }
  );
  return response.data.results;
};
