import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.css';
import Logo from '../Logo/Logo';

const Register = ({ onRegister }) => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: ''
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });

  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!userData.name || !userData.email || !userData.password) {
      return;
    }
    onRegister(userData.name, userData.email, userData.password);
    setUserData({ name: '', email: '', password: '' });
  }

  return (
    <section className='register'>
      <div className='register__block'>
        <Logo />
        <h1 className='register__title'>Добро пожаловать!</h1>
      </div>
      <form className="register__form" onSubmit={handleSubmit}>
        <label className='register__value'>
          Имя
          <input
            type="text"
            id="name"
            name="name"
            className="register__input"
            required={true}
            minLength={2}
            maxLength={30}
            defaultValue={userData.name}
            value={userData.name}
            onChange={handleChange}
          />
          <span className='register__span-error'></span>
        </label>
        <label className='register__value'>
          E-mail
          <input
            type="email"
            id="email"
            name="email"
            className="register__input"
            required={true}
            minLength={5}
            maxLength={30}
            /* defaultValue='pochta@yandex.ru' */
            value={userData.email}
            autoFocus={true}
            onChange={handleChange}
          />
          <span className='register__span-error'></span>
        </label>
        <label className='register__value'>
          Пароль
          <input
            type="password"
            id="password"
            name="password"
            className="register__input register__input_error"
            required={true}
            minLength={5}
            maxLength={30}
            /* defaultValue='qwerty12345' */
            value={userData.password}
            onChange={handleChange}
          />
          <span className='register__span-error'>Что-то пошло не так...</span>
        </label>

        <button type="submit" className="register__button">Зарегистрироваться</button>
        <p className="register__link-login">
          Уже зарегистрированы?
          <Link to="/signin" className="register__button-login">Войти</Link>
        </p>
      </form>
    </section>
  )
}

export default Register;
