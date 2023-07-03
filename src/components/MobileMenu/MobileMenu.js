import { Link } from 'react-router-dom';
import './MobileMenu.css';
import ProfileLink from '../ProfileLink/ProfileLink';

const MobileMenu = ({ onClose }) => {

  return (
    <div className='mobile-menu'>
      <div className='mobile-menu__container'>
        <button type='button' className='mobile-menu__close-btn' onClick={() => onClose()} />
        <div className='mobile-menu__links'>
          <Link to='/' className='mobile-menu__link' onClick={() => onClose()}>Главная</Link>
          <Link to='/movies' className='mobile-menu__link' onClick={() => onClose()}>Фильмы</Link>
          <Link to='/saved-movies' className='mobile-menu__link' onClick={() => onClose()}>Сохранённые фильмы</Link>
        </div>
        <div className='mobile-menu__account-link'>
          <ProfileLink onClick={() => onClose()} />
        </div>
      </div>
    </div>
  )
}

export default MobileMenu;
