import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import ReactPaginate from 'react-paginate';
import { Toaster, toast } from 'react-hot-toast';
import { fetchMovies } from '../../services/movieService';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';
import type { Movie } from '../../types/movie';
import styles from './App.module.css';

const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  // Используем useQuery для получения данных
  const {
    data: moviesData,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ['movies', query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: !!query, // Запрос выполняется только если есть query
    staleTime: 5 * 60 * 1000, // Данные считаются свежими 5 минут
  });

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setPage(1); // Сбрасываем на первую страницу при новом поиске
  };

  const handlePageChange = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
    document.body.style.overflow = 'auto';
  };

  // Показываем уведомления об ошибках
  if (isError) {
    toast.error('Failed to fetch movies. Please try again.');
    console.error(error);
  }

  // Показываем уведомление если нет результатов
  if (moviesData && moviesData.results.length === 0 && query) {
    toast.error('No movies found for your request.');
  }

  return (
    <div className={styles.container}>
      <Toaster position="top-right" />
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {moviesData && moviesData.results.length > 0 && (
        <>
          <MovieGrid movies={moviesData.results} onSelect={handleSelectMovie} />
          {moviesData.total_pages > 1 && (
            <ReactPaginate
              pageCount={moviesData.total_pages}
              pageRangeDisplayed={5}
              marginPagesDisplayed={1}
              onPageChange={handlePageChange}
              forcePage={page - 1}
              containerClassName={styles.pagination}
              activeClassName={styles.active}
              nextLabel="→"
              previousLabel="←"
            />
          )}
        </>
      )}
      {selectedMovie && <MovieModal movie={selectedMovie} onClose={handleCloseModal} />}
    </div>
  );
};

export default App;
