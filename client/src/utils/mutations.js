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

export const UPDATE_USER_EMAIL = gql`
  mutation updateEmail($email: String!) {
  updateUser(email: $email) {
    _id
    email
  }
}
`;

export const UPDATE_USER_PASSWORD = gql`
  mutation updatePassword($password: String!) {
  updateUser(password: $password) {
    _id
  }
}

`
export const DELETE_USER = gql`
mutation deleteUser {
  deleteUser
}

`;

export const ADD_REVIEW = gql`
  mutation AddReview($coffeeId: ID!, $newReview: ReviewInput!) {
  addReview(coffeeId: $coffeeId, newReview: $newReview) {
    _id
    coffeeRating
    image
    grind
    reviewText
  }
}
`;

export const ADD_REVIEW_IMAGE = gql`
  mutation AddreviewImage($reviewId: ID!, $ext: String!) {
  addReviewImage(reviewId: $reviewId, ext: $ext)
}
`;

export const ADD_COFFEE = gql`
  mutation AddCoffee($coffee: CoffeeInput!) {
  addCoffee(coffee: $coffee) {
    _id
    beanType
    brand
    name
    origin
    roast
  }
}
`;