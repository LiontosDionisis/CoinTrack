const User = require("../model/user.model");
const {registerValidation, loginValidation} = require("./validation")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const secretKey = process.env.JWT_SECRET;



exports.updateName = async (req, res) => {
  const { userId, name } = req.body;
  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    await User.updateOne(
      { _id: userId }, 
      { $set: { name: name } }
    );

    res.status(200).json({ name });
    console.log("Name updated");
  } catch (error) {
    console.log("Error updating name:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'Username not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Incorrect password' });
    }
    name = user.name;
    totalIncome = user.totalIncome;
    totalExpenses = user.totalExpenses;
    wallet = user.wallet;

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
  
    res.status(200).json({ token, name, username, totalIncome, totalExpenses, wallet});


  } catch (error) {
    console.error('Login failed:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



exports.create = async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) {
      return res.status(400).json({ error: error.details[0].message });
  }

  try {
      const emailExists = await User.findOne({ email: req.body.email });
      if (emailExists) {
          return res.status(400).json({ error: 'Email already exists' });
      }

      const usernameExists = await User.findOne({ username: req.body.username });
      if (usernameExists) {
          return res.status(400).json({ error: 'Username already taken' });
      }
      
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const newUser = new User({
          name: req.body.name,
          username: req.body.username,
          password: hashedPassword,
          email: req.body.email
      });

      const savedUser = await newUser.save();
      res.status(200).json({ data: savedUser });
  } catch (err) {
      console.error('Error creating user:', err);
      res.status(500).json({ error: 'Internal server error' });
  }
};



exports.delete = async(req, res) => {
    const {userId} = req.body;

    try {
        const user= await User.findOne({_id: userId});
        if(!usern) return res.status(404).send("User not found")
        const result = await User.findOneAndDelete({_id: userId})
        res.status(200).json({data:result});
        console.log("User deleted");
    } catch(err) {
        res.status(404).json({data: err});
    }
}

exports.addExpense = async(req, res) => {
  const {expensesAmount, expensesSource, userId} = req.body;
  try {
    const newExpensesTransaction = {
      amount: expensesAmount,
      source: expensesSource
    }

    const user = await User.findOne({_id: userId});
    if (!user) return res.status(404).json({message: "User not found"});

    user.totalExpenses += parseFloat(expensesAmount);
    user.expensesTransactions.push(newExpensesTransaction);
    wallet = user.wallet;
    

    await user.save();

    res.status(201).json({message: "Expenses added", totalExpenses: user.totalExpenses, wallet});
  } catch (error) {
    console.log("Error adding expenses");
    res.status(500).json({message: "Internet server error"});
  }
}

exports.getWallet = async(req, res) => {
  const {userId} = req.body;
  try {
    const user = await User.findOne({_id: userId});

    if(!user) return res.status(404).json({message: "User not found"});

    wallet = user.wallet;
    res.status(200).json({wallet});
  } catch (error) {
    console.log("Error fetching wallet", error);
    res.status(500).json({message: "Error fetching wallet"})
  }
}

exports.addIncome = async(req, res) => {
  const {incomeAmount, incomeSource, userId} = req.body;
  try {
    const newIncomeTransaction = {
      amount: incomeAmount,
      source: incomeSource,
      createdAt: new Date()
    }

    const user = await User.findOne({_id: userId});
  
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    
    user.totalIncome += parseFloat(incomeAmount);
    user.incomeTransactions.push(newIncomeTransaction);
    wallet = user.wallet;
   
    

    await user.save();
    
    res.status(201).json({ message: 'Income transaction added successfully', totalIncome: user.totalIncome, wallet});

  } catch (error) {
    console.error('Error adding income transaction:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

exports.getExpenses = async(req, res) => {
  try {
    const {userId} = req.body;
    const user = await User.findOne({_id : userId});

    if (!user) return res.status(404).json({message:"User not found"});

    const expensesTransactions = user.expensesTransactions;

    res.status(200).json({expensesTransactions});
  } catch (error) {
    console.log("Error fetching expenses transactions");
    res.status(500).json({message:"Error fetching transactions"});
  }
}

exports.getIncome = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findOne({ _id : userId });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const incomeTransactions = user.incomeTransactions;
    
    res.status(200).json({ incomeTransactions });
  } catch (error) {
    console.error('Error fetching income:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


 
