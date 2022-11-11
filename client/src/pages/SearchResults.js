import React from 'react';
import { COFFEE_SEARCH } from '../utils/queries';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import SearchResult from '../components/SearchResult';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';

import styles from './SearchResults.module.css';

const SearchResults = () => {
  const { searchString } = useParams();

  const { loading, data } = useQuery(COFFEE_SEARCH, {
    variables: { searchString: searchString }
  });

  const results = data?.findCoffee || {};

  return (
    <Container className={ styles.Container }>
      <h2 className={ styles.Heading}>Results</h2>
      <Row>
        { loading ? 'Loading...' : results.length ? results.map( result => <SearchResult key={ result._id } coffee={ result } /> ) : 'No Results' }
      </Row>
    </Container>
  );
};

export default SearchResults;