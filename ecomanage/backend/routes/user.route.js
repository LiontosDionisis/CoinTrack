const express = require("express");
const router = express.Router();

userController = require("../controller/user.controller");




router.post("/signup", userController.create);
router.post("/:username/addIncome", userController.addIncome)
router.post("/:username/addExpense", userController.addExpense)
router.delete("/:username", userController.delete)

module.exports = router