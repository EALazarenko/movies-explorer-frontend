import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import { useState, useEffect } from 'react';
/* import Preloader from '../Preloader/Preloader'; */

const MoviesCardList = ({ filteredMovies, isSavedMovies }) => {

  const [cardCound, setCardCount] = useState(12);

  const handleShowMore = () => {
    setCardCount(cardCound + 3);
  };
  return (
    <section className="movie" >
      <ul className='movie__card-list'>
        {filteredMovies.slice(0, cardCound).map((movie, id) => (<MoviesCard movie={movie} key={id} isSavedMovies={isSavedMovies} />))}
      </ul>
      {!isSavedMovies &&
        <div className='movie__button'>
          <button className='movie__btn' onClick={handleShowMore}>Ещё</button>
        </div>}
    </section>
  )
}

export default MoviesCardList;
