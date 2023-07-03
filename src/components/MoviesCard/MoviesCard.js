import './MoviesCard.css';
import { useState } from 'react';

const MoviesCard = ({ movie, isSavedMovies }) => {

  const { image, title, isLiked, hronology } = movie;
  const [addSaved, setAddSaved] = useState(false);

  return (
    <li className='card'>
      <div className='card__place'>
        <div className='card__info'>
          <h4 className='card__title'>{title}</h4>
          <p className='card__duration'>{hronology}</p>
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
      <img src={image} alt={title} className='card__image' />
    </li>
  )
}

export default MoviesCard;
