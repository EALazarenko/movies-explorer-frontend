import './Logo.css';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';

const Logo = () => {

  return (
    <Link to='/' className='logo'>
      <img src={logo} alt='логотип' className='logo__img' />
    </Link>
  )
}

export default Logo;
