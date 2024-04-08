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