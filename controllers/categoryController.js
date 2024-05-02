const Category = require("../models/category");
const Book = require("../models/book");
const Broom = require("../models/broom");
const Clothing = require("../models/clothing");
const Creature = require("../models/creature");
const Potion = require("../models/potion");
const Wand = require("../models/wand");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

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