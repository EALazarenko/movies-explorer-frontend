import React, { useContext, useState, useEffect } from "react";
import './Profile.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const Profile = ({ onLogout, onUpdateUser }) => {
  const currentUser = useContext(CurrentUserContext);
  const [isName, setIsName] = useState('');
  const [isEmail, setIsEmail] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: isName,
      email: isEmail,
    });
  }

  useEffect(() => {
    setIsName(currentUser.name);
    setIsEmail(currentUser.email);
  }, [currentUser]);

  function handleChangeName(e) {
    setIsName(e.target.value)
  }

  function handleChangeEmail(e) {
    setIsEmail(e.target.value)
  }

  return (
    <section className='profile'>
      <h2 className='profile__title'>Привет, {isName}!</h2>
      <form className='profile__form'>
        <label className='profile__value'>
          Имя
          <input
            className='profile__input'
            type='text'
            name='profile-name'
            id='profile-name'
            placeholder='Имя'
            required={true}
            minLength={2}
            maxLength={30}
            defaultValue={isName}
            onChange={handleChangeName}
          />
        </label>
        <label className="profile__value">
          E-mail
          <input
            className='profile__input'
            type='email'
            name='profile-email'
            id='profile-email'
            placeholder='E-mail'
            required={true}
            minLength={5}
            maxLength={30}
            defaultValue={isEmail}
            onChange={handleChangeEmail}
          />
        </label>
        <div className='profile__button'>
          <button
            className='profile__edit'
            type='submit'
            title='Редактировать'
            onSubmit={handleSubmit}>
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

