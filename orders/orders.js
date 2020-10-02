var express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    request = require("request");

app.use(bodyParser.json());

//-----Database setup-----//

const Order = require("./Order.js");
const dotenv = require("dotenv");
dotenv.config();

mongoose.connect("mongodb+srv://" + process.env.DB_USERNAME +":" + process.env.DB_PASSWORD + "@cluster0.flz5m.mongodb.net/"+process.env.DB_NAME+"?retryWrites=true&w=majority", {useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true}, function(){
    console.log("Connected to database!");
});

//-----Server setup-----//

app.listen(8888, function(err){
    if(err) console.log(err);
    console.log("Server started on port 8888")
});

//-----Orders Functionality-----//