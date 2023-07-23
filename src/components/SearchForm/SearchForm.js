import './SearchForm.css';
import findIcon from '../../images/find.png';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
const SearchForm = ({
  onSearch,
  setIsShortMovies,
  setIsToggle,
  isToggle,
  setSearchValue,
  searchValue
}) => {

  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(searchValue);
  };


  return (
    <section className="search" >
      <form className='search__form' onSubmit={handleSearch} noValidate>
        <input
          type='text'
          className='search__input'
          id="movie-search"
          name='movie-search'
          placeholder='Фильм'
          required={true}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button className="search__submit" type='submit' disabled={!searchValue}>
          <img src={findIcon} alt='Найти' />
        </button>
      </form>
      <FilterCheckbox
        setIsShortMovies={setIsShortMovies}
        setIsToggle={setIsToggle}
        isToggle={isToggle} />
    </section>
  )
}

export default SearchForm;
