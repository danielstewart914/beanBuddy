import React from 'react';
import { Link } from 'react-router-dom';
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