const Clothing = require("../models/clothing");
const Category = require("../models/category");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.clothing_list = asyncHandler(async (req, res, next) => {
  const clothing = await Clothing.find({}, "name price")
    .sort({ name: 1 })
    .exec();

  res.render("clothing_list", {
    title: "All Clothing",
    clothing_list: clothing,
  });
});

exports.clothing_detail = asyncHandler(async (req, res, next) => {
  const clothing = await Clothing.findById(req.params.id)
    .populate("category")
    .exec();

  if (clothing === null) {
    const err = new Error("Clothing not found");
    err.status = 404;
    return next(err);
  }

  res.render("clothing_detail", { title: clothing.name, clothing: clothing });
});

exports.clothing_create_get = asyncHandler(async (req, res, next) => {
  res.render("form", { title: "Create New Clothing Item" });
});

exports.clothing_create_post = [
  (req, res, next) => {
    next();
  },

  body("name", "Name must be between 2 - 100 characters")
    .trim()
    .isLength({ min: 2, max: 100 })
    .escape(),
  body("description", "Description must be between 2 - 200 characters")
    .trim()
    .isLength({ min: 2, max: 100 })
    .escape(),
  body("price")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Price must not be empty")
    .isNumeric()
    .withMessage("Price must be a number")
    .escape(),
  body("stock")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Stock must not be empty")
    .isNumeric()
    .withMessage("Stock must be a number")
    .isInt()
    .withMessage("Stock must be an integer")
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const category = await Category.find({ name: "Clothing" });
    console.log("category: " + category);
    const clothing = new Clothing({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
      category: category,
    });

    if (!errors.isEmpty()) {
      res.render("form", {
        title: "Create New Broom",
        clothing: clothing,
        errors: errors.array(),
      });
    } else {
      await clothing.save();
      console.log("saved");
      res.redirect(clothing.url);
    }
  }),
];

exports.clothing_delete_get = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented: clothing delete get");
});

exports.clothing_delete_post = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented: clothing delete post");
});

exports.clothing_update_get = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented: clothing update get");
});

exports.clothing_update_post = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented: clothing update post");
});
