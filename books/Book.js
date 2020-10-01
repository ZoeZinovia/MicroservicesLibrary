var mongoose = require("mongoose");

//Book Model

module.exports = mongoose.model("Book", {
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    pages: {
        type: Number,
        required: false
    },
    publisher: {
        type: String,
        required: false
    }
});