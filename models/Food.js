const mongoose = require('mongoose')

const foodScheme = mongoose.Schema({
    name: {
        type: String,
        Required: true
    },
    description: String,
    price: {
        type: Number,
        Required: true,
        default: 0
    },
    category: String,
    recipes: [
        String
    ],
    comment: [{
        username: String,
        message: String
    }],
    image: {
        type: String,
    }


});


module.exports = mongoose.model("Food", foodScheme)