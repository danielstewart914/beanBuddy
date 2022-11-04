const { Schema, model } = require('mongoose');

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
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String,
        required: false,
        trim: true,
    },
    flavorProfile: flavorProfileSchema,
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