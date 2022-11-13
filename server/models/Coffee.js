const { Schema, model } = require('mongoose');

const { 
  reduceArrayToMeanObject, 
  reduceNestedObjects,
  propertiesToAbs,
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

coffeeSchema.virtual( 'fullFlavorProfile' ).get( async function () {
  if ( this.reviews.length ) {
    // map array of flavorProfiles from reviews with absolute values
    const flavorProfiles = this.reviews.map( review => propertiesToAbs( review.flavorProfile.toJSON() ) );
    // return single object with mean of each flavor
    return reduceArrayToMeanObject( flavorProfiles  );
  } else {
    return blankFullProfile;
  }
} );

coffeeSchema.virtual( 'simpleFlavorProfile' ).get( async function () {
  if ( this.reviews.length ) {
    // map array of flavorProfiles from reviews with absolute values
    const flavorProfiles = this.reviews.map( review => propertiesToAbs( review.flavorProfile.toJSON() ) );
    // return a reduced object with subObjects consolidated into single values as well
    return reduceNestedObjects( reduceArrayToMeanObject( flavorProfiles ) );
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

coffeeSchema.virtual( 'image' ).get( async function () {
  if ( this.reviews.length ) {
    const images = this.reviews.map( review => review.image ).filter( imageURL => imageURL.length );
    return images[ Math.floor( Math.random() * images.length ) ];
  }
} );

const Coffee = model('Coffee', coffeeSchema);

module.exports = Coffee;