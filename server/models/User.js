const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const { 
  reduceArrayToMeanObject, 
  reduceNestedObjects, 
  blankFullProfile, 
  blankSimpleProfile 
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
    // return single object with mean value of each flavor
    return reduceArrayToMeanObject( flavorProfiles );
  } else {
    return blankFullProfile;
  }
} );

userSchema.virtual( 'simpleFlavorProfile' ).get( async function () {
  if ( this.reviews.length ) {
    // map array of flavorProfiles from reviews
    const flavorProfiles = this.reviews.map( review => review.flavorProfile.toJSON() );
    // return a reduced object with subObjects consolidated into single values
    return reduceNestedObjects( reduceArrayToMeanObject( flavorProfiles ) );
  } else {
    return blankSimpleProfile;
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
