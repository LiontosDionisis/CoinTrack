const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  source: { type: String, required: false },
  createdAt: { type: Date, default: Date.now }
});

const expenseSchema = new mongoose.Schema({
  amount: {type: Number, required: true},
  source: {type: String, required: false},
  createdAt: { type: Date, default: Date.now }
})



const userSchema = new mongoose.Schema({
  name: { type: String, min: 3, max: 20, required: true },
  username: { type: String, min: 6, max: 20, required: true },
  password: { type: String, min: 6, max: 1024, required: true },
  email: { type: String, min: 6, max: 255, required: true },
  totalIncome: { type: Number, default: 0 },
  totalExpenses: { type: Number, default: 0 },
  wallet: { type: Number, default: 0 },
  incomeTransactions: [incomeSchema],
  expensesTransactions: [expenseSchema],
});

userSchema.pre('save', function (next) {
  this.wallet = this.totalIncome - this.totalExpenses;
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
