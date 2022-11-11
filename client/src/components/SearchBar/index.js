import React, { useState } from  'react';

import { useNavigate } from 'react-router-dom';

import styles from './SearchBar.module.css';

const SearchBar = () => {
  const [searchString, setSearchString] = useState('');
  const navigate = useNavigate();

  const handleInputChange = ( e ) => {
    setSearchString( e.target.value );
  }

  const handleSubmit = ( e ) => {
    e.preventDefault();
    navigate(`/search-results/${ searchString }`);
    setSearchString('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
        className={ styles.SearchBar }
        type='text'
        placeholder='Search'
        onChange={handleInputChange}
        value={searchString}
      />
      <button 
        className='Button'
        onClick={handleSubmit}
      >
        Search
      </button>
    </form>
  )
}

export default SearchBar;