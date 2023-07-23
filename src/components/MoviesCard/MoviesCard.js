import './MoviesCard.css';
import { useState, useEffect } from 'react';
import { convertMinToHours } from '../../utils/utils';
import { url } from '../../utils/MoviesApi';

const MoviesCard = ({ movie, isSavedMoviesPage, onSave, savedMovies, onDelete, }) => {

  const { _id,
    id,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN } = movie;

  const baseUrl = `${url.protocol}//${url.hostname}`;
  const [isLiked, setIsLiked] = useState(false);
  const [isId, setIsId] = useState(null);
  const linkImage =
    typeof movie.image === 'string' ? movie.image : baseUrl + image.url;
  const thumbnail = movie.thumbnail
    ? movie.thumbnail
    : baseUrl + image?.formats?.thumbnail?.url;


  const handleClickLikeButton = () => {
    if (isSavedMoviesPage) {
      onDelete(isId);
      /* setIsLiked(false); */
    } else {
      if (isLiked) {
        onDelete(isId);
        setIsLiked(false);
        localStorage.removeItem(movie.id);
      } else {
        onSave(
          {
            country,
            director,
            duration,
            year,
            description,
            trailerLink,
            nameRU,
            nameEN,
            thumbnail,
            movieId: id,
            image: linkImage
          },
          setIsLiked(true)
        );

        localStorage.setItem(id, JSON.stringify(movie));
      }
    }
  };

  useEffect(() => {
    if (!isSavedMoviesPage) {
      const savedMovie = JSON.parse(localStorage.getItem(id));
      const likedFilm = savedMovies.length
        ? savedMovies.find((savedMovie) => savedMovie?.movieId === id)
        : false;
      if (savedMovie) {
        setIsLiked(!!likedFilm);
        setIsId(likedFilm?._id);
      } else {
        setIsLiked(false)
      }
    }
  }, [id, savedMovies, isSavedMoviesPage]);

  return (
    <li className='card'>
      <div className='card__place'>
        <div className='card__info'>
          <h4 className='card__title'>{nameRU}</h4>
          <p className='card__duration'>{convertMinToHours(duration)}</p>
        </div>
        {isSavedMoviesPage &&
          <button
            className='card__button-delete'
            type='button'
            title='Удалить из избранного'
            onClick={() => onDelete(isId || _id)} >
          </button>}
        {!isSavedMoviesPage &&
          <button
            className={`card__button ${isLiked ? 'card__button-save' : ''}`}
            type='button'
            title={`${isLiked ? 'Удалить из избранного' : 'Добавить в избранное'}`}
            checked={isLiked}
            onClick={handleClickLikeButton} >
          </button>
        }
      </div>
      <a href={movie.trailerLink} className="card__link" target="_blank" rel="noreferrer">
        <img src={linkImage}
          alt={`Обложка фильма: ${nameRU}`}
          className='card__image'
        />
      </a>
    </li>
  )
}

export default MoviesCard;
