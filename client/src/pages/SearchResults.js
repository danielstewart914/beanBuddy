import React from 'react';
import { COFFEE_SEARCH } from '../utils/queries';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import SearchResult from '../components/SearchResult';

const SearchResults = () => {
  const { searchString } = useParams();

  const { loading } = useQuery(COFFEE_SEARCH, {
    variables: { searchString: searchString }
  });

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
      <div>
        <div className='flex-row justify-center mb-3'>
          <h2 className='col-12 col-md-10 bg-dark text-light p-3 mb-5'>
            Results:
          </h2>
  
          <div className='col-12 col-md-10 mb-5'>
            <SearchResult />
          </div>
        </div>
      </div>
    );
};

export default SearchResults;