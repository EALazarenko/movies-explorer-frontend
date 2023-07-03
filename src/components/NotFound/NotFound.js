import { useNavigate } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(-1);
  }
  return (
    <section className='not-found'>
      <h1 className='not-found__title'>404</h1>
      <span className='not-found__description'>Страница не найдена</span>
      <button className='not-found__link' onClick={handleClick}>Назад</button>
    </section >
  )
}
export default NotFound;

