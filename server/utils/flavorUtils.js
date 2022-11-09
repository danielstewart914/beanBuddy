// utilities for working with flavorProfile

// return the mean value of an array of numbers rounded to the nearest integer
const intMean =( array ) => {
  return Math.round( array.reduce( ( a, b ) => a + b, 0 ) / array.length ) || 0;
}

// reduce array of objects to single object with mean values for each non-zero property
// All objects must be the same and all properties must be numbers
const reduceArrayToMeanObject = ( array ) => {
  const result = {};
  // get object keys and loop through them
  Object.keys( array[0] ).forEach( key => {
    // if the object contains a '_id' discard it
    if ( key !== '_id' ) {
      // if property is an object recursively call reduceArrayToMeanObject
      // passing a mapped array of current property
      if ( typeof array[0][key] === 'object' ) result[key] = reduceArrayToMeanObject( array.map( object => object[key] ) );
      else {
        // otherwise reduce property
        const propertyArray = [];
        // loop through each object in array and push current property to temp array
        array.forEach( object => {
          propertyArray.push( object[key] )
        } );
        // filter array to only contain non-zero values
        const filteredArray =  propertyArray.filter( num => num !== 0 );
        // reduce to single mean value
        result[key] = intMean( filteredArray );
      }
    }
  } );
  return result;
};

// reduces object with single layer of nested objects to just top layer properties with integer values
const reduceNestedObjects = ( object ) => {
  const result = {};
  // get object keys and loop through them
  Object.keys( object ).forEach( key => {
    // if property is an object
    if ( typeof object[key] === 'object' ) {
      // get values of sub object
      const values = Object.values( object[key] );
      // and reduce to single mean value and store in result object
      const filteredArray =  values.filter( num => num !== 0 );
      result[key] = intMean( filteredArray );
      // otherwise pass value on to result object
    } else result[key] = object[key];
  } );
  return result;
};

// takes an object containing either sub-objects themselves containing numbers or simply numbers
// and converts all negative numbers to positive numbers
const propertiesToPositive = ( object ) => {
  const result = {};
  // get object keys and loop through them
  Object.keys( object ).forEach( key => {
    // if property is an object recursively call propertiesToPositive
    // passing current property
    if ( typeof object[key] === 'object' ) {
      result[key] = propertiesToPositive( object[key] );
      // if current property is negative
    } else if ( object[key] < 0 ) {
      // convert to positive and store in result object
      result[key] = object[key] * -1;
    } else {
      // otherwise pass value on to result object
      result[key] = object[key];
    }
  } );
  return result;
}

const blankFullProfile = {
  roasted: {
    cereal: 0,
    burnt: 0,
    tobacco: 0
  },
  spices: {
      nutmeg: 0,
      cinnamon: 0,
      clove: 0,
      pepper: 0,
      pungent: 0
  },
  nutty: 0,
  cocoa: {
      chocolate: 0,
      darkChocolate: 0,
  },
  sweet: {
      honey: 0,
      caramel: 0,
      mapleSyrup: 0,
      molasses: 0,
      vanilla: 0,
      overallSweet: 0,
      sweetAromatics: 0,
  },
  floral: 0,
  blackTea: 0,
  fruity: {
      berry: 0,
      driedFruit: 0,
      citrusFruit: 0,
      otherFruit: 0
  },
  sour: 0,
  fermented: 0,
  green: {
      oliveOil: 0,
      raw: 0,
      vegetative: 0,
      beany: 0
  },
  other: {
      paperyMusty: 0,
      chemical: 0
  }
};

const blankSimpleProfile = {
  roasted: 0,
  spices: 0,
  nutty: 0,
  cocoa: 0,
  sweet: 0,
  floral: 0,
  blackTea: 0,
  fruity: 0,
  sour: 0,
  fermented: 0,
  green: 0,
  other: 0
};

module.exports = { 
  reduceArrayToMeanObject, 
  reduceNestedObjects, 
  propertiesToPositive, 
  blankFullProfile,
  blankSimpleProfile,
  intMean 
};