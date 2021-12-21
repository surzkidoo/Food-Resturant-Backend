const express = require('express')
const jwt = require("jsonwebtoken")
const mongoose= require('mongoose')

const app = express()
const port = 3000

app.use(express.urlencoded({extended:false}))
app.use(express.static('public'));
app.use(express.static('images'));
app.use(express.json());

const Foodroute= require("./routes/Food")
const Cartroute= require("./routes/cart")
const Orderroute= require("./routes/Order")
const Userroute= require("./routes/User")
const usermodel = require('./models/User')



mongoose.connect('mongodb://127.0.0.1:27017/Restuarant',{useNewUrlParser:true,useUnifiedTopology:true},(err)=>{
    if(err) return console.log("Connection not succesfully"+err);
    console.log("Connected")
})



app.post('/register',async(req,res)=>{
    console.log(req.body)
    const user = new usermodel({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password
    })
    try{
        await user.save()
        res.json({message:"Successfully added"})
    }
    catch(e){
        console.log(e)
    }
  
} )

app.post('/login',async (req, res) => {

    try{
        let person = await usermodel.findOne({username:req.body.username,password:req.body.password})
        console.log(person)
        if (person==null) res.sendStatus(401)

        let token  = generateAccessToken({username:person.username,id:person._id});
        let refreshToken =jwt.sign({username:person.username,id:person._id},"djhnjjfjnjfnkfn")
        res.json({token,refreshToken})
    }
    catch(e){
        console.log(e)
    }

})

app.post('/token',(req,res)=>{
    let token = req.body.token
    jwt.verify(token,"ktydkcyucxtyxzrydydktdkt",(err,user)=>{
        if(err) return res.sendStatus(403);
        let token = generateAccessToken(user)
        res.json({token})
    })
})

const generateAccessToken = (user) =>{
    let token  = jwt.sign(user,"ktydkcyucxtyxzrydydktdkt",{expiresIn:'15m'});
    return token
}

const verifytoken=(req,res,next)=>{
    let header = req.headers["authorization"]
    let token =header && header.split(' ')[1]
    if (token==null) return res.sendStatus(401)
    jwt.verify(token,"ktydkcyucxtyxzrydydktdkt",(err,user)=>{
        if(err) return res.sendStatus(403);
        req.user=user
        next()
    })
}

//
app.use("/cart",Cartroute)
app.use("/user",Userroute)
app.use("/food",Foodroute)

app.use("/order",verifytoken,Orderroute)

app.get('/', (req, res) => res.send('Hello World!'))


app.listen(port, () => console.log(`Example app listening on port ${port}!`))