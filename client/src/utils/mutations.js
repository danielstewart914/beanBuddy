import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_REVIEW = gql`
  mutation addReview($coffee: String!, $coffeeRating: Int!, $grind: String!, $brewMethod: String!, $reviewText: String!, $image: String!, $flavorProfile: String!) {
    addReview(coffee: $coffee, coffeeRating: $coffeeRating, grind: $grind, brewMethod: $brewMethod, reviewText: $reviewText, image: $image, flavorProfile: $flavorProfile) {
      _id
      coffee
      coffeeRating
      grind
      brewMethod
      reviewText
      image
      flavorProfile
      createdAt
      username
    }
  }
`;