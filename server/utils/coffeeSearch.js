const levenshtein = require('fast-levenshtein');

const coffeeSearch = ( coffeeArray, searchTerm ) => {
  // split search string into individual words
  const searchWords = searchTerm .toLowerCase().split( ' ' );
  // return filtered array
  return coffeeArray.filter( ( { brand, name, roast, beanType, origin } ) => {
    // combine brand name roast beanType and origin into one long string
    const dataString = ( brand + ' ' + name + ' ' + roast + ' ' + beanType + ' ' + origin ).toLowerCase();
    // for every word in the search query
    for ( let i = 0; i < searchWords.length; i++ ) {
      // if the word is found in dataString return true to filter function
      if ( dataString.includes( searchWords[i] ) ) return true;
      else {
        // otherwise split dataString into individual words
        const wordArray = dataString.split( ' ' );
        // for each word in dataString
        for ( let j = 0; j < wordArray.length; j++ ) {
          // if levenshtein distance is less than 1/3 of searchWord length return true to filter function
          if ( levenshtein.get( wordArray[j], searchWords[i] ) <= searchWords[i].length / 3 ) return true;
        }
      }
    }
    // if nothing is found return false to filter function
    return false;
  } )
}

module.exports = coffeeSearch;