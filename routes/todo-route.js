const express = require("express");

const todoController = require("../controller/todo-controller");
const authenticateMiddleware = require("../middleware/authenticate");

const router = express.Router();

//before create todo has to pass though authenticateMiddleware
//Path: use NO NEED to put path on it "/"
//if we dont write next() in authenticate.js will not run to next function.
router.use(authenticateMiddleware);
//Path : post,get ... NEED to put "/" w/ path
router.post("/", todoController.createTodo);

router.get("/", todoController.getAllTodo);

module.exports = router;
