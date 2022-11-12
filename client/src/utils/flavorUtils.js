export const getSimpleDataArray = ( simpleProfile ) => {
  return [ 
    simpleProfile.roasted,  
    simpleProfile.spices,  
    simpleProfile.nutty,  
    simpleProfile.cocoa,  
    simpleProfile.sweet,  
    simpleProfile.floral,  
    simpleProfile.blackTea,  
    simpleProfile.fruity,  
    simpleProfile.sour,  
    simpleProfile.fermented,  
    simpleProfile.green,  
    simpleProfile.other,  
  ];
};

export const getFullDataArray = ( fullProfile ) => {
  return [
    fullProfile.roasted.cereal,
    fullProfile.roasted.burnt,
    fullProfile.roasted.tobacco,
    fullProfile.spices.nutmeg,
    fullProfile.spices.cinnamon,
    fullProfile.spices.clove,
    fullProfile.spices.pepper,
    fullProfile.spices.pungent,
    fullProfile.nutty,
    fullProfile.cocoa.chocolate,
    fullProfile.cocoa.darkChocolate,
    fullProfile.sweet.honey,
    fullProfile.sweet.caramel,
    fullProfile.sweet.mapleSyrup,
    fullProfile.sweet.molasses,
    fullProfile.sweet.vanilla,
    fullProfile.sweet.overallSweet,
    fullProfile.sweet.sweetAromatics,
    fullProfile.floral,
    fullProfile.blackTea,
    fullProfile.fruity.berry,
    fullProfile.fruity.driedFruit,
    fullProfile.fruity.citrusFruit,
    fullProfile.fruity.otherFruit,
    fullProfile.sour,
    fullProfile.fermented,
    fullProfile.green.oliveOil,
    fullProfile.green.raw,
    fullProfile.green.vegetative,
    fullProfile.green.beany,
    fullProfile.other.paperyMusty,
    fullProfile.other.chemical,
  ]
}

export const negativeToNegativeOne = ( array ) => {
  return array.map( number => number < -1 ? 0 : number );
}

export const formatFlavor = ( flavor ) => {
  return flavor.dislike ? ( flavor.value * -1 ) : flavor.value
}