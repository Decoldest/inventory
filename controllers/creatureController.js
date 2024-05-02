const Creature = require("../models/creature");
const Category = require("../models/category");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.creature_list = asyncHandler(async (req, res, next) => {
  const creatures = await Creature.find({}, "name price")
    .sort({ name: 1 })
    .exec();

  res.render("creature_list", {
    title: "All Creatures",
    creature_list: creatures,
  });
});

exports.creature_detail = asyncHandler(async (req, res, next) => {
  const creature = await Creature.findById(req.params.id)
    .populate("category")
    .exec();

  if (creature === null) {
    const err = new Error("Creature not found");
    err.status = 404;
    return next(err);
  }

  res.render("creature_detail", { title: creature.name, creature: creature });
});

exports.creature_create_get = asyncHandler(async (req, res, next) => {
  res.render("form", { title: "Create New Creature" });
});

exports.creature_create_post = [
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
    const category = await Category.find({ name: "Creature" });
    console.log("category: " + category);
    const creature = new Creature({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
      category: category,
    });

    if (!errors.isEmpty()) {
      res.render("form", {
        title: "Create New Creature",
        creature: creature,
        errors: errors.array(),
      });
    } else {
      await creature.save();
      console.log("saved");
      res.redirect(creature.url);
    }
  }),
];

exports.creature_delete_get = asyncHandler(async (req, res, next) => {
  const creature = await Creature.findById(req.params.id).exec();

  if (creature === null) {
    res.redirect("/inventory/creature");
  }

  res.render("delete", { title: "Delete Creature", item: creature });
});

exports.creature_delete_post = asyncHandler(async (req, res, next) => {
  await Creature.findByIdAndDelete(req.body.itemid);
  res.redirect("/inventory/creatures");
});

exports.creature_update_get = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented: creature update get");
});

exports.creature_update_post = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented: creature update post");
});
