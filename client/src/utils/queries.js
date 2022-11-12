import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
    }
  }
`;

export const COFFEE_SEARCH = gql`
query SearchCoffee($searchString: String!) {
  findCoffee(searchString: $searchString) {
    _id
    brand
    name
    beanType
    origin
    rating
    #image
  }
}
`;

export const COFFEE = gql`
query getCoffee($coffeeId: ID!) {
  coffee(coffeeId: $coffeeId) {
    _id
    beanType
    brand
    fullFlavorProfile {
      roasted {
        cereal
        burnt
        tobacco
      }
      spices {
        nutmeg
        cinnamon
        clove
        pepper
        pungent
      }
      nutty
      cocoa {
        chocolate
        darkChocolate
      }
      sweet {
        honey
        caramel
        mapleSyrup
        molasses
        vanilla
        overallSweet
        sweetAromatics
      }
      floral
      blackTea
      fruity {
        berry
        driedFruit
        citrusFruit
        otherFruit
      }
      sour
      fermented
      green {
        oliveOil
        raw
        vegetative
        beany
      }
      other {
        paperyMusty
        chemical
      }
    }
    name
    origin
    rating
    reviews {
      _id
      coffeeRating
      reviewText
    }
    roast
    simpleFlavorProfile {
      roasted
      spices
      nutty
      cocoa
      sweet
      floral
      blackTea
      fruity
      sour
      fermented
      green
      other
    }
  }
}
`;

export const QUERY_USER_FLAVOR_PROFILES = gql`
  query UserFlavorProfiles {
  me {
    fullFlavorProfile {
      roasted {
        cereal
        burnt
        tobacco
      }
      spices {
        nutmeg
        cinnamon
        clove
        pepper
        pungent
      }
      nutty
      cocoa {
        chocolate
        darkChocolate
      }
      sweet {
        honey
        caramel
        mapleSyrup
        molasses
        vanilla
        overallSweet
        sweetAromatics
      }
      floral
      blackTea
      fruity {
        berry
        driedFruit
        citrusFruit
        otherFruit
      }
      sour
      fermented
      green {
        oliveOil
        raw
        vegetative
        beany
      }
      other {
        paperyMusty
        chemical
      }
    }
    simpleFlavorProfile {
      roasted
      spices
      nutty
      cocoa
      sweet
      floral
      blackTea
      fruity
      sour
      fermented
      green
      other
    }
  }
}
`;