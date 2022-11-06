const { gql } = require('apollo-server-express');

const typeDefs = gql`

  # Output typedefs

  type User {
    _id: ID
    username: String
    email: String
    flavorSettings: FullFlavorProfile
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

  # input typedefs

  input ReviewInput {
    coffeeRating: Int!
    grind: String
    reviewText: String!
    image: String
    flavorProfile: FullFlavorProfileInput!
  }

  input CoffeeInput {
    brand: String!
    name: String!
    roast: String!
    beanType: String
    origin: String
  }

  input FullFlavorProfileInput {
    roasted: RoastedInput
    spices: SpicesInput
    nutty: Int
    cocoa: CocoaInput
    sweet: SweetInput
    floral: Int
    blackTea: Int
    fruity: FruityInput
    sour: Int
    fermented: Int
    green: GreenInput
    other: OtherInput
  }

  input RoastedInput {
    cereal: Int
    burnt: Int
    tobacco: Int
  }

  input SpicesInput {
    nutmeg: Int
    cinnamon: Int
    clove: Int
    pepper: Int
    pungent: Int
  }

  input CocoaInput {
    chocolate: Int
    darkChocolate: Int
  }

  input SweetInput {
    honey: Int
    caramel: Int
    mapleSyrup: Int
    molasses: Int
    vanilla: Int
    overallSweet: Int
    sweetAromatics: Int
  }

  input FruityInput {
    berry: Int
    driedFruit: Int
    citrusFruit: Int
    otherFruit: Int
  }

  input GreenInput {
    oliveOil: Int
    raw: Int
    vegetative: Int
    beany: Int
  }

  input OtherInput {
    paperyMusty: Int
    chemical: Int
  }

  # Queries

  type Query {
    users: [User]
    user(username: String!): User
    me: User
    allCoffee: [Coffee]
    coffee(id: ID!): Coffee
  }

  # Mutations

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    deleteUser( id: ID! ): Boolean
    addReview( review: ReviewInput! ): Review
    updateReview( updatedReview: ReviewInput! ): Review
    deleteReview( id: ID! ): Boolean
    addCoffee( coffee: CoffeeInput! ): Coffee
    deleteCoffee( id: ID! ): Boolean
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;