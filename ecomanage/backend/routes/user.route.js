const express = require("express");
const User = require("../model/user.model");
const router = express.Router();

userController = require("../controller/user.controller");

router.post("/updateEmail", userController.updateEmail);
router.post("/updatePassword", userController.updatePassword);
router.post("/updateUsername", userController.updateUsername);
router.post("/updateName", userController.updateName);
router.post("/getWallet", userController.getWallet);
router.post("/getExpenses", userController.getExpenses)
router.post("/getIncome", userController.getIncome);
router.post("/addExpense", userController.addExpense);
router.post("/signup", userController.create);
router.post("/login", userController.login);
router.post("/addIncome", userController.addIncome);
router.delete("/delete/:userId", userController.delete);

module.exports = router