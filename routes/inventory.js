const express = require("express");
const router = express.Router();
const book_controller = require("../controllers/bookController");
const broom_controller = require("../controllers/broomController");
const clothing_controller = require("../controllers/clothingController");
const creature_controller = require("../controllers/creatureController");
const potion_controller = require("../controllers/potionController");
const wand_controller = require("../controllers/wandController");

//Create book GET and POST requests
router.get("/book/create", book_controller.book_create_get);
router.post("/book/create", book_controller.book_create_post);

//Delete book GET and POST requests
router.get("/book/:id/delete", book_controller.book_delete_get);
router.post("/book/:id/delete", book_controller.book_delete_post);

//Update book GET and POST requests
router.get("/book/:id/update", book_controller.book_update_get);
router.post("/book/:id/update", book_controller.book_update_post);

//GET for single book and all books
router.get("/book/:id", book_controller.book_detail);
router.get("/books", book_controller.book_list);

//Create broom GET and POST requests
router.get("/broom/create", broom_controller.broom_create_get);
router.post("/broom/create", broom_controller.broom_create_post);

//Delete broom GET and POST requests
router.get("/broom/:id/delete", broom_controller.broom_delete_get);
router.post("/broom/:id/delete", broom_controller.broom_delete_post);

//Update broom GET and POST requests
router.get("/broom/:id/update", broom_controller.broom_update_get);
router.post("/broom/:id/update", broom_controller.broom_update_post);

//GET for single broom and all brooms
router.get("/broom/:id", broom_controller.broom_detail);
router.get("/brooms", broom_controller.broom_list);

//Create clothing GET and POST requests
router.get("/clothing/create", clothing_controller.clothing_create_get);
router.post("/clothing/create", clothing_controller.clothing_create_post);

//Delete clothing GET and POST requests
router.get("/clothing/:id/delete", clothing_controller.clothing_delete_get);
router.post("/clothing/:id/delete", clothing_controller.clothing_delete_post);

//Update clothing GET and POST requests
router.get("/clothing/:id/update", clothing_controller.clothing_update_get);
router.post("/clothing/:id/update", clothing_controller.clothing_update_post);

//GET for clothing book and all clothing
router.get("/clothing/:id", clothing_controller.clothing_detail);
router.get("/clothing", clothing_controller.clothing_list);

//Create creature GET and POST requests
router.get("/creature/create", creature_controller.creature_create_get);
router.post("/creature/create", creature_controller.creature_create_post);

//Delete creature GET and POST requests
router.get("/creature/:id/delete", creature_controller.creature_delete_get);
router.post("/creature/:id/delete", creature_controller.creature_delete_post);

//Update creature GET and POST requests
router.get("/creature/:id/update", creature_controller.creature_update_get);
router.post("/creature/:id/update", creature_controller.creature_update_post);

//GET for single creature and all creatures
router.get("/creature/:id", creature_controller.creature_detail);
router.get("/creatures", creature_controller.creature_list);

//Create potion GET and POST requests
router.get("/potion/create", potion_controller.potion_create_get);
router.post("/potion/create", potion_controller.potion_create_post);

//Delete potion GET and POST requests
router.get("/potion/:id/delete", potion_controller.potion_delete_get);
router.post("/potion/:id/delete", potion_controller.potion_delete_post);

//Update potion GET and POST requests
router.get("/potion/:id/update", potion_controller.potion_update_get);
router.post("/potion/:id/update", potion_controller.potion_update_post);

//GET for single potion and all potions
router.get("/potion/:id", potion_controller.potion_detail);
router.get("/potion", potion_controller.potion_list);

//Create wand GET and POST requests
router.get("/wand/create", wand_controller.wand_create_get);
router.post("/wand/create", wand_controller.wand_create_post);

//Delete wand GET and POST requests
router.get("/wand/:id/delete", wand_controller.wand_delete_get);
router.post("/wand/:id/delete", wand_controller.wand_delete_post);

//Update book GET and POST requests
router.get("/wand/:id/update", wand_controller.wand_update_get);
router.post("/wand/:id/update", wand_controller.wand_update_post);

//GET for single book and all books
router.get("/wand/:id", wand_controller.wand_detail);
router.get("/wands", wand_controller.wand_list);
