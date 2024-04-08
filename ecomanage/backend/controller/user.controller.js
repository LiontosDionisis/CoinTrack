const user = require("../model/user.model");

exports.create = async(req, res) => {
    const newUser = new user({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    })

    try {
        console.log("Create a user");
        const result = await newUser.save();
        res.status(200).json({data: result});
        console.log("User inserted")
    } catch (err) {
        res.status(500).json({data: err});
        console.log("Error", err)
    }
}