import React from 'react';

import {COFFEE_SEARCH} from '../utils/queries';
import {useParams} from 'react-router-dom';
import { useQuery } from '@apollo/client';


const Coffee = () => {
    const {id: coffeeId} = useParams();
    const {loading} = useQuery(COFFEE_SEARCH, {
        variables: {coffeeId}
    });

    if (loading) {
        return <div>Loading...</div>;
      }
    
    return (
        <div className='flex-row justify-center mb-3'>
            <h2 className='col-12 col-md-10 bg-dark text-light p-3 mb-5'> Coffee Name </h2>
        </div>

    )
};

export default Coffee;