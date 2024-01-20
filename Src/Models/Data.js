const mongoose = require("mongoose")


const Data = new mongoose.Schema({
    name: {
        type: String,
        required: true

    },
    phone: {
        type: Number,
        required: true

    },
    email: {
        type: String,
        required: true,
        unique: true

    },

    password: {
        type: String,
        required: true
    }


})



module.exports = mongoose.model("Data", Data);