import Footer from '../Footer/Footer';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';

const Movies = () => {
  return (
    <section className='movies'>
      <SearchForm />
      <MoviesCardList isSavedMovies={false} />
      <Footer />

    </section>
  )
}

export default Movies;
