import React from 'react';
import StarRating from '../StarRating';

import styles from './Review.module.css';

const Review = ( { review } ) => {
    
    return (
        <div className='Card'>
            <div className={ styles.Header }>
                <StarRating rating={review.coffeeRating} />
                <div className={ styles.Info }>
                    { review.grind ? <span className={ styles.SemiBold }> { review.grind } Grind</span> : ''  } 
                </div>
                <div className={ styles.Info }>
                { review.brewMethod ? <span><span className={ styles.SemiBold }>Brew</span> - { review.brewMethod } </span> : ''  } 
                </div>
            </div>
            <div>{ review.reviewText[0] }</div>
        </div>
    )

}

export default Review;