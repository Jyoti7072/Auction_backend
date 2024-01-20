const Form = require("../Models/Form")

exports.addForm = async(req, res) => {


    try {
        const _form = new Form(req.body);
        await _form.save()
        res.status(201).json({ message: "Your form is submitted!" })
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error Occured" })
    }
}