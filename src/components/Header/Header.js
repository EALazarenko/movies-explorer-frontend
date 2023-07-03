import { Link, Route, Routes } from 'react-router-dom';
import './Header.css';
import Logo from '../Logo/Logo';
import ProfileLink from '../ProfileLink/ProfileLink';
import MobileMenu from '../MobileMenu/MobileMenu';
import { useState } from 'react';

const Header = () => {
  const [mobileMenuOpen, setmobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setmobileMenuOpen(!mobileMenuOpen);
  }

  return (
    <header className='header'>
      <Routes>
        <Route path='/' element={
          <>
            <Logo />
            <nav className='header__nav-bar'>
              <Link to='/signup' className='header__link'>Регистрация</Link>
              <Link to='/signin' className='header__link-auth'>Войти</Link>
            </nav>
          </>
        }
        />
        <Route path='*' element={
          <>
            <nav className='header__nav-bar header__nav-bar_other-pages'>
              <Logo />
              {!mobileMenuOpen ? (
                <button className='header__button' type='button' title='Меню' onClick={toggleMobileMenu} />

              ) : <MobileMenu onClose={toggleMobileMenu} />
              }
              <div className='header__movie-routes'>
                <Link to='/movies' className='header__link header__link_other-pages'>Фильмы</Link>
                <Link to='/saved-movies' className='header__link header__link_other-pages'>Сохраненные фильмы</Link>
              </div>
              <div className='header__profile-link'>
                <ProfileLink />
              </div>
            </nav>
          </>
        }
        />
      </Routes>
    </header>
  )
}

export default Header;
