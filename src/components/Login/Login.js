import { Link } from 'react-router-dom';
import './Login.css';
import Logo from '../Logo/Logo';

const Login = () => {

  return (
    <section className='login'>
      <div className='login__block'>
        <Logo />
        <h1 className='login__title'>Рады видеть!</h1>
      </div>
      <form className="login__form">
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
            defaultValue='pochta@yandex.ru'
            autoFocus={true}
          />
          <span className='login__span-error'></span>
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
          />
          <span className='login__span-error'></span>
        </label>

        <button type="submit" className="login__button">Войти</button>
        <p className="login__link-login">
          Ещё не зарегистрированы?
          <Link to="/signup" className="login__button-login">Регистрация</Link>
        </p>
      </form>
    </section>
  )
}

export default Login;
