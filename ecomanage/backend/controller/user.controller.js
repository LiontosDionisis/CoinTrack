const User = require("../model/user.model");
const {registerValidation, loginValidation} = require("./validation")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.JWT_SECRET;



exports.login = async(req, res) => {
  const {username, password} = req.body;

  try {
    // Check if the username exists in the database
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'Username not found' });
    }

    // Verify the password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });

    // Send the token back in the response
    res.status(200).json({ token });
  } catch (error) {
    console.error('Login failed:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


exports.create = async (req, res) => {
  // Validate user input
  const { error } = registerValidation(req.body);
  if (error) {
      return res.status(400).json({ error: error.details[0].message });
  }

  try {
      // Check if email already exists
      const emailExists = await User.findOne({ email: req.body.email });
      if (emailExists) {
          return res.status(400).json({ error: 'Email already exists' });
      }

      // Check if username already exists
      const usernameExists = await User.findOne({ username: req.body.username });
      if (usernameExists) {
          return res.status(400).json({ error: 'Username already taken' });
      }
      
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      // Create a new user
      const newUser = new User({
          name: req.body.name,
          username: req.body.username,
          password: hashedPassword,
          email: req.body.email
      });

      // Save the user to the database
      const savedUser = await newUser.save();
      res.status(200).json({ data: savedUser });
  } catch (err) {
      console.error('Error creating user:', err);
      res.status(500).json({ error: 'Internal server error' });
  }
};



exports.delete = async(req, res) => {
    const username = req.params.username;

    try {
        const usernameExists = await User.findOne({username: req.params.username});
        if(!usernameExists) return res.status(404).send("Username not found")
        const result = await User.findOneAndDelete({username: username})
        res.status(200).json({data:result});
        console.log("User deleted");
    } catch(err) {
        res.status(404).json({data: err});
    }
}

exports.getIncome = async(req, res) => {
  const {username} = req.body;

  try {
    const user= await User.findOne({username:username});
    if (!user) return res.status(404).send("User not found");
    res.status(200).json({totalIncome: user.totalIncome});
    console.log("Get income");
  } catch (err) {
    res.status(500).json({data: err});
    console.log("Error appeared");
  }
}

exports.addIncome = async (req, res) => {
    const username = req.params.username; 
    const { amount } = req.body; 
  
    try {
      // Validate the income amount
      if (!amount || isNaN(amount) || amount <= 0) {
        return res.status(400).json({ error: "Invalid income amount" });
      }
  
      // Find the user by username
      const user = await User.findOne({username: username});
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // Update the user's total income
      user.totalIncome += parseFloat(amount);
      await user.save();
  
      // Return a success response
      return res.status(200).json({ message: "Income added successfully", data: user });
    } catch (error) {
      // Handle any errors
      console.error("Error adding income:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

  exports.addExpense = async(req, res) => {
    const username = req.params.username;
    const {amount} = req.body;

    try {
        if (!amount || isNaN(amount) || amount <= 0) {
            return res.status(400).json({error: "Invalid  amount"});
        }
        const user = await User.findOne({username: username});
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      // Update the user's total income
      user.totalExpenses += parseFloat(amount);
      await user.save();
  
      // Return a success response
      return res.status(200).json({ message: "Expenses added successfully", data: user });
    } catch (error) {
      // Handle any errors
      console.error("Error adding expenses:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    }
  

    exports.calculateWallet = async (req, res) => {
        const username = req.params.username; 
      
        try {
          // Find the user by username
          const user = await User.findOne({ username: username });
          if (!user) {
            return res.status(404).json({ error: "User not found" });
          }
          
          // Calculate net income (total income - total expenses)
          const wallet = user.totalIncome - user.totalExpenses;
          
          // Return the net income to the client
          return res.status(200).json({ wallet: wallet });
        } catch (error) {
          // Handle any errors
          console.error("Error calculating wallet:", error);
          return res.status(500).json({ error: "Internal Server Error" });
        }
    };
    
  