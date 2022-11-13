import React from "react";
import styles from './About.module.css'

const About = () => {
    return(
        <main className={ styles.Main }>
            <h2 className={styles.Heading}>About BeanBuddy</h2>
            <br/>
            <p className={styles.Paragraph}>The BeanBuddy application is built around the development of the user's FlavorProfile. In order to build this profile, we needed to find some quantifiable way of measuring the coffee tastes of the user. Luckily a great deal of work has already been done on this topic by the Coffee World Research (WCR) Organization.</p>
            <br/>
            <p className={styles.Paragraph}>BeanBuddy uses a modified version of the "Coffee Taster's Flavor Wheel" from the WRC Sensory Lexicon. This aid for coffee flavor profiling was developed by researchers of the Sensory Analysis Center at the University of Kansas and is currently in its second addition. It is meant to be a "living document" that will grow and change as more research is done.</p>
            <br/>
            <br/>
            <p className={styles.Paragraph}>If you would like to learn more about the WCR Sensory Lexicon the please visit their website at <a href="https://worldcoffeeresearch.org/">World Coffee Research Org.</a></p>
        </main>
    );
};

export default About; 