import React from 'react';

import styles from './SearchBar.module.css';

const SearchBar = () => {
  // const [searchString, setSearchString] = useState('');

  return (
    <div>
      <input 
        className={ styles.SearchBar }
        type='text'
        placeholder='Search'
        // value={searchString}
      />
      <button className='Button'>Search</button>
    </div>
  )
}

export default SearchBar;