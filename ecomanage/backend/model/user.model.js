const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {type: String, min: 3 , max: 20, required: true},
    username: {type: String, min: 6, max: 20, required: true},
    password: {type: String, min: 6, max: 1024, required: true},
    email: {type: String, min: 6, max: 255, required: true},
    totalIncome: {type: Number, default: 0, required: false},
    totalExpenses: {type: Number, default: 0},
    wallet: {type: Number, default: 0},
})

const User = mongoose.model("User", userSchema);

module.exports = User;