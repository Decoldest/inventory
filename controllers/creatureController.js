const Creature = require("../models/creature");
const asyncHandler = require("express-async-handler");

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
  const creature = await Creature.findById(req.params.id).populate("category").exec();

  if (creature === null) {
    const err = new Error("Creature not found");
    err.status = 404;
    return next(err);
  }

  res.render("creature_detail", { title: creature.name, creature: creature });});

exports.creature_create_get = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented: creature create get");
});

exports.creature_create_post = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented: creature create post");
});

exports.creature_delete_get = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented: creature delete get");
});

exports.creature_delete_post = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented: creature delete post");
});

exports.creature_update_get = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented: creature update get");
});

exports.creature_update_post = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented: creature update post");
});
