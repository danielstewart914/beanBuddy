// import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar';

import styles from './NavBar.module.css';

const NavBar = () => {

  return (
    <div className={ styles.NavBar }>
        <SearchBar />
    </div>
  )
}

export default NavBar;