const Potion = require("../models/potion");
const asyncHandler = require("express-async-handler");

exports.potion_list = asyncHandler(async (req, res, next) => {
  const potions = await Potion.find({}, "name price").sort({ name: 1 }).exec();

  res.render("potion_list", {
    title: "All Potions",
    potion_list: potions,
  });
});

exports.potion_detail = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented: potion details");
});

exports.potion_create_get = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented: potion create get");
});

exports.potion_create_post = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented: potion create post");
});

exports.potion_delete_get = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented: potion delete get");
});

exports.potion_delete_post = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented: potion delete post");
});

exports.potion_update_get = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented: potion update get");
});

exports.potion_update_post = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented: potion update post");
});
