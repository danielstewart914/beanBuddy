import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
    }
  }
`;

export const COFFEE_SEARCH = gql`
query SearchCoffee($searchString: String!) {
  findCoffee(searchString: $searchString) {
    _id
    brand
    name
    beanType
    origin
    rating
    #image
  }
}
`;