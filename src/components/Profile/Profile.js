import React, { useContext, useEffect } from "react";
import './Profile.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormValidation } from "../../hooks/useFormValidation";

const Profile = ({ onLogout, onUpdateUser }) => {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, resetForm } = useFormValidation();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isValid) {
      return;
    } else {
      onUpdateUser({
        name: values.name,
        email: values.email,
      });
    }
  };

  useEffect(() => {
    currentUser ? resetForm(currentUser) : resetForm();
  }, [currentUser, resetForm]);

  const isValueNoChange = (!isValid || (currentUser.name === values.name && currentUser.email === values.email));

  return (
    <section className='profile'>
      <h2 className='profile__title'>Привет, {currentUser.name}!</h2>
      <form className='profile__form' onSubmit={handleSubmit}>
        <label className='profile__value'>
          Имя
          <input
            className='profile__input'
            type='text'
            name='name'
            id='profile-name'
            placeholder='Имя'
            required={true}
            minLength={2}
            maxLength={30}
            value={values.name || ''}
            onChange={handleChange}
            pattern="[A-Za-zА-Яа-яЁё\- ]+"
          />
          <span id='profile-error' className='profile__error'>{errors.name}</span>
        </label>
        <label className="profile__value">
          E-mail
          <input
            className='profile__input'
            type='email'
            name='email'
            id='profile-email'
            placeholder='E-mail'
            required={true}
            minLength={5}
            maxLength={30}
            value={values.email || ''}
            onChange={handleChange}
            pattern='^[\w\-\.]+@([\w\-]+\.)+[\w\-]{2,4}$'
          />
          <span id='profile-error' className='profile__error'>{errors.email}</span>
        </label>
        <div className='profile__button'>
          <button
            className='profile__edit'
            type='submit'
            title='Редактировать'
            disabled={isValueNoChange}
          >
            Редактировать
          </button>
          <button
            className='profile__logout'
            type='button'
            title='Выйти'
            onClick={onLogout}>
            Выйти из аккаунта
          </button>
        </div>
      </form>
    </section>

  )
}

export default Profile;

