const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    userId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"User",
    },
    orderItem:[{
        quantity:Number,
        sub_total:Number,
        food_id:{
            type:mongoose.SchemaTypes.ObjectId,
            ref:"Food",
            unique:true
    }}],
    total:Number,
    OrderStatus:{
        type:String,
        default:"pending"
    },
    email:{
        type:String,
        Required:true
    },
    address:{
        type:String,
        Required:true
    },
    mobile:{
        type:String,
        Required:true
    }
    
    

});

module.exports =mongoose.model("Order",orderSchema)
