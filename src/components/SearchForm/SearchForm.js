import './SearchForm.css';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import React, { useState } from 'react';
import findIcon from '../../images/find.png';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useFormValidation } from '../../hooks/useFormValidation';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const SearchForm = ({
  onSearch,
  handleShortMoviesChange,
  setIsShortMovies,
  setSearchValue,
  searchValue
}) => {
  const [searchQuery, setSearchQuery] = useLocalStorage('searchQuery', '');

  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(searchQuery);
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
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="search__submit" type='submit' /* disabled={!isValid} */>
          <img src={findIcon} alt='Найти' />
        </button>
      </form>
      <FilterCheckbox onChange={handleShortMoviesChange} setIsShortMovies={setIsShortMovies} />
    </section>
  )
}

export default SearchForm;
