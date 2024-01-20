const Data = require("../Models/Data")
const jwt = require("jsonwebtoken")

exports.register = async(req, res) => {

    const { name, phone, email, password, } = req.body;

    const _user = new Data({
        name,
        email,
        phone,
        password,

    });
    console.log(password)
    const eUser = await Data.findOne({ email });

    if (!eUser) {
        _user.save()
            .then(newUser => {
                return res.status(201).json({ message: "Account created successfully" });
            })
            .catch(error => {
                res.status(400).json({ message: "Error Occured", error });
            });
    } else {
        return res.status(400).json({
            message: "User already exist"
        });
    }


}

exports.login = async(req, res) => {
    const { email, password } = req.body;
    const eUser = await Data.findOne({ email });

    if (eUser) {
        if (eUser.authenticate(password)) {
            const token = jwt.sign({
                id: eUser._id
            }, "MYSECRET", {
                expiresIn: "24h"
            })
            return res.status(200).json({
                message: "Logged in successfully!",
                token,
                isSuccess: true
            })
        } else
            return res.status(401).json({
                message: "Password is incorrect"
            })



    } else {
        return res.status(404).json({
            message: "User not found! Please sign up"
        });
    }
}