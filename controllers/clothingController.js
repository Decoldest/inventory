const Clothing = require("../models/clothing");
const asyncHandler = require("express-async-handler");

exports.clothing_list = asyncHandler(async (req, res, next) => {
  const clothing = await Clothing.find({}, "name price")
    .sort({ name: 1 })
    .exec();

  res.render("clothing_list", {
    title: "All Clothing",
    clothing_list: clothing,
  });
});

exports.clothing_detail = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented: clothing details");
});

exports.clothing_create_get = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented: clothing create get");
});

exports.clothing_create_post = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented: clothing create post");
});

exports.clothing_delete_get = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented: clothing delete get");
});

exports.clothing_delete_post = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented: clothing delete post");
});

exports.clothing_update_get = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented: clothing update get");
});

exports.clothing_update_post = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented: clothing update post");
});
