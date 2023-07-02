import { Link } from 'react-router-dom';
import './ProfileLink.css';
import profileIcon from '../../images/profile-icon-main.svg';

const ProfileLink = () => {

  return (
    <Link to='/profile' className='profile-link'>
      <img src={profileIcon} alt='Аккаунт' className='profile-link__icon' />
      <span>Аккаунт</span>
    </Link>
  )
}

export default ProfileLink;
