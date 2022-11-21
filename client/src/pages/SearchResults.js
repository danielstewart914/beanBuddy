import React from 'react';
import { COFFEE_SEARCH } from '../utils/queries';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import SearchResult from '../components/SearchResult';

import styles from './SearchResults.module.css';

const SearchResults = () => {
  const { searchString } = useParams();

  const { loading, data } = useQuery(COFFEE_SEARCH, {
    variables: { searchString: searchString }
  });

  const results = data?.findCoffee || {};

  return (
    <main className={ styles.Container }>
      <h2 className={ styles.Heading}>Results</h2>
      <div>
        { loading ? 'Loading...' : results.length ? results.map( result => <SearchResult key={ result._id } coffee={ result } /> ) : 'No Results' }
      </div>
    </main>
  );
};

export default SearchResults;