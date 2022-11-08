import React from 'react';

import {COFFEE_SEARCH} from '../utils/queries';
import {useParams} from 'react-router-dom';
import { useQuery } from '@apollo/client';


const Coffee = () => {
    const { coffeeId } = useParams();

    const { loading, data } = useQuery(COFFEE_SEARCH, {
        variables: {coffeeId: coffeeId},
    });

    const coffee = data?.coffee || {};


    if (loading) {
        return <div>Loading...</div>;
      }

    
    return (
        <div className='flex-row justify-center mb-3'>
            <h2 className='col-12 col-md-10 bg-dark text-light p-3 mb-5'> Coffee Name: {coffee.name} </h2>
            <div>
                <img>Placeholder</img>
            </div>
            <div>
                <li>
                    <ul>{coffee.brand}</ul>
                    <ul>{coffee.roast}</ul>
                    <ul>{coffee.beanType}</ul>
                    <ul>{coffee.origin}</ul>
                </li>
            </div>



        </div>

    )
};

export default Coffee;