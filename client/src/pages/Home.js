import React from 'react';
import styles from './Home.module.css'

const Home = () => {
  return (
    <main className={ styles.Main }>
      <h2 className={styles.Heading}>Welcome to BeanBuddy!</h2>
      <br/>
      <p className = {styles.Paragraph}>With BeanBuddy, you can search, find, and review coffees for later use. The reviews you leave will inform your own FlavorProfile, a feature that will help BeanBuddy point to new types of coffees for you. Choose to view a list of coffees and their reviews from above, add a review of your own, or enter a search if you know what you are looking for to get started. You are able to search by brand, name, type of bean, origin, or roast so start searching now! The more reviews you add the more the more your FlavorProfile grows and there will be more coffees for you and other users to choose from.</p> 
      <br/>
      <br/>
    <p className= {styles.Contributors}>Designed and developed by:<br/> 
    <a className={ styles.Link } href="https://github.com/danielstewart914">Daniel Stewart</a><br/> 
    <a className={ styles.Link } href="https://github.com/ZacharyWarnes">Zachary Warnes</a><br/>
    <a className={ styles.Link } href="https://github.com/azm89">Ashton Moore</a><br/>
    <a className={ styles.Link } href="https://github.com/NiklasSolomon">Niklas Solomon</a></p>

    
    </main>
  );
};

export default Home;
