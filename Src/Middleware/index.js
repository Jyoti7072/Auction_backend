const { check } = require("express-validator")
const { validationResult } = require("express-validator")

exports.validateForm = [
    check("namee").notEmpty().withMessage("Please Enter Name"),
    check("phoneNumber").isMobilePhone().withMessage("Please Enter phone Number"),
    check("email").isEmail().withMessage("Please Enter Email"),
    check("intrest").notEmpty().withMessage("Please Enter Intrest"),
    check("message").isLength({ max: 100, min: 1 }).withMessage("Please Enter message"),

]

exports.isValidated = (req, res, next) => {
    const errors = validationResult(req)

    if (errors.array().length > 0) {
        return res.status(400).json({ message: errors.array()[0] })
    }
    next()
}