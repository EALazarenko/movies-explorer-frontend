import './FilterCheckbox.css';

const FilterCheckbox = ({ setIsShortMovies, isToggle, setIsToggle }) => {

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
