var express = require('express');
var router = express.Router();
const category_controller = require("../controllers/categoryController");

//GET category homepage
router.get("/", category_controller.index);

//Create category GET and POST requests
router.get("/category/create", category_controller.category_create_get);
router.get("/category/create", category_controller.category_create_post);

//Delete category GET and POST requests
router.get("/category/:id/delete", category_controller.category_delete_get);
router.get("/category/:id/delete", category_controller.category_delete_post);

//Update category GET and POST requests
router.get("/category/:id/update", category_controller.category_update_get);
router.get("/category/:id/update", category_controller.category_update_post);

//GET for single category and all categories
router.get("/category/:id", category_controller.category_detail);
// router.get("/categories", category_controller.category_list);

module.exports = router;
