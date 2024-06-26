const Broom = require("../models/broom");
const Category = require("../models/category");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.broom_list = asyncHandler(async (req, res, next) => {
  const brooms = await Broom.find({}, "name price").sort({ name: 1 }).exec();

  res.render("broom_list", { title: "All Brooms", broom_list: brooms });
});

exports.broom_detail = asyncHandler(async (req, res, next) => {
  const broom = await Broom.findById(req.params.id).populate("category").exec();

  if (broom === null) {
    const err = new Error("Broom not found");
    err.status = 404;
    return next(err);
  }

  res.render("broom_detail", { title: broom.name, broom: broom });
});

exports.broom_create_get = asyncHandler(async (req, res, next) => {
  res.render("form", { title: "Create New Broom" });
});

exports.broom_create_post = [
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
    const category = await Category.find({ name: "Broom" });
    console.log("category: " + category);
    const broom = new Broom({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
      category: category,
    });

    if (!errors.isEmpty()) {
      res.render("form", {
        title: "Create New Broom",
        broom: broom,
        errors: errors.array(),
      });
    } else {
      await broom.save();
      console.log("saved");
      res.redirect(broom.url);
    }
  }),
];

exports.broom_delete_get = asyncHandler(async (req, res, next) => {
  const broom = await Broom.findById(req.params.id).exec();

  if (broom === null) {
    res.redirect("/inventory/broom");
  }

  res.render("delete", { title: "Delete Broom", item: broom });
});

exports.broom_delete_post = [
  body("password", "Password incorrect").equals("secret_password"),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const broom = await Broom.findById(req.params.id).exec();

    if (broom === null) {
      res.redirect("/inventory/books");
    }
    if (!errors.isEmpty()) {
      res.render("delete", {
        title: "Delete Broom",
        item: broom,
        errors: errors.array(),
        password: true,
      });
    } else {
      await Broom.deleteOne(broom);
      res.redirect("/inventory/brooms");
    }
  }),
];

exports.broom_update_get = asyncHandler(async (req, res, next) => {
  const broom = await Broom.findById(req.params.id).exec();

  if (broom === null) {
    res.redirect("/inventory/books");
  }

  res.render("form", { title: "Update Broom", item: broom });
});

exports.broom_update_post = [
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
  body("password", "Password incorrect").equals("secret_password"),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const category = await Category.find({ name: "Broom" });

    const broom = new Broom({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
      category: category,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      res.render("form", {
        title: "Update Broom",
        item: broom,
        errors: errors.array(),
      });
    } else {
      const updatedItem = await Broom.findByIdAndUpdate(
        req.params.id,
        broom,
        {},
      );
      res.redirect(updatedItem.url);
    }
  }),
];
