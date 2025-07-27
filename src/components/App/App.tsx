import { useState, useEffect } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchMovies } from '../../services/movieService';
import type { Movie } from '../../types/movie';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import MovieModal from '../MovieModal/MovieModal';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const {
    data: moviesData,
    isLoading,
    error,
    isSuccess,
  } = useQuery({
    queryKey: ['movies', searchQuery, currentPage],
    queryFn: () => fetchMovies(searchQuery, currentPage),
    enabled: !!searchQuery,
    placeholderData: keepPreviousData,
  });

  // Обработка сообщений в useEffect для предотвращения множественных рендеров
  useEffect(() => {
    if (isSuccess && moviesData?.results && moviesData.results.length === 0) {
      console.log('No movies found');
    }
  }, [isSuccess, moviesData?.results]);

  useEffect(() => {
    if (error) {
      console.error('Failed to load movies:', error);
    }
  }, [error]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleMovieSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  const handleSearchSubmit = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  return (
    <div>
      <h1>Movie Search</h1>
      
      <SearchBar onSubmit={handleSearchSubmit} />

      {isLoading && <Loader />}

      {error && <ErrorMessage />}

      {moviesData && (
        <>
          {moviesData.results.length === 0 ? (
            <div>No movies found for "{searchQuery}"</div>
          ) : (
            <>
              <MovieGrid 
                movies={moviesData.results} 
                onSelect={handleMovieSelect} 
              />
              
              {moviesData.total_pages > 1 && (
                <div>
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  <span>Page {currentPage} of {moviesData.total_pages}</span>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === moviesData.total_pages}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}

      {selectedMovie && (
        <MovieModal 
          movie={selectedMovie} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
};

export default App;