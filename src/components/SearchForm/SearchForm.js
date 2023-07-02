import './SearchForm.css';
import findIcon from '../../images/find.png';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

const SearchForm = () => {
  return (
    <section className="search" >
      <form className='search__form'>
        <input
          type='text'
          className='search__input'
          id="movie-search"
          name='movie-search'
          placeholder='Фильм'
          required={true}
        />
        <button className="search__submit" type='submit'>
          <img src={findIcon} alt='Найти' />
        </button>
      </form>
      <FilterCheckbox />
    </section>
  )
}

export default SearchForm;
