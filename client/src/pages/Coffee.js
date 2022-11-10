import React from 'react';

import { COFFEE } from '../utils/queries';
import {useParams} from 'react-router-dom';
import { useQuery } from '@apollo/client';


const Coffee = () => {
    const { coffeeId } = useParams();

    const { loading, data } = useQuery(COFFEE, {
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
                <img alt='Selected Coffee'>Placeholder</img>
            </div>
            <div>Rating: {coffee.rating}</div>
            <div>
                <li>
                    <ul>{coffee.brand}</ul>
                    <ul>{coffee.roast}</ul>
                    <ul>{coffee.beanType}</ul>
                    <ul>{coffee.origin}</ul>

                </li>
            </div>
            <div>
                <div>{coffee.coffeeId}</div>
                <div>{coffee.reviews}</div>
            </div>
            



        </div>

    )
};

export default Coffee;