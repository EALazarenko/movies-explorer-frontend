import './Portfolio.css';

const Portfolio = () => {
  const portfolioArr = [
    {
      link: 'https://github.com/EALazarenko/how-to-learn',
      name: 'Статичный сайт',
    },
    {
      link: 'https://github.com/EALazarenko/russian-travel',
      name: 'Адаптивный сайт',
    },
    {
      link: 'https://github.com/EALazarenko/react-mesto-api-full-gha',
      name: 'Одностраничное приложение',
    },
  ]
  return (
    <section className='portfolio'>
      <h2 className='portfolio__title'>Портфолио</h2>
      <ul className='portfolio__items'>
        {portfolioArr
          .map(({ link, name }, i) => {
            return (
              <li className='portfolio__item' key={i}>
                <a href={link} className='portfolio__link' target='_blank' rel='noreferrer' >
                  <p className='portfolio__link-text'>{name}</p>
                  <p className='portfolio__link-text'>&#x2197;</p>
                </a>
              </li>)
          })}
      </ul>
    </section >
  )
}

export default Portfolio;
