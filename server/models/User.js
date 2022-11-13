const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const flavorProfileSchema = require( './FlavorProfile' );

const { 
  reduceArrayToMeanObject, 
  reduceNestedObjects, 
  blankFullProfile
} = require( '../utils/flavorUtils' );

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must match an email address!'],
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    flavorSettings: {
      type: flavorProfileSchema,
      default: blankFullProfile
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

userSchema.virtual( 'fullFlavorProfile' ).get( async function () {
  if ( this.reviews.length ) {
    // map array of flavorProfiles from reviews
    const flavorProfiles = this.reviews.map( review => review.flavorProfile.toJSON() );
    flavorProfiles.push( this.flavorSettings.toJSON() );
    // return single object with mean value of each flavor
    return reduceArrayToMeanObject( flavorProfiles );
  } else {
    return this.flavorSettings;
  }
} );

userSchema.virtual( 'simpleFlavorProfile' ).get( async function () {
  if ( this.reviews.length ) {
    // map array of flavorProfiles from reviews
    const flavorProfiles = this.reviews.map( review => review.flavorProfile.toJSON() );
    flavorProfiles.push( this.flavorSettings.toJSON() );
    // return a reduced object with subObjects consolidated into single values
    return reduceNestedObjects( reduceArrayToMeanObject( flavorProfiles ) );
  } else {
    return reduceNestedObjects( this.flavorSettings.toJSON() );
  }
} );

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;
