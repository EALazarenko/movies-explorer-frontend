import './Footer.css';

const Footer = () => {
  return (
    <footer className='footer'>
      <p className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <nav className='footer__block'>
        <p className="footer__copyright">&copy; 2023</p>
        <ul className='footer__links'>
          <li>
            <a className='footer__link'
              href='https://practicum.yandex.ru/'
              target='_blank'
              rel='noreferrer'>Яндекс.Практикум</a>
          </li>
          <li>
            <a className='footer__link'
              href='https://github.com/EALazarenko'
              target='_blank'
              rel='noreferrer'>Github</a>
          </li>
        </ul>
      </nav>
    </footer >
  )
}

export default Footer;
