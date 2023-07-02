// добавить вычисляемую дату рождения. Лет/года/год
// заполнить блок Обо мне
import './AboutMe.css';
import myPhoto from '../../images/myPhoto.jpg';

const AboutMe = () => {
  return (
    <section className='about-me' id='about-me'>
      <h2 className='about-me__title'>Студент</h2>
      <div className='about-me__block'>
        <article className='about-me__info'>
          <h3 className='about-me__name'>Екатерина</h3>
          <span className='about-me__job'>Фронтенд-разработчик, 35 лет</span>
          <span className='about-me__description'>Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
            и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</span>
          <a className='about-me__link' href='https://github.com/EALazarenko' target='_blank' rel='noreferrer'>Github</a>
        </article>
        <img className='about-me__photo' src={myPhoto} alt='Мое фото' />
      </div>
    </section >
  )
}

export default AboutMe;
