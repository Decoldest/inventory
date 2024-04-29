const Creature = require("../models/category");
const asyncHandler = require("express-async-handler");

exports.creature_list = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented: creature list");
});

exports.creature_detail = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented: creature details");
});

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
