const express = require("express");
const router = express.Router();

userController = require("../controller/user.controller");




router.post("/signup", userController.create);
router.delete("/:username", userController.delete)

module.exports = router