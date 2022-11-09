const { Schema, model, Mongoose, Types } = require('mongoose');

const flavorProfileSchema = require( './FlavorProfile' );

const reviewSchema = new Schema(
  {
    coffeeRating: {
        type: Number,
        required: true,
        trim: true,
    },
    grind: {
        type: String,
        required: false,
        trim: true,
    },
    brewMethod: {
        type: String,
        required: false,
        trim: true,
    },
    reviewText: {
        type: [String],
        required: true,
        trim: true,
    },
    image: {
        type: String,
        required: false,
        trim: true,
    },
    flavorProfile: flavorProfileSchema,
    userId: {
      type: Types.ObjectId,
      ref: 'User'
    },
    coffeeId: {
      type: Types.ObjectId,
      ref: 'Coffee'
    }
  },
  {
    toJSON: {
      virtuals: true,
      id: false
    }
  }
);

const Review = model('Review', reviewSchema);

module.exports = Review;