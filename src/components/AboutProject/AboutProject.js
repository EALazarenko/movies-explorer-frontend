import './AboutProject.css';

const AboutProject = () => {
  return (
    <section className='about-project' id='about-project'>
      <h2 className='about-project__title'>О проекте</h2>
      <div className='about-project__container'>
        <article className='about-project__block'>
          <h3 className='about-project__subtitle'>Дипломный проект включал 5 этапов</h3>
          <span className='about-project__description'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</span>
        </article>
        <article className='about-project__block'>
          <h3 className='about-project__subtitle'>На выполнение диплома ушло 5 недель</h3>
          <span className='about-project__description'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</span>
        </article>
      </div>
      <div className='about-project__timing'>
        <span className='about-project__time'>1 неделя</span>
        <span className='about-project__time'>4 недели</span>
        <span className='about-project__dev'>Back-end</span>
        <span className='about-project__dev'>Front-end</span>
      </div>
    </section >
  )
}

export default AboutProject;
