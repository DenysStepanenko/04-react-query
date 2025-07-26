import axios from 'axios';
import type { MoviesResponse } from '../types/movie';

const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const apiClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
  },
} );

export const fetchMovies = async (query: string, page: number = 1): Promise<MoviesResponse> => {
  const response = await apiClient.get<MoviesResponse>(
    '/search/movie',
    {
      params: {
        query,
        page,
        include_adult: false,
        language: 'en-US',
      },
    }
  );
  return response.data;
};
