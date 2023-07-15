import { useState, useEffect } from 'react';
import { getMovies } from '../../utils/MoviesApi';
import Footer from '../Footer/Footer';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';
import { useFormValidation } from '../../hooks/useFormValidation';
import { DURATION_SHORT_MOVIE } from '../../utils/constant';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const Movies = ({ movies, searchValue, setSearchValue, onSearch }) => {
  const [isShortMovies, setIsShortMovies] = useLocalStorage('isShortMovies', false);
const [searchValueShort, setSearchValueShort] = useState({});
const [savedLocalMovies, setSavedLocalMovies] = useLocalStorage('filteredMovies', []);

  const filteredMovies = isShortMovies
    ? movies.filter(
        (movie) =>
          movie.duration <= DURATION_SHORT_MOVIE &&
          movie.nameRU.toLowerCase().includes(searchValue.toLowerCase())
      )
    : movies.filter((movie) =>
        movie.nameRU.toLowerCase().includes(searchValue.toLowerCase())
      );

  const moviesToRender = isShortMovies ? savedLocalMovies : filteredMovies;

  /* const handleShortMoviesChange = (value) => {
    setSearchValueShort(value);
  }; */
  const handleShortMoviesChange = (e) => {
    setIsShortMovies(e.target.checked);
    localStorage.setItem('isShortMovies', e.target.checked);
  };

  return (
    <section className="movies">
      <SearchForm
        onSearch={onSearch}
        onChange={handleShortMoviesChange}
        setIsShortMovies={setIsShortMovies}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      {searchValue ? (
        <MoviesCardList
          filteredMovies={filteredMovies}
          isSavedMovies={false}
          movies={movies}
          searchValue={searchValue}
          searchValueShort={searchValueShort}
        />
      ) : (
        <div>No search results</div>
      )}
      <Footer />
    </section>
  );
};

export default Movies;
