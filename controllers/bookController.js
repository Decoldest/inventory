const Book = require("../models/book");
const asyncHandler = require("express-async-handler");

exports.book_list = asyncHandler(async (req, res, next) => {
  const books = await Book.find({}, "name price").sort({ name: 1 }).exec();

  res.render("book_list", { title: "All Books", book_list: books });
});

exports.book_detail = asyncHandler(async (req, res, next) => {
  const book = await Book.findById(req.params.id).populate("genre").exec();

  if(book === null){
    
  }

  res.render("book_detail", { title: book.name, book: book });
});

exports.book_create_get = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented: book create get");
});

exports.book_create_post = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented: book create post");
});

exports.book_delete_get = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented: book delete get");
});

exports.book_delete_post = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented: book delete post");
});

exports.book_update_get = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented: book update get");
});

exports.book_update_post = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented: book update post");
});
