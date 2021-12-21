const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

router.get("/", async (req, res) => {
  try {
    if (req.query.userId) {
      var order = await Order.find({ userId: req.query.userId });
    } else {
      order = await Order.find({});
    }

    return res.json({ order });
  } catch (e) {
    return res.status(404).json({ message: "Order not found" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    let order = await Order.find({ _id: req.params.id, userId: req.user });
    return res.json({ order });
  } catch (e) {
    return res.status(404).json({ message: "Order not found" });
  }
});

router.post("/", async (req, res) => {
  let orderitems = req.body.orderitems;
  try {
    let order = new Order({
      userId: req.user,
      orderitems: orderitems,
      total: req.body.total,
      address: req.body.address,
      email: req.body.email,
      mobile: req.body.mobile,
    });

    order.save();
  } catch {
    return res.status(400).json({ message: "Failed to Add" });
  }
});
router.put("/", async (req, res) => {});

router.delete("/:id", async (req, res) => {
    try {
        let order = await Order.deleteOne({_id:req.params.id})
        res.json({
          order,
        });
      } catch (e) {
        res.status(400).json({message:"failed to delete"});
      }
});

module.exports = router;
