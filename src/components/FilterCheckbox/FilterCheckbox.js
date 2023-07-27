import './FilterCheckbox.css';
import { useEffect } from "react";

const FilterCheckbox = ({ setIsShortMovies, isToggle, setIsToggle, isSavedMoviesPage }) => {

  const path = window.location.pathname;

  const handleToggle = () => {
    setIsToggle(!isToggle);
    setIsShortMovies(!isToggle);
    if (!isSavedMoviesPage) {
      localStorage.setItem('isToggle', JSON.stringify(!isToggle));
    }
  };

  useEffect(() => {
    if (path === "/movies") {
      const toggleValue = localStorage.getItem('isToggle');
      setIsToggle(toggleValue ? JSON.parse(toggleValue) : false);
    } else {
      setIsToggle(false)
    }
  }, [path]);

  return (
    <div className='filter'>
      <label className='filter__label' htmlFor='checkbox'>
        <input
          className='filter__checkbox'
          type='checkbox'
          name='checkbox'
          id='checkbox'
          onChange={handleToggle}
        />
        <span className={`filter__checkbox-visible ${isToggle && 'filter__checkbox-on'}`} />
        Короткометражки
      </label>
    </div>
  )
}
export default FilterCheckbox;
