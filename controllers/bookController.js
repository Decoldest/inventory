const Book = require("../models/book");
const Category = require("../models/category");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.book_list = asyncHandler(async (req, res, next) => {
  const books = await Book.find({}, "name price").sort({ name: 1 }).exec();

  res.render("book_list", { title: "All Books", book_list: books });
});

exports.book_detail = asyncHandler(async (req, res, next) => {
  const book = await Book.findById(req.params.id).populate("category").exec();

  if (book === null) {
    const err = new Error("Book not found");
    err.status = 404;
    return next(err);
  }

  res.render("book_detail", { title: book.name, book: book });
});

exports.book_create_get = asyncHandler(async (req, res, next) => {
  res.render("form", { title: "Create New Book" });
});

exports.book_create_post = [
  body("name", "Name must be between 2 - 100 characters")
    .trim()
    .isLength({ min: 2, max: 100 })
    .escape(),
  body("description", "Description must be between 2 - 200 characters")
    .trim()
    .isLength({ min: 2, max: 100 })
    .escape(),
  body("price")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Price must not be empty")
    .isNumeric()
    .withMessage("Price must be a number")
    .escape(),
  body("stock")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Stock must not be empty")
    .isNumeric()
    .withMessage("Stock must be a number")
    .isInt()
    .withMessage("Stock must be an integer")
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const category = await Category.find({ name: "Book" });
    const book = new Book({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
      category: category,
    });

    if (!errors.isEmpty()) {
      res.render("form", {
        title: "Create New Book",
        item: book,
        errors: errors.array(),
      });
    } else {
      await book.save();
      console.log("saved");
      res.redirect(book.url);
    }
  }),
];

exports.book_delete_get = asyncHandler(async (req, res, next) => {
  const book = await Book.findById(req.params.id).exec();

  if (book === null) {
    res.redirect("/inventory/books");
  }

  res.render("delete", { title: "Delete Book", item: book });
});

exports.book_delete_post = asyncHandler(async (req, res, next) => {
  await Book.findByIdAndDelete(req.body.itemid);
  res.redirect("/inventory/books");
});

exports.book_update_get = asyncHandler(async (req, res, next) => {
  const book = await Book.findById(req.params.id).exec();

  if (book === null) {
    res.redirect("/inventory/books");
  }

  res.render("form", { title: "Update Book", item: book });
});

exports.book_update_post = [
  body("name", "Name must be between 2 - 100 characters")
    .trim()
    .isLength({ min: 2, max: 100 })
    .escape(),
  body("description", "Description must be between 2 - 200 characters")
    .trim()
    .isLength({ min: 2, max: 100 })
    .escape(),
  body("price")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Price must not be empty")
    .isNumeric()
    .withMessage("Price must be a number")
    .escape(),
  body("stock")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Stock must not be empty")
    .isNumeric()
    .withMessage("Stock must be a number")
    .isInt()
    .withMessage("Stock must be an integer")
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const category = await Category.find({ name: "Book" });

    const book = new Book({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
      category: category,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      res.render("form", {
        title: "Update Book",
        item: book,
        errors: errors.array(),
      });
    } else {
      const updatedItem = await Book.findByIdAndUpdate(req.params.id, book, {});
      res.redirect(book.url);
    }
  }),
];
