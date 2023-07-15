import './FilterCheckbox.css';
import { useState } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const FilterCheckbox = ({ setIsShortMovies }) => {
  /* const [isToggle, setIsToggle] = useState(false); */
  const [isToggle, setIsToggle] = useLocalStorage('isToggle', false);

  const handleToggle = () => {
    setIsToggle(!isToggle);
    setIsShortMovies(!isToggle);
  };

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
