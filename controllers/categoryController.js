const Category = require("../models/category");
const Book = require("../models/book");
const Broom = require("../models/broom");
const Clothing = require("../models/clothing");
const Creature = require("../models/creature");
const Potion = require("../models/potion");
const Wand = require("../models/wand");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  const [
    bookCount,
    broomCount,
    clothingCount,
    creatureCount,
    potionCount,
    wandCount,
  ] = await Promise.all([
    Book.countDocuments({}).exec(),
    Broom.countDocuments({}).exec(),
    Clothing.countDocuments({}).exec(),
    Creature.countDocuments({}).exec(),
    Potion.countDocuments({}).exec(),
    Wand.countDocuments({}).exec(),
  ]);

  const total_inventory =
    bookCount +
    broomCount +
    clothingCount +
    creatureCount +
    potionCount +
    wandCount;

  const allCategories = await Category.find().sort({ name: 1 }).exec();

  res.render("category_index", {
    title: "Welcome to The Shop",
    total_inventory: total_inventory,
    category_list: allCategories,
  });
});

exports.category_detail = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented: category details");
});

exports.category_create_get = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented: category create get");
});

exports.category_create_post = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented: category create post");
});

exports.category_delete_get = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented: category delete get");
});

exports.category_delete_post = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented: category delete post");
});

exports.category_update_get = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented: category update get");
});

exports.category_update_post = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented: category update post");
});
