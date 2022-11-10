import React, { useState } from 'react';
import StarRating from '../components/StarRating';
import StarRatingInput from '../components/StarRatingInput';

const Home = () => {
  const [ rating, setRating ] = useState( 1 );
  return (
    <main>
      <div className='flex-row justify-center'>
        <div
          className='col-12 col-md-10 mb-3 p-3'
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <StarRatingInput rating={rating} setRating={setRating} />
        </div>
        <div className='col-12 col-md-8 mb-3'>
          <StarRating rating={ 4 } />
        </div>
      </div>
    </main>
  );
};

export default Home;
