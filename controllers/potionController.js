const Potion = require("../models/potion");
const Category = require("../models/category");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.potion_list = asyncHandler(async (req, res, next) => {
  const potions = await Potion.find({}, "name price").sort({ name: 1 }).exec();

  res.render("potion_list", {
    title: "All Potions",
    potion_list: potions,
  });
});

exports.potion_detail = asyncHandler(async (req, res, next) => {
  const potion = await Potion.findById(req.params.id)
    .populate("category")
    .exec();

  if (potion === null) {
    const err = new Error("Potion not found");
    err.status = 404;
    return next(err);
  }

  res.render("potion_detail", { title: potion.name, potion: potion });
});

exports.potion_create_get = asyncHandler(async (req, res, next) => {
  res.render("form", { title: "Create New Potion" });
});

exports.potion_create_post = [
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
    const category = await Category.find({ name: "Potion" });
    console.log("category: " + category);
    const potion = new Potion({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
      category: category,
    });

    if (!errors.isEmpty()) {
      res.render("form", {
        title: "Create New Potion",
        potion: potion,
        errors: errors.array(),
      });
    } else {
      await potion.save();
      console.log("saved");
      res.redirect(potion.url);
    }
  }),
];

exports.potion_delete_get = asyncHandler(async (req, res, next) => {
  const potion = await Potion.findById(req.params.id).exec();

  if (potion === null) {
    res.redirect("/inventory/potion");
  }

  res.render("delete", { title: "Delete Potion", item: potion });
});

exports.potion_delete_post = asyncHandler(async (req, res, next) => {
  await Potion.findByIdAndDelete(req.body.itemid);
  res.redirect("/inventory/potions");
});

exports.potion_update_get = asyncHandler(async (req, res, next) => {
  const potion = await Potion.findById(req.params.id).exec();

  if (potion === null) {
    res.redirect("/inventory/books");
  }

  res.render("form", { title: "Update Potion", item: potion });
});

exports.potion_update_post = [
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
    const category = await Category.find({ name: "Potion" });

    const potion = new Potion({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
      category: category,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      res.render("form", {
        title: "Update Potion",
        item: potion,
        errors: errors.array(),
      });
    } else {
      const updatedItem = await Potion.findByIdAndUpdate(
        req.params.id,
        potion,
        {},
      );
      res.redirect(potion.url);
    }
  }),
];
