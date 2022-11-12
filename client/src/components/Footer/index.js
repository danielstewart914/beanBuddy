import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={ styles.Footer }>
        <h4>
        <Link className='Link-Button' to='/about'> About </Link>
        </h4>
    </footer>
  );
};

export default Footer;
