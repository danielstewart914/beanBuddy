const { Schema, model } = require('mongoose');

const reviewSchema = new Schema({
    coffee: {
        type: Schema.Types.ObjectId,
        ref: 'Coffee',
    },
    coffeeRating: {
        type: Number,
        required: true,
        trim: true,
    },
    grind: {
        type: String,
        required: false,
        trim: true,
    },
    brewMethod: {
        type: String,
        required: false,
        trim: true,
    },
    reviewText: {
        type: String,
        required: false,
        trim: true,
    },
    image: {
        type: String,
        required: false,
        trim: true,
    },
    flavorProfile: [flavorProfile],
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    // comments: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: 'Comment',
    //     },
    // ],
},
    {
    toJSON: {
        virtuals: true,
        },
    }
);

const Review = model('Review', reviewSchema);

module.exports = Review;