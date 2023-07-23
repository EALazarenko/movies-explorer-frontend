import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import { useState, useEffect } from 'react';
import useScreenWidth from '../../hooks/useScreenWidth';
import {
  BIG_SCREEN_MOVIES,
  MIDDLE_SCREEN_MOVIES,
  SMALL_SCREEN_MOVIES,
  MORE_MOVIES_BIG_SCREEN,
  MORE_MOVIES_SMALL_SCREEN,
  BIG_SCREEN,
  SMALL_SCREEN
} from '../../utils/constant';
import Preloader from '../Preloader/Preloader';

const MoviesCardList = ({
  filteredMovies,
  isSavedMoviesPage,
  onSave,
  savedMovies,
  onDelete,
  savedMoviesIds,
  onUpdateCard,
  isLoading }) => {

  const [showMovieList, setShowMovieList] = useState(filteredMovies);
  const screenWidth = useScreenWidth();
  const searchedMoviesCount = filteredMovies ? filteredMovies.length : 0;

  const handleMoreClick = () => {
    if (screenWidth > BIG_SCREEN) {
      setShowMovieList(filteredMovies.slice(0, showMovieList.length + MORE_MOVIES_BIG_SCREEN))
    } else {
      setShowMovieList(filteredMovies.slice(0, showMovieList.length + MORE_MOVIES_SMALL_SCREEN))
    }
  }

  useEffect(() => {
    if (screenWidth > BIG_SCREEN) {
      setShowMovieList(filteredMovies.slice(0, BIG_SCREEN_MOVIES))
    } else if (screenWidth > SMALL_SCREEN && screenWidth <= BIG_SCREEN) {
      setShowMovieList(filteredMovies.slice(0, MIDDLE_SCREEN_MOVIES));
    } else if (screenWidth <= SMALL_SCREEN) {
      setShowMovieList(filteredMovies.slice(0, SMALL_SCREEN_MOVIES));
    } else {
      setShowMovieList(filteredMovies);
    }
  }, [screenWidth, filteredMovies])

  return (
    <section className="movie" >
      <ul className='movie__card-list'>
        {isLoading && (
          <Preloader />
        )}
        {!isSavedMoviesPage ? showMovieList.sort().map((movie, id) => (
          <MoviesCard
            movie={movie}
            key={id}
            isSavedMoviesPage={isSavedMoviesPage}
            onSave={onSave}
            savedMovies={savedMovies}
            onDelete={onDelete}
            savedMoviesIds={savedMoviesIds}
            onUpdateCard={onUpdateCard}
          />
        )) :
          filteredMovies.map((movie, movieId) => (
            <MoviesCard
              movie={movie}
              key={movieId}
              isSavedMoviesPage={isSavedMoviesPage}
              onDelete={onDelete}
              onUpdateCard={onUpdateCard}
            />
          ))}
      </ul>
      {!isSavedMoviesPage && showMovieList && searchedMoviesCount !== showMovieList.length &&
        <div className='movie__button'>
          <button className='movie__btn' onClick={handleMoreClick}>Ещё</button>
        </div>}
    </section>
  )
}

export default MoviesCardList;
