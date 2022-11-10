import React from 'react';
import StarRating from '../StarRating';


const Review = ({
    coffeeRating,
    reviewText,

}) => {
    
    return (
        <div>
            <StarRating rating={coffeeRating} />
        </div>
    )

}

export default Review;