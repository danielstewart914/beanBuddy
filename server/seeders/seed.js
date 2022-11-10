const db = require('../config/connection');
const { User, Coffee, Review } = require('../models');
const userSeeds = require('./userSeeds.json');
const coffeeSeeds = require( './coffeeSeeds.json' );
const reviewSeeds = require( './reviewSeeds.json' );

const randomElement = ( array ) => {
  return array[ Math.floor( ( Math.random() * array.length ) ) ]
}

db.once('open', async () => {
  try {
    // await Thought.deleteMany({});
    await User.deleteMany({});
    await Coffee.deleteMany({});
    await Review.deleteMany({});

    const users = await User.create(userSeeds);
    const coffees = await Coffee.create(coffeeSeeds);
    const reviews = await Review.create(reviewSeeds);

    for ( let i = 0; i < coffees.length; i++ ) {
      await Coffee.findByIdAndUpdate( 
        coffees[i]._id, 
        { $addToSet: { reviews: reviews[i]._id } } 
      );
      await Review.findByIdAndUpdate( 
        reviews[i]._id,
        { coffeeId: coffees[i] }
      );
    }

    for (let i = 0; i < reviews.length; i++) {
      const userId = randomElement( users )._id;
      await User.findByIdAndUpdate( 
        userId,
        { $addToSet: { reviews: reviews[i]._id } }
      );
      await Review.findByIdAndUpdate( 
        reviews[i]._id ,
        { userId: userId }
      );
    }    

  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
