const mongoose = require('mongoose')

const cartScheme = mongoose.Schema({
    user:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"user",
    },
    cartitem:[{
        product:{
            type:mongoose.SchemaType.ObjectId,
            ref: "Food"
        },
        quantity:Number,
    }],
    createdAt:{
        type:Date,
        default:()=>new Date.now()
    }
    

});


module.exports =mongoose.model("Cart",cartScheme)