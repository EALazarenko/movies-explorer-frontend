import './FilterCheckbox.css';
import { useState } from 'react';

const FilterCheckbox = () => {
  const [isToggle, setIsToggle] = useState(true)

  return (
    <div className='filter'>
      <label className='filter__label' htmlFor='checkbox'>
        <input
          className='filter__checkbox'
          type='checkbox'
          name='checkbox'
          id='checkbox'
          checked={isToggle}
          onChange={() => setIsToggle(!isToggle)}
        />
        <span className={`filter__checkbox-visible ${isToggle && 'filter__checkbox-on'}`} />
        Короткометражки
      </label>
    </div>
  )
}
export default FilterCheckbox;
