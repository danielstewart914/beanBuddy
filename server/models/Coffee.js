const { Schema, model } = require('mongoose');

const coffeeSchema = new Schema({
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
    
    virtuals: {
        flavorProfile: [flavorProfile],
        rating: [rating],
    },
    
    reviews: [Reviews]
});

const Coffee = model('Coffee', coffeeSchema);

module.exports = Coffee;