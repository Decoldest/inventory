#! /usr/bin/env node

console.log(
  'This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"',
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);
console.log(userArgs);
const categories = [];

const Category = require("./models/category");
const Book = require("./models/book");
const Broom = require("./models/broom");
const Clothing = require("./models/clothing");
const Creature = require("./models/creature");
const Potion = require("./models/potion");
const Wand = require("./models/wand");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createCategories();
  await createBooks();
  await createBrooms();
  await createClothing();
  await createCreatures();
  await createPotions();
  await createWands();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function categoryCreate(index, name) {
  const category = new Category({ name: name });
  await category.save();
  categories[index] = category;
  console.log(`Added genre: ${name}`);
}

async function bookCreate(name, description, price, category, stock) {
  const book = new Book({
    name: name,
    description: description,
    price: price,
    category: category,
    stock: stock,
  });

  console.log("book " + book);
  await book.save();
  console.log(`Added book: ${name}`);
}

async function broomCreate(name, description, price, category, stock) {
  const broom = new Broom({
    name: name,
    description: description,
    price: price,
    category: category,
    stock: stock,
  });
  await broom.save();
  console.log(`Added broom: ${name}`);
}

async function clothingCreate(name, description, price, category, stock) {
  const clothing = new Clothing({
    name: name,
    description: description,
    price: price,
    category: category,
    stock: stock,
  });
  await clothing.save();
  console.log(`Added clothing: ${name}`);
}

async function creatureCreate(name, description, price, category, stock) {
  const creature = new Creature({
    name: name,
    description: description,
    price: price,
    category: category,
    stock: stock,
  });
  await creature.save();
  console.log(`Added creature: ${name}`);
}

async function potionCreate(name, description, price, category, stock) {
  const potion = new Potion({
    name: name,
    description: description,
    price: price,
    category: category,
    stock: stock,
  });
  await potion.save();
  console.log(`Added potion: ${name}`);
}

async function wandCreate(name, description, price, category, stock) {
  const wand = new Wand({
    name: name,
    description: description,
    price: price,
    category: category,
    stock: stock,
  });
  await wand.save();
  console.log(`Added wand: ${name}`);
}

async function createCategories() {
  console.log("adding genres");
  await Promise.all([
    categoryCreate(0, "Book"),
    categoryCreate(1, "Broom"),
    categoryCreate(2, "Clothing"),
    categoryCreate(3, "Creature"),
    categoryCreate(4, "Potion"),
    categoryCreate(5, "Wand"),
  ]);
}

async function createBooks() {
  console.log("adding books");
  await Promise.all([
    bookCreate(
      "A Dragon Keeper's Guide",
      "Learn everything there is about raising and keeping a dragon.",
      10,
      categories[0],
      15,
    ),
    bookCreate(
      "Owl Breeds",
      "Compendium of Owl Breeds in North America (Updated edition).",
      12,
      categories[0],
      10,
    ),
  ]);
}

async function createBrooms() {
  console.log("adding brooms");
  await Promise.all([
    broomCreate(
      "Nimbus 2000",
      "Produced by the Nimbus Racing Broom Company as part of their successful line of racing brooms. Released in 1991.",
      100,
      categories[1],
      5,
    ),
    broomCreate(
      "Nimbus 2001",
      "Produced by the Nimbus Racing Broom Company as a sucessor to the Nimbus 2000. Released in 1992.",
      120,
      categories[1],
      4,
    ),
    broomCreate(
      "Firebolt",
      "Top of the line broom capable of going from nought to one hundred and fifty miles per hour in ten seconds.",
      200,
      categories[1],
      1,
    ),
  ]);
}

async function createClothing() {
  console.log("adding clothing");
  await Promise.all([
    clothingCreate(
      "Classic Robe",
      "Standard issue robe. 100% cotton.",
      12,
      categories[2],
      50,
    ),
    clothingCreate(
      "Invisibility Cloak",
      "Wear this to hide from your enemies.",
      100,
      categories[2],
      1,
    ),
    clothingCreate(
      "Glasses",
      "Ugly glasses that were never in style.",
      5,
      categories[2],
      12,
    ),
  ]);
}

async function createCreatures() {
  console.log("adding creatures");
  await Promise.all([
    creatureCreate(
      "Hippogriff",
      "A proud animal with front legs, wings, and head of a giant eagle and the body, and hind legs and tail of a horse",
      500,
      categories[3],
      6,
    ),
    creatureCreate(
      "Grindylow",
      "A small, horned, pale-green skinned water demon native to Great Britain and Ireland.",
      20,
      categories[3],
      40,
    ),
    creatureCreate(
      "Basilisk",
      "Of the many fearsome beasts and monsters that roam our land, there is none more curious or more deadly than the Basilisk, known also as the King of Serpents.",
      1000,
      categories[3],
      1,
    ),
  ]);
}

async function createPotions() {
  console.log("adding potions");
  await Promise.all([
    potionCreate(
      "Love Potion",
      "Causes the drinker to become infatuated or obsessed with the person who gave it to them",
      5,
      categories[4],
      100,
    ),
    potionCreate(
      "Felix Felicis",
      "A potion that makes the drinker lucky for a period of time, during which everything they attempt is successful.",
      7,
      categories[4],
      7,
    ),
    potionCreate(
      "Polyjuice Potion",
      "A potion that allows the drinker to assume the form of someone else. Tastes like goblin piss.",
      12,
      categories[4],
      7,
    ),
  ]);
}

async function createWands() {
  console.log("adding wands");
  await Promise.all([
    wandCreate(
      "Elder Wands",
      "One of three magical objects that make up the fabled Deathly Hallows, along with the Resurrection Stone and the Cloak of Invisibility.",
      1000,
      categories[5],
      1,
    ),
    wandCreate(
      "Hagrid's Pink Umbrella",
      "An umbrella owned by Rubeus Hagrid in which he concealed the pieces of his broken wand.",
      100,
      categories[5],
      1,
    ),
    wandCreate(
      "Ron's Broken Wand",
      "An old wand that causes the user to eat slugs.",
      2,
      categories[5],
      1,
    ),
  ]);
}
