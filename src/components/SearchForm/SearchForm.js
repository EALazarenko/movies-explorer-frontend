import { useEffect } from "react";
import './SearchForm.css';
import findIcon from '../../images/find.png';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

const SearchForm = ({
  onSearch,
  setIsShortMovies,
  setIsToggle,
  isToggle,
  setSearchValue,
  searchValue,
  isSavedMoviesPage
}) => {

  const path = window.location.pathname;

  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(searchValue);
    if (!isSavedMoviesPage) {
      localStorage.setItem('searchValue', searchValue);
    }
  }

  useEffect(() => {
    if (path === "/movies") {

      const localQuery = localStorage.getItem("searchValue");
      setSearchValue(localQuery ?? "");
    } else {
      setSearchValue('')
    }
  }, [path]);

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
        isToggle={isToggle}
        isSavedMoviesPage={isSavedMoviesPage} />
    </section>
  )
}

export default SearchForm;
