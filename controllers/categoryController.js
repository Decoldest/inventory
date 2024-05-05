const Category = require("../models/category");
const Book = require("../models/book");
const Broom = require("../models/broom");
const Clothing = require("../models/clothing");
const Creature = require("../models/creature");
const Potion = require("../models/potion");
const Wand = require("../models/wand");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const category = require("../models/category");

exports.index = asyncHandler(async (req, res, next) => {
  const [
    bookInventory,
    broomInventory,
    clothingInventory,
    creatureInventory,
    potionInventory,
    wandInventory,
  ] = await Promise.all([
    Book.countDocuments({}).exec(),
    Broom.countDocuments({}).exec(),
    Clothing.countDocuments({}).exec(),
    Creature.countDocuments({}).exec(),
    Potion.countDocuments({}).exec(),
    Wand.countDocuments({}).exec(),
  ]);

  const total_inventory =
    bookInventory +
    broomInventory +
    clothingInventory +
    creatureInventory +
    potionInventory +
    wandInventory;

  const [
    bookStock,
    broomStock,
    clothingStock,
    creatureStock,
    potionStock,
    wandStock,
  ] = await Promise.all([
    Book.find({}).select("stock").exec(),
    Broom.find({}).select("stock").exec(),
    Clothing.find({}).select("stock").exec(),
    Creature.find({}).select("stock").exec(),
    Potion.find({}).select("stock").exec(),
    Wand.find({}).select("stock").exec(),
  ]);

  // Function to calculate total stock for a category
  const calculateTotalStock = (inventory, stockList) => {
    return (
      stockList.reduce((total, item) => {
        return total + item.stock;
      }, 0) * inventory
    );
  };
  const allCategories = await Category.find().sort({ name: 1 }).exec();

  const totalStock =
    calculateTotalStock(bookInventory, bookStock) +
    calculateTotalStock(broomInventory, broomStock) +
    calculateTotalStock(clothingInventory, clothingStock) +
    calculateTotalStock(creatureInventory, creatureStock) +
    calculateTotalStock(potionInventory, potionStock) +
    calculateTotalStock(wandInventory, wandStock);

  res.render("category_index", {
    title: "Welcome to The Shop",
    total_inventory: total_inventory,
    total_stock: totalStock,
    category_list: allCategories,
  });
});
