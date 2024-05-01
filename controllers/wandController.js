const Wand = require("../models/wand");
const asyncHandler = require("express-async-handler");

exports.wand_list = asyncHandler(async (req, res, next) => {
  const wands = await Wand.find({}, "name price").sort({ name: 1 }).exec();

  res.render("wand_list", {
    title: "All Wands",
    wand_list: wands,
  });
});

exports.wand_detail = asyncHandler(async (req, res, next) => {
  const wand = await Wand.findById(req.params.id).populate("category").exec();

  if (wand === null) {
    const err = new Error("Wand not found");
    err.status = 404;
    return next(err);
  }

  res.render("wand_detail", { title: wand.name, wand: wand });
});

exports.wand_create_get = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented: wand create get");
});

exports.wand_create_post = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented: wand create post");
});

exports.wand_delete_get = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented: wand delete get");
});

exports.wand_delete_post = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented: wand delete post");
});

exports.wand_update_get = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented: wand update get");
});

exports.wand_update_post = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented: wand update post");
});
