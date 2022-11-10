import React from 'react';
import StarRating from '../StarRating';


const Review = ({
    coffeeRating,
    reviewText,

}) => {
    
    return (
        <div className='Card'>
            <StarRating rating={coffeeRating} />
            <div>{ reviewText[0] }</div>
        </div>
    )

}

export default Review;