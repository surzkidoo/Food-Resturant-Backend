const express = require("express");
const Food = require("../models/Food");
const multer = require("multer");
const path = require("path");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let food = await Food.find({});
    res.json(food);
  } catch (e) {
    console.log(e);
  }
});

router.get("/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    if (req.params.id == null)
      return res.status(403).json({ message: "Id is required" });
    let food = await Food.findOne({ _id: req.params.id });
    res.status(201).json({ food });
  } catch (e) {
    res.status(404).json({ message: "Invalid ID provided" });
  }
});

router.post("/", async (req, res) => {
  var filepath;
  try {
  const storage = multer.diskStorage({
      destination: function (req, res, cb) {
          cb(null, './images')
      },
      filename: function (req, file, cb) {
        filepath=file.originalname.split(".")[0] + '-' + Date.now() + path.extname(file.originalname)
          cb(null,filepath)
      }
  })

  let upload=multer({storage:storage}).single("file");
  
  upload(req,res,function(err,fl){
      if (err) return res.json({err})

      console.log(filepath)
  })
  let food = new Food({
    name: req.body.name,
    description: req.body.discription,
    price: req.body.price,
    category: req.body.category,
    recipes: req.body.recipes,
    image: filepath,
  });

    await food.save();
    res.json({
      messegae: "hffdgj",
    });
  } catch (e) {
    console.log(e);
  }
});
router.put("/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    if (req.params.id == null)
      return res.status(403).json({ message: "Id is required" });
    let food = await Food.findOne({ _id: req.params.id });
    food.name = req.body.name;
    food.description = req.body.discription;
    food.price = req.body.price;
    food.category = req.body.category;
    food.recipes = req.body.recipes;
    food.comment = req.body.comment;
    food.image = req.body.image;
    await food.save();
    res.status(201).json({ food });
  } catch (e) {
    res.status(404).json({ message: "update failed" });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    await Food.findOneAndDelete({ _id: req.params.id });
    res.status(201).json({ message: "deleted succesfully" });
  } catch (e) {
    res.status(403).json({ message: "delete failed" });
  }
});

module.exports = router;
