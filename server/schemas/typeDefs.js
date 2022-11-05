const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    fullFlavorProfile: FullFlavorProfile
    simpleFlavorProfile: SimpleFlavorProfile
    reviews: [Review]!
  }

  type SimpleFlavorProfile {
    roasted: Int
    spices: Int
    nutty: Int
    cocoa: Int
    sweet: Int
    floral: Int
    blackTea: Int
    fruity: Int
    sour: Int
    fermented: Int
    green: Int
    other: Int

  }

  type FullFlavorProfile {
    roasted: Roasted
    spices: Spices
    nutty: Int
    cocoa: Cocoa
    sweet: Sweet
    floral: Int
    blackTea: Int
    fruity: Fruity
    sour: Int
    fermented: Int
    green: Green
    other: Other
  }

  type Roasted {
    cereal: Int
    burnt: Int
    tobacco: Int
  }

  type Spices {
    nutmeg: Int
    cinnamon: Int
    clove: Int
    pepper: Int
    pungent: Int
  }

  type Cocoa {
    chocolate: Int
    darkChocolate: Int
  }

  type Sweet {
    honey: Int
    caramel: Int
    mapleSyrup: Int
    molasses: Int
    vanilla: Int
    overallSweet: Int
    sweetAromatics: Int
  }

  type Fruity {
    berry: Int
    driedFruit: Int
    citrusFruit: Int
    otherFruit: Int
  }

  type Green {
    oliveOil: Int
    raw: Int
    vegetative: Int
    beany: Int
  }

  type Other {
    paperyMusty: Int
    chemical: Int
  }

  type Coffee {
    _id: ID
    brand: String
    name: String
    roast: String
    beanType: String
    origin: String
    fullFlavorProfile: FullFlavorProfile
    simpleFlavorProfile: SimpleFlavorProfile
    rating: Int
    reviews: [Review]
  }

  type Review {
    _id: ID
    coffeeRating: Int
    grind: String
    reviewText: String
    image: String
    flavorProfile: FullFlavorProfile
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
