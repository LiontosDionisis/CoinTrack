const express = require("express");
const User = require("../model/user.model");
const router = express.Router();

userController = require("../controller/user.controller");



router.post("/getIncome", userController.getIncome)
router.post("/signup", userController.create);
router.post("/login", userController.login);
router.post("/addIncome", userController.addIncome);
router.delete("/:username", userController.delete);

module.exports = router