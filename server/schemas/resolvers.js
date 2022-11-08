const { AuthenticationError } = require('apollo-server-express');
const { User, Coffee } = require('../models');
const { signToken } = require('../utils/auth');
const coffeeSearch = require('../utils/coffeeSearch');

const resolvers = {
  Query: {
    users: async () => {
      return await User.find({}).populate( 'reviews' );
    },
    user: async (parent, { username }) => {
      return await User.findOne({ username }).populate( 'reviews' );
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id }).populate( 'reviews' );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    allCoffee: async () => {
      return await Coffee.find({}).populate( 'reviews' );
    },
    coffee: async ( parent, { id } ) => {
      return await Coffee.findOne( { _id: id } ).populate( 'reviews' );
    },
    findCoffee: async ( parent, { searchString } ) => {
      const coffees = await Coffee.find({}).populate( 'reviews' );
      return coffeeSearch( coffees, searchString );
    }
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
  },
};

module.exports = resolvers;
