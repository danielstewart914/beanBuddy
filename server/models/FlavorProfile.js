const { Schema } = require('mongoose');

const flavorProfileSchema = new Schema(
  {
    roasted: {
      cereal: {
        type: Number
      },
      burnt: {
        type: Number
      },
      tobacco: {
        type: Number
      },
    },
    spices: {
      nutmeg: {
        type: Number
      },
      cinnamon: {
        type: Number
      },
      clove: {
        type: Number
      },
      pepper: {
        type: Number
      },
      pungent: {
        type: Number
      },
    },
    nutty: {
      type: Number
    },
    cocoa: {
      chocolate: {
        type: Number
    },
      darkChocolate: {
        type: Number
    },
    },
    sweet: {
      honey: {
        type: Number
      },
      caramel: {
        type: Number
      },
      mapleSyrup: {
        type: Number
      },
      molasses: {
        type: Number
      },
      vanilla: {
        type: Number
      },
      overallSweet: {
        type: Number
      },
      sweetAromatics: {
        type: Number
      },
    },
    floral: {
      type: Number
    },
    blackTea: {
      type: Number
    },
    fruity : {
      berry: {
        type: Number
      },
      driedFruit: {
        type: Number
      },
      citrusFruit: {
        type: Number
      },
      otherFruit: {
        type: Number
      }
    },
    sour: {
      type: Number
    },
    fermented: {
      type: Number
    },
    green: {
      oliveOil: {
        type: Number
      },
      raw: {
        type: Number
      },
      vegetative: {
        type: Number
      },
      beany: {
        type: Number
      }
    },
    other: {
      paperyMusty: {
        type: Number
      },
      chemical: {
        type: Number
      }
    }
  }
);

module.exports = flavorProfileSchema;