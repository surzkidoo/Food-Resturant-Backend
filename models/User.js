const mongoose = require('mongoose')

const userScheme = mongoose.Schema({
    username:{
        type:String,
        Required:true
    },
    email:{
        type:String,
        Required:true
    },
    password:{
        type:String,
        Required:true
    }
    

});


module.exports =mongoose.model("User",userScheme)