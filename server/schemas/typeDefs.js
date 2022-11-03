const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
  }

  type Coffee {
    _id: ID
    brand: String
    name: String
    roast: String
    beanType: String
    origin: String
    flavorProfile: String //will be changed
    rating: Int
    reviews: [Review]
  }

  type Review {
    _id: ID
    coffee: Coffee
    coffeeRating: Int
    reviewText: String
    image: String
    flavorProfile: String //will be changed
    user: User
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
