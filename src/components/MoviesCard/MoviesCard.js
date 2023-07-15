import './MoviesCard.css';
import { useState } from 'react';
import { convertMinToHours } from '../../utils/utils';

const MoviesCard = ({ movie, isSavedMovies, isLiked }) => {

  const { image, nameRU, duration } = movie;
  const [addSaved, setAddSaved] = useState(false);

  return (
    <li className='card'>
      <div className='card__place'>
        <div className='card__info'>
          <h4 className='card__title'>{nameRU}</h4>
          <p className='card__duration'>{convertMinToHours(duration)}</p>
        </div>
        {isSavedMovies &&
          <button
            className='card__button-delete'
            type='button'
            title='Удалить из избранного' >
          </button>}
        {!isSavedMovies &&
          <button
            className={`card__button ${addSaved && 'card__button-save'}`}
            type='button'
            title={`${isLiked ? 'Удалить из избранного' : 'Добавить в избранное'}`}
            checked={addSaved}
            onClick={() => setAddSaved(!addSaved)} >
          </button>
        }
      </div>
      <a href={movie.trailerLink} className="card__link" target="_blank" rel="noreferrer">
        <img
          src={isSavedMovies ?
            image :
            `https://api.nomoreparties.co/${image.url}`
          }
          alt={`Обложка фильма: ${nameRU}`}
          className='card__image'
        />
      </a>
    </li>
  )
}

export default MoviesCard;
