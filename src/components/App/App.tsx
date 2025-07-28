import { useState, useEffect } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import ReactPaginate from 'react-paginate';
import toast, { Toaster } from 'react-hot-toast';
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
    isError,
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
      toast.error(`No movies found for "${searchQuery}"`);
    }
  }, [isSuccess, moviesData?.results, searchQuery]);

  useEffect(() => {
    if (isError) {
      toast.error('Failed to load movies. Please try again.');
    }
  }, [isError]);

  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected + 1);
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
      <Toaster />
      <h1>Movie Search</h1>
      
      <SearchBar onSubmit={handleSearchSubmit} />

      {isLoading && <Loader />}

      {isError && <ErrorMessage />}

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
                <ReactPaginate
                  pageCount={moviesData.total_pages}
                  pageRangeDisplayed={5}
                  marginPagesDisplayed={2}
                  onPageChange={handlePageChange}
                  forcePage={currentPage - 1}
                  containerClassName="pagination"
                  activeClassName="active"
                  previousLabel="Previous"
                  nextLabel="Next"
                />
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