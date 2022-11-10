require( 'dotenv' ).config();
const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const { 
  AuthenticationError, 
  UserInputError 
} = require('apollo-server-express');

const { User, Coffee, Review } = require('../models');
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
      if ( !username || !email || !password )
        throw new UserInputError( 'You must include username, email, and password' );

      const user = await User.create({ username, email, password });
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      if ( !email || !password )
        throw new UserInputError( 'You must include email and password' );

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
    addReview: async ( parent, { coffeeId, newReview }, context ) => {
      if (!context.user) 
        throw new AuthenticationError('You need to be logged in!');

        const review = await Review.create( 
          { 
            ...newReview, 
            coffeeId: coffeeId, 
            userId: context.user._id 
          } 
        );
        const updatedCoffee = await Coffee.findOneAndUpdate( 
          { _id: coffeeId },
          { $addToSet: { reviews: review._id } },
          { runValidators: true, new: true }
        );

        if ( !updatedCoffee ) {
          await Review.findByIdAndDelete( review._id );
          throw new UserInputError( `Could not find Coffee with id: ${ coffeeId }` );
        }
        await User.findOneAndUpdate( 
          { _id: context.user._id },
          { $addToSet: { reviews: review._id } },
          { runValidators: true, new: true }
        );

        return review;
    },
    addReviewImage: async ( parent, { reviewId } ) => {
      const params = {
        Bucket: 'bean-buddy',
        Key: `${ date.now() }-${ reviewId }-image.webp`,
        ContentType: "application/octet-stream"
      };
      
      s3.getSignedUrl( 'putObject', params, function ( err, url ) {
        const imageURL = url.split( '?' )[0];
        const review = Review.findByIdAndUpdate( reviewId, { image: imageURL } );

        if ( !review )
          throw new UserInputError( `Could not find review with Id: ${ reviewId }` );

        return url;
      });
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

      if ( !review )
        throw new UserInputError( `Could not find review with Id: ${ reviewId }` );

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
      const { brand, name, roast } = coffee;
      
      if ( !brand || !name || !roast )
        throw new UserInputError( 'Must include brand, name, and roast!' );

      return await Coffee.create( coffee );
    },
    deleteCoffee: async ( parent, { coffeeId } ) => {
      const deletedCoffee = await Coffee.findByIdAndDelete( coffeeId );

      if ( !deletedCoffee )
        throw new UserInputError( `Could not find coffee with Id: ${ coffeeId }` );

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
