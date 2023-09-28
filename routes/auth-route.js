const express = require("express");
const authController = require("../controller/auth-controller");
const router = express.Router();

//Register route run to authController
router.post("/register", authController.register);
router.post("/login", authController.login);
module.exports = router;
