import Footer from '../Footer/Footer';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './SavedMovies.css';
import { DURATION_SHORT_MOVIE } from '../../utils/constant';
import { useState } from 'react';

const SavedMovies = ({
  movies,
  filteredMovies,
  onDelete,
  searchValue,
  setSearchValue,
  isToggle,
  setIsToggle,
  onSearch,
  savedMovies
}) => {
  const [isShortMovies, setIsShortMovies] = useState(false);

  filteredMovies = isShortMovies
    ? movies.filter(
      (movie) =>
        movie.duration <= DURATION_SHORT_MOVIE &&
        movie.nameRU.toLowerCase().includes(searchValue.toLowerCase())
    )
    : movies.filter((movie) =>
      movie.nameRU.toLowerCase().includes(searchValue.toLowerCase())
    );

  return (
    <section className='saved-movies'>
      <SearchForm
        isSavedMoviesPage={true}
        setIsShortMovies={setIsShortMovies}
        isShortMovies={isShortMovies}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        isToggle={isToggle}
        setIsToggle={setIsToggle}
        onSearch={onSearch} />
      <MoviesCardList
        isSavedMoviesPage={true}
        filteredMovies={filteredMovies}
        movies={movies}
        onDelete={onDelete}
        savedMovies={savedMovies} />
      <Footer />

    </section>
  )
}

export default SavedMovies;
