import Footer from '../Footer/Footer';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';
import { DURATION_SHORT_MOVIE } from '../../utils/constant';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import Preloader from '../Preloader/Preloader';

const Movies = ({
  movies,
  isToggle,
  setIsToggle,
  searchValue,
  setSearchValue,
  onSearch,
  onSave,
  savedMovies,
  onDelete,
  filteredMovies,
  isLoading,
  isLiked,
  setIsLiked }) => {
  const [isShortMovies, setIsShortMovies] = useLocalStorage('isShortMovies', false);

  filteredMovies = isShortMovies
    ? movies.filter(
      (movie) =>
        movie.duration <= DURATION_SHORT_MOVIE &&
        movie.nameRU.toLowerCase().includes(searchValue.toLowerCase()),
    )
    : movies.filter((movie) =>
      movie.nameRU.toLowerCase().includes(searchValue.toLowerCase()),
    );

  return (
    <section className="movies">
      <SearchForm
        onSearch={onSearch}
        setIsShortMovies={setIsShortMovies}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        isToggle={isToggle}
        setIsToggle={setIsToggle}
        isSavedMoviesPage={false}
      />
      {isLoading && (
        <Preloader />
      )}
      {!isLoading && searchValue && filteredMovies.length > 0 ? (
        <MoviesCardList
          filteredMovies={filteredMovies}
          isSavedMoviesPage={false}
          movies={movies}
          searchValue={searchValue}
          onSave={onSave}
          savedMovies={savedMovies}
          onDelete={onDelete}
          isLoading={isLoading}
          isLiked={isLiked}
          setIsLiked={setIsLiked}
        />
      ) : (
        <p className='movies__no-result'>Ничего не найдено. Введите ключевое слово для поиска</p>
      )}
      <Footer />
    </section>
  );
};

export default Movies;
