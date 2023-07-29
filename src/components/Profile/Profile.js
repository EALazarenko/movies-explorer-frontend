import React, { useContext, useEffect, useState } from "react";
import './Profile.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormValidation } from "../../hooks/useFormValidation";

const Profile = ({ onLogout, onUpdateUser, buttonText, setButtonText }) => {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, resetForm } = useFormValidation();
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    currentUser ? resetForm(currentUser) : resetForm();
  }, [currentUser, resetForm]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isValid) {
      return;
    } else {
      onUpdateUser(values.name, values.email, setIsSaved);
    }
  };

  const isValueNoChange = (!isValid || (currentUser.name === values.name && currentUser.email === values.email && isSaved));

  useEffect(() => {
    let timeoutId;
    if (buttonText === 'Сохранено') {
      timeoutId = setTimeout(() => {
        setButtonText('Редактировать');
      }, 2000);
    }
    return () => clearTimeout(timeoutId);
  }, [buttonText, setButtonText]);

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
            onChange={(event) => {
              handleChange(event);
              setIsSaved(false);
            }}
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
            onChange={(event) => {
              handleChange(event);
              setIsSaved(false);
            }}
            pattern='^[\w\-\.]+@([\w\-]+\.)+[\w\-]{2,4}$'
          />
          <span id='profile-error' className='profile__error'>{errors.email}</span>
        </label>
        <div className='profile__button'>
          <button
            className='profile__edit'
            type='submit'
            title={isValueNoChange ? 'Нужно изменить имя или email для редактирования' : 'Редактировать'}
            disabled={isValueNoChange}
          >
            {buttonText}
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

