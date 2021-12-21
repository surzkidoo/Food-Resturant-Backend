const mongoose = require('mongoose')

const cartScheme = mongoose.Schema({
    user_id:{
        type:String
    },
    cartitem:[{
        quantity:Number,
        food_id:{
            type:mongoose.SchemaTypes.ObjectId,
            ref:"Food",
            unique:true
        }
    }],
    createdAt:{
        type:Date,
        default: Date.now()
    }
    

});


module.exports =mongoose.model("Cart",cartScheme)