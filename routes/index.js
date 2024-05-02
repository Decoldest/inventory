var express = require("express");
var router = express.Router();
const category_controller = require("../controllers/categoryController");

//GET category homepage
router.get("/", category_controller.index);

module.exports = router;
