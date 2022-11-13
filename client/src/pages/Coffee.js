import React from 'react';
import { COFFEE } from '../utils/queries';
import {useParams} from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Review from '../components/Review';
import StarRating from '../components/StarRating';
import FlavorProfileChart from '../components/FlavorProfileChart';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import styles from './Coffee.module.css';


const Coffee = () => {
    const { coffeeId } = useParams();
    const { loading, data } = useQuery( COFFEE, {
        variables: {coffeeId: coffeeId},
    });

    const coffee = data?.coffee || {};

    const imagePlaceholder = process.env.PUBLIC_URL + '/images/Coffee-Placeholder-Image.webp';

    const onImageError = ( event ) => {
        event.target.src = imagePlaceholder;
    }
    
    return ( loading ? <div>Loading...</div> : 
    <Container>
        <div>
            <div className='Card'>
                <h2 className={ styles.Heading }>
                    <StarRating rating={coffee.rating} starSize={ 32 } />
                    {coffee.name}
                    { console.log( coffee ) }
                </h2>
                <div className={ styles.CoffeeInfo }>
                    <div className={ styles.Square }>
                        <img 
                            className={ styles.CoffeeImage }
                            src={ coffee.image ? coffee.image : imagePlaceholder }
                            onError={onImageError}
                            alt={ coffee.name } 
                        />
                    </div>
                    <ul className={ styles.Properties }>
                        <li><span className={ styles.CoffeeProperty }>Brand / Farm: </span>{coffee.brand}</li>
                        <li><span className={ styles.CoffeeProperty }>Roast: </span>{coffee.roast}</li>
                        <li><span className={ styles.CoffeeProperty }>Bean: </span>{coffee.beanType}</li>
                        <li><span className={ styles.CoffeeProperty }>Country of Origin: </span>{coffee.origin}</li>
                    </ul>
                </div>
                <Row className={ styles.Flavor }>
                    <FlavorProfileChart fullCoffeeFlavorProfile={ coffee.fullFlavorProfile } simpleCoffeeFlavorProfile={ coffee.simpleFlavorProfile } />
                </Row>
            </div>
            <div className={ styles.Reviews }>
                <h3 className={ styles.ReviewsHeading }>Reviews:</h3>
                { coffee.reviews.length ? coffee.reviews.map( review => <Review key={review._id} review={ review } />  ) : <div>No Reviews</div> }     
            </div>
        </div>
    </Container>
    )
};

export default Coffee;