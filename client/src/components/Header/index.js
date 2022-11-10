import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

import NavBar from '../NavBar';

import styles from './Header.module.css';

const Header = () => {
  
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className={ styles.Header }>
        <div className={ styles.TopRow }>
          <Link className={ styles.ProfileLink } to='/me'>
            <img className={ styles.ProfileLogo } src={ process.env.PUBLIC_URL + '/images/person-circle.svg'} alt='' />
            <div className={ styles.Profile }>Profile</div>
          </Link>
          <div className={ styles.Login }>
            {Auth.loggedIn() ? (
              <>
                <Link className='btn btn-lg btn-info m-2' to='/me'>
                  {Auth.getProfile().data.username}'s profile
                </Link>
                <button className='Link-Button' onClick={logout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link className='Link-Button' to='/login'>
                  Login
                </Link>
                <Link className='Link-Button' to='/signup'>
                  Signup
                </Link>
              </>
            )}
          </div>
          <Link className={ styles.HomeLink } to='/'>
            <h1 className={ styles.H1 }>
              <img className={ styles.Logo } src={ process.env.PUBLIC_URL + '/images/BeanBuddy-Logo.svg'} alt='Bean Buddy Icon' />
              BeanBuddy
              </h1>
            <p className={ styles.SubHeading }>An App for People who Love Coffee!</p>
          </Link>
        </div>
        <NavBar />
    </header>
  );
};

export default Header;
