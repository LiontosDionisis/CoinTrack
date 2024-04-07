const express = require("express");
const router = express.Router();

userController = require("../controller/user.controller");

router.post("/", userController.create);

module.exports = router