const Wand = require("../models/wand");
const Category = require("../models/category");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const wand = require("../models/wand");

exports.wand_list = asyncHandler(async (req, res, next) => {
  const wands = await Wand.find({}, "name price").sort({ name: 1 }).exec();

  res.render("wand_list", {
    title: "All Wands",
    wand_list: wands,
  });
});

exports.wand_detail = asyncHandler(async (req, res, next) => {
  const wand = await Wand.findById(req.params.id).populate("category").exec();

  if (wand === null) {
    const err = new Error("Wand not found");
    err.status = 404;
    return next(err);
  }

  res.render("wand_detail", { title: wand.name, wand: wand });
});

exports.wand_create_get = asyncHandler(async (req, res, next) => {
  res.render("form", { title: "Create New Wand" });
});

exports.wand_create_post = [
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
    console.log(errors);
    const category = await Category.find({ name: "Wand" });
    console.log("category: " + category);
    const wand = new Wand({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
      category: category,
    });

    if (!errors.isEmpty()) {
      res.render("form", {
        title: "Create New Wand",
        wand: wand,
        errors: errors.array(),
      });
    } else {
      await wand.save();
      console.log("saved");
      res.redirect(wand.url);
    }
  }),
];

exports.wand_delete_get = asyncHandler(async (req, res, next) => {
  const wand = await Wand.findById(req.params.id).exec();

  if (wand === null) {
    res.redirect("/inventory/wand");
  }

  res.render("delete", { title: "Delete Wand", item: wand });
});

exports.wand_delete_post = asyncHandler(async (req, res, next) => {
  await Wand.findByIdAndDelete(req.body.itemid);
  res.redirect("/inventory/wands");
});

exports.wand_update_get = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented: wand update get");
});

exports.wand_update_post = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented: wand update post");
});
