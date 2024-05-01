const Broom = require("../models/broom");
const asyncHandler = require("express-async-handler");

exports.broom_list = asyncHandler(async (req, res, next) => {
  const brooms = await Broom.find({}, "name price").sort({ name: 1 }).exec();

  res.render("broom_list", { title: "All Brooms", broom_list: brooms });
});

exports.broom_detail = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented: broom details");
});

exports.broom_create_get = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented: broom create get");
});

exports.broom_create_post = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented: broom create post");
});

exports.broom_delete_get = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented: broom delete get");
});

exports.broom_delete_post = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented: broom delete post");
});

exports.broom_update_get = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented: broom update get");
});

exports.broom_update_post = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented: broom update post");
});
