import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar';


import styles from './NavBar.module.css';

const NavBar = () => {

  return (
    <div className= {styles.NavBar}>
    <Link className='Link-Button' to='/'> Home </Link>
    <Link className='Link-Button' to='/add-review'> Add Review </Link>


    
    <div className={ styles.NavBar }>
        <SearchBar />
    </div>
    </div>
  )
}

export default NavBar;