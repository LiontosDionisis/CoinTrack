const express = require("express");
const router = express.Router();

userController = require("../controller/user.controller");




router.post("/signup", userController.create);
router.post("/login", userController.login);
router.post("/addIncome", userController.addIncome);
router.delete("/:username", userController.delete);

module.exports = router