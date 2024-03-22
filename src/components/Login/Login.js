import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import Logo from '../Logo/Logo';
import { useFormValidation } from "../../hooks/useFormValidation";

const Login = ({ onLogin }) => {
  const { values, handleChange, errors, isValid } = useFormValidation();

  function handleSubmit(e) {
    e.preventDefault();
    if (!isValid) {
      console.log(errors);
    }
    onLogin(values.email, values.password);
  }

  return (
    <section className='login'>
      <div className='login__block'>
        <Logo />
        <h1 className='login__title'>Рады видеть!</h1>
      </div>
      <form className="login__form" onSubmit={handleSubmit}>
        <label className='login__value'>
          E-mail
          <input
            type="email"
            id="email"
            name="email"
            className="login__input"
            required={true}
            minLength={5}
            maxLength={30}
            value={values.email || ''}
            autoFocus={true}
            onChange={handleChange}
            pattern='^[\w\-\.]+@([\w\-]+\.)+[\w\-]{2,4}$'
          />
          <span className='login__span-error'>{errors.email}</span>
        </label>
        <label className='login__value'>
          Пароль
          <input
            type="password"
            id="password"
            name="password"
            className="login__input"
            required={true}
            minLength={5}
            maxLength={30}
            value={values.password || ''}
            onChange={handleChange}
          />
          <span className='login__span-error'>{errors.password}</span>
        </label>

        <button type="submit"
          className="login__button"
          disabled={!isValid}
        >Войти</button>
        <p className="login__link-login">
          Ещё не зарегистрированы?
          <Link to="/signup" className="login__button-login">Регистрация</Link>
        </p>
      </form>
    </section>
  )
}

export default Login;
