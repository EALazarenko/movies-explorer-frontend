import { Link } from 'react-router-dom';
import './Register.css';
import Logo from '../Logo/Logo';
import { useFormValidation } from "../../hooks/useFormValidation";

const Register = ({ onRegister }) => {
  const { values, handleChange, errors, isValid } = useFormValidation();

  function handleSubmit(e) {
    e.preventDefault();
    if (!isValid) {
      return;
    }
    onRegister(values.name, values.email, values.password);
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
            value={values.name}
            onChange={handleChange}
            pattern="[A-Za-zА-Яа-яЁё\- ]+"
          />
          <span className='register__span-error'>{errors.name}</span>
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
            value={values.email}
            autoFocus={true}
            onChange={handleChange}
            pattern='^[\w\-\.]+@([\w\-]+\.)+[\w\-]{2,4}$'
          />
          <span className='register__span-error'>{errors.email}</span>
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
            value={values.password}
            onChange={handleChange}
          />
          <span className='register__span-error'>{errors.password}</span>
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
