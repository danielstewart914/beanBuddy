import React from 'react';

import { Link } from 'react-router-dom';

import styles from './SearchResult.module.css';

const SearchResult = ( { coffee } ) => {
    return (
        <Link className={ styles.Link } to={ `/coffee/${ coffee._id }` }>
          <div className='Card'>
            <h2 className={ styles.Heading }>
              <img className={ styles.ImagePlaceholder } src={ process.env.PUBLIC_URL + '/images/BeanBuddy-Logo.svg'} alt='Bean Buddy Icon' />
              <span className={ styles.Title }>{ coffee.name }</span> - { coffee.brand }
              </h2>
          </div>
        </Link>
    )
};

export default SearchResult;