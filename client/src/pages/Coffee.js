import React from 'react';
import { COFFEE } from '../utils/queries';
import {useParams} from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Review from '../components/Review';
import StarRating from '../components/StarRating';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import styles from './Coffee.module.css';


const Coffee = () => {
    const { coffeeId } = useParams();
    const { loading, data } = useQuery( COFFEE, {
        variables: {coffeeId: coffeeId},
    });

    const coffee = data?.coffee || {};
    
    return ( loading ? <div>Loading...</div> : 
    <Container>
        <Row>
            <div className='Card'>
                <h2 className={ styles.Heading }>
                    <StarRating rating={coffee.rating} starSize={ 32 } />
                    {coffee.name}
                </h2>
                <div className={ styles.CoffeeInfo }>
                    <ul className={ styles.Properties }>
                        <li><span className={ styles.CoffeeProperty }>Brand / Farm: </span>{coffee.brand}</li>
                        <li><span className={ styles.CoffeeProperty }>Roast: </span>{coffee.roast}</li>
                        <li><span className={ styles.CoffeeProperty }>Bean: </span>{coffee.beanType}</li>
                        <li><span className={ styles.CoffeeProperty }>Country of Origin: </span>{coffee.origin}</li>
                    </ul>
                    <div className={ styles.FlavorProfile }>
                        Flavor Profile Placeholder
                    </div>
                </div>
            </div>
            <div className={ styles.Reviews }>
                <h3 className={ styles.ReviewsHeading }>Reviews:</h3>
                { coffee.reviews.length ? coffee.reviews.map( review => <Review key={review._id} coffeeRating={review.coffeeRating} reviewText={ review.reviewText } />  ) : <div>No Reviews</div> }     
            </div>
        </Row>
    </Container>
    )
};

export default Coffee;