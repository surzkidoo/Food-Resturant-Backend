const express = require("express");
const Cart = require("../models/Cart");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    var cart;
    var userid = req.query.userid;
    if (userid != null) {
      cart = await Cart.find({ user_id: userid });
    } else {
      cart = await Cart.find({});
    }

    res.json({
      cart,
    });
  } catch (e) {
    console.log(e);
  }
});

router.get("/:id", async (req, res) => {
  try {
    let cart = await Cart.find({ _id: req.params.id });
    res.json({ cart });
  } catch (e) {
    console.log(e);
  }
});

router.put("/:id", async (req, res) => {
  try {
    let cartitemid = req.body.cartitemid;
    let cart = await Cart.updateOne({ _id: req.params.id,"cartitem._id":cartitemid },{$set:{"cartitem.$.quantity":req.body.quantity}});
    res.json({ cart });
  } catch (e) {
    console.log(e);
  }
});

router.post("/", async (req, res) => {
  req.user = req.user || req.body.user_id;
  if (req.user == null) {
    //Generating Random number for Non-Authenticated user
    let randomId = Math.random() + "" + Date.now();
    req.user = randomId.split(".")[1];
  }

  try {
    var cartaval = await Cart.findOne({
      user_id: req.user,
      "cartitem.food_id": req.body.cartitem.food_id,
    });
    if (cartaval) return res.sendStatus(400);
    var cart = await Cart.findOne({ user_id: req.user });
    if (cart != null) {
      cart.cartitem.push(req.body.cartitem);
    } else {
      cart = new Cart({
        user_id: req.user,
        cartitem: req.body.cartitem,
      });
    }
    console.log(req.body.cartitem);

    await cart.save();
    res.json({
      cart,
    });
  } catch (e) {
    console.log(e);
  }
});

router.delete("/:id", async (req, res) => {
  var cartitemid=req.query.cartitemid
    try {
    if(cartitemid!=null){
     let cart =  await Cart.findOne({_id:req.params.id,})
     cart.cartitem.id(cartitemid).remove()
     
  }

    let cart = await Cart.deleteOne({_id:req.params.id})
    res.json({
      cart,
    });
  } catch (e) {
    console.log(e);
  }
});

router.put(":id/cart/cartitem/:cartitemid", (req, res) => {});
router.delete(":id/cart/cartitem/:cartitemid", (req, res) => {});

module.exports = router;
