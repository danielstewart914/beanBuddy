const { AuthenticationError } = require('apollo-server-express');
const { User, Coffee, Review } = require('../models');
const { signToken } = require('../utils/auth');
const coffeeSearch = require('../utils/coffeeSearch');

const { ObjectId } = require( 'mongoose' ).Types;

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
    coffee: async ( parent, { coffeeId } ) => {
      return await Coffee.findOne( { _id: coffeeId } ).populate( 'reviews' );
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

      if (!user)
        throw new AuthenticationError('No user found with this email address');

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw)
        throw new AuthenticationError('Incorrect credentials');

      const token = signToken(user);

      return { token, user };
    },
    updateUser: async ( parent, args, context ) => {
      return await User.findByIdAndUpdate( context.user._id, args , { new: true } );
    },
    deleteUser: async ( parent, args, context ) => {

      if ( !context.user ) 
        throw new AuthenticationError('You need to be logged in!');

      const deletedUser = await User.findByIdAndDelete( context.user._id );
      if ( !deletedUser ) 
        throw new Error( 'User does not exist!' );

      const coffeeIds = ( 
        await Review.find( { _id: { $in: deletedUser.reviews } } ) )
        .map( review => review.coffeeId 
      );

      await Review.deleteMany( { _id: { $in: deletedUser.reviews } } );
      await Coffee.updateMany( 
        { _id: coffeeIds },
        { $pull: { reviews: { $in: deletedUser.reviews } } }
        );
      return true;
    },
    addReview: async ( parent, { coffeeId, review }, context ) => {

      if (!context.user) 
        throw new AuthenticationError('You need to be logged in!');

        const newReview = await Review.create( review );
        const updatedCoffee = await Coffee.findOneAndUpdate( 
          { _id: coffeeId },
          { $addToSet: { reviews: newReview._id } },
          { runValidators: true, new: true }
        );
        await User.findOneAndUpdate( 
          { _id: context.user._id },
          { $addToSet: { reviews: newReview._id } },
          { runValidators: true, new: true }
        );

        return updatedCoffee;
    },
    updateReview: async ( parent, { reviewUpdate }, context ) => {
      if ( !context.user ) 
        throw new AuthenticationError('You need to be logged in!');

      const loggedInUser = await User.findById( context.user._id );

      const { reviewId, coffeeRating, flavorProfile, additionalReviewText } = reviewUpdate;
      
      if ( !loggedInUser.reviews.includes( reviewId ) ) 
        throw new AuthenticationError('This review does not belong to you!');
      
      const updatedReview = await Review.findByIdAndUpdate( 
        reviewId,
        { 
          coffeeRating: coffeeRating, 
          flavorProfile: flavorProfile, 
          $addToSet: { 
            reviewText:  additionalReviewText 
          } 
        },
        { new: true }
      );
      
      return updatedReview;
    },
    deleteReview: async ( parent, { reviewId } ) => {
      const review = await Review.findById( reviewId );
      await Coffee.findByIdAndUpdate( 
        review.coffeeId,
        { $pull: { reviews: review._id } }
      );
      await User.findByIdAndUpdate( 
        review.userId,
        { $pull: { reviews: review._id } }
      );
    
      return true;
    },
    addCoffee: async ( parent, { coffee } ) => {
      return await Coffee.create( coffee );
    },
    deleteCoffee: async ( parent, { coffeeId } ) => {
      const deletedCoffee = await Coffee.findByIdAndDelete( coffeeId );
      const userIds = ( 
        await Review.find( { _id: { $in: deletedCoffee.reviews } } ) )
        .map( review => review.userId 
      );

      await Review.deleteMany( { _id: { $in: deletedCoffee.reviews } } );
      await User.updateMany(
        { _id: userIds },
        { $pull: { reviews: { $in: deletedCoffee.reviews } } }
      );
      return true;
    }
  },
};

module.exports = resolvers;
