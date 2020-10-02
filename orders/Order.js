var mongoose = require("mongoose");

//Order Model//

module.exports = mongoose.model("Order", {
    customerID: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    bookID: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    OrderDate: {
        type: Date,
        required: true
    },
    deliveryDate: {
        type: String,
        required: true
    }
});