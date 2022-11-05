const { Schema, model } = require('mongoose');

const { 
  reduceArrayToMeanObject, 
  reduceNestedObjects,
  propertiesToPositive,
  blankFullProfile, 
  blankSimpleProfile, 
  intMean
} = require( '../utils/flavorUtils' );

const coffeeSchema = new Schema(
  {
    brand: {
        type: String,
        required: true, 
        trim: true,
    },
    name: {
        type: String,
        required: true,
        unique: true, 
        trim: true,
    },
    roast: {
        type: String,
        required: true,
        trim: true, 
    },
    beanType: {
        type: String, 
        required: false,
        trim: true,
    },
    origin: {
        type: String,
        required: false,
        trim: true,
    },
    reviews: [
        { 
          type: Schema.Types.ObjectId,
          ref: 'Review'
        }
    ]
  },
  {
    toJSON: {
      virtuals: true,
      id: false
    }
  }
);

coffeeSchema.pre( 'find', async function ( next ) {
  await this.populate( 'reviews' );
  next();
} );

coffeeSchema.virtual( 'fullFlavorProfile' ).get( async function () {
  if ( this.reviews.length ) {
    // map array of flavorProfiles from reviews
    const flavorProfiles = this.reviews.map( review => review.flavorProfile.toJSON() );
    // return single object with mean positive value of each flavor
    return propertiesToPositive( reduceArrayToMeanObject( flavorProfiles ) );
  } else {
    return blankFullProfile;
  }
} );

coffeeSchema.virtual( 'simpleFlavorProfile' ).get( async function () {
  if ( this.reviews.length ) {
    // map array of flavorProfiles from reviews
    const flavorProfiles = this.reviews.map( review => review.flavorProfile.toJSON() );
    // return a reduced object with subObjects consolidated into single positive values
    return propertiesToPositive( reduceNestedObjects( reduceArrayToMeanObject( flavorProfiles ) ) );
  } else {
    return blankSimpleProfile;
  }
} );

coffeeSchema.virtual( 'rating' ).get( async function () {
  if ( this.reviews.length ) {
    // map array of ratings from reviews
    const coffeeRatings = this.reviews.map( review => review.coffeeRating );
    return intMean( coffeeRatings );
  }
} );

const Coffee = model('Coffee', coffeeSchema);

module.exports = Coffee;