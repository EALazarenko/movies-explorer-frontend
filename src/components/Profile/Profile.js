import './Profile.css';

const Profile = () => {

  return (
    <section className='profile'>
      <h2 className='profile__title'>Привет, Виталий!</h2>
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
            defaultValue='Виталий'
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
            defaultValue='pochta@yandex.ru'
          />
        </label>
        <div className='profile__button'>
          <button className='profile__edit' type='submit' title='Редактировать'>Редактировать</button>
          <button className='profile__logout' type='button' title='Выйти'>Выйти из аккаунта</button>
        </div>
      </form>
    </section>

  )
}

export default Profile;

