var express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser");

app.use(bodyParser.json());

//-----Database setup-----//

const Customer = require("./Customer.js");
const dotenv = require("dotenv");
dotenv.config();

mongoose.connect("mongodb+srv://" + process.env.DB_USERNAME +":" + process.env.DB_PASSWORD + "@cluster0.flz5m.mongodb.net/"+process.env.DB_NAME+"?retryWrites=true&w=majority", {useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true}, function(){
    console.log("Connected to database!");
});

//-----Server setup-----//

app.listen(8787, function(err){
    if(err) console.log(err);
    console.log("Server started on port 8787")
});

//-----Customer Functionality-----//

//Root Page//

app.get("/", function(req, res){
    res.send("This is the root page for customers");
});

//Create Customer//

app.post("/customer", function(req, res){
    var newCustomer = {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age
    }

    Customer.create(newCustomer, function(err, newCustomer){
        if(err)
        {
            console.log(err);
            res.send("Problem encountered");
        }
        newCustomer.save();
        console.log(newCustomer);
    });
    res.send("New customer added");
});

//List Customers//

app.get("/customers", function(req, res){
    Customer.find({}, function(err, customers){
        if(err)
        {
            console.log(err);
            res.send("Problem encountered");
        }
        res.json(customers);
    })
});

//Find one customer//

app.get("/customer/:id", function(req, res){
    Customer.findById(req.params.id, function(err, customer){
        if(err)
        {
            console.log(err);
            res.send("Problem encountered");
        }
        res.json(customer);
    });
});

//Delete customer//

app.delete("/customer/:id", function(req, res){
    Customer.findByIdAndDelete(req.params.id, function(err, customer){
        if(err)
        {
            console.log(err);
            res.send("Problem encountered");
        }
        res.send("Customer deleted");
    });
});