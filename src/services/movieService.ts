import axios from 'axios';
import type { Movie } from '../types/movie';

// Интерфейс для ответа API
interface MoviesResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
  page: number;
}

const API_BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (query: string, page: number = 1): Promise<MoviesResponse> => {
  const response = await axios.get<MoviesResponse>(`${API_BASE_URL}/search/movie`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
    params: {
      query,
      page,
    },
  });

  return response.data;
};