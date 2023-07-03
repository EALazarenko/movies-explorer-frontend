import './Techs.css';

const Techs = () => {
  return (
    <section className='techs' id='techs'>
      <h2 className='techs__title'>Технологии</h2>
      <article className='techs__block'>
        <h3 className='techs__subtitle'>7 технологий</h3>
        <span className='techs__description'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</span>
      </article>
      <ul className='techs__stack-bar'>
        <li className='techs__stack'>HTML</li>
        <li className='techs__stack'>CSS</li>
        <li className='techs__stack'>JS</li>
        <li className='techs__stack'>React</li>
        <li className='techs__stack'>Git</li>
        <li className='techs__stack'>Express.js</li>
        <li className='techs__stack'>mongoDB</li>
      </ul>
    </section >
  )
}

export default Techs;
