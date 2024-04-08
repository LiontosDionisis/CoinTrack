const express = require("express");
const router = express.Router();

userController = require("../controller/user.controller");

router.post("/signup", userController.create);

module.exports = router