const User = require("../model/user.model");
const {registerValidation, loginValidation} = require("./validation")


exports.create = async(req, res) => { 
    const newUser = new User({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    })

    try {
        const {error} = await registerValidation(req.body);
        if (error) {
            res.status(400).json({error: error});
        }
        // Check if email exists
        const emailExists = await User.findOne({email: req.body.email});
        if(emailExists) return res.status(400).send("Email already exists")

        // Check if username exists
        const usernameExists = await User.findOne({username: req.body.username });
        if(usernameExists) return res.status(400).send("Username already taken");
        
        // User Registration
        console.log("Create a user");
        const result = await newUser.save();
        res.status(200).json({data: result});
        console.log("User inserted")
    } catch (err) {
        //res.send(error.details[0].message);
        res.status(500).json({data: err});
        console.log("Error", err)
    }
}

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

exports.addIncome = async (req, res) => {
    const userId = req.params.userId; 
    const { amount } = req.body; 
  
    try {
      // Validate the income amount
      if (!amount || isNaN(amount) || amount <= 0) {
        return res.status(400).json({ error: "Invalid income amount" });
      }
  
      // Find the user by ID
      const user = await User.findById(userId);
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
  