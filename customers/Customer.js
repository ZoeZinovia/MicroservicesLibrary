var mongoose = require("mongoose");

//Customer Model//

module.exports = mongoose.model("Customer", {
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    }
});
