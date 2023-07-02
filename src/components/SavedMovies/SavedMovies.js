import Footer from '../Footer/Footer';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './SavedMovies.css';

const SavedMovies = () => {
  return (
    <section className='saved-movies'>
      <SearchForm />
      <MoviesCardList isSavedMovies={true} />
      <Footer />

    </section>
  )
}

export default SavedMovies;
