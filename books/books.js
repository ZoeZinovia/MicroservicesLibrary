var express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    bookModel = require("./Book.js");

app.use(bodyParser.json());

//-----Database setup-----//

const dotenv = require("dotenv");
const Book = require("./Book.js");
dotenv.config();
      
mongoose.connect("mongodb+srv://" + process.env.DB_USERNAME +":" + process.env.DB_PASSWORD + "@cluster0.flz5m.mongodb.net/<dbname>?retryWrites=true&w=majority", {useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true}, function(){
    console.log("Connected to database!");
});

//-----Server setup-----//

app.listen(8686, function(){
    console.log("Server is up and running!");
});

app.get("/", function(req, res){
    res.send("This is the root page for books");
});

//-----Books functionality-----//

//Create//

app.post("/book", function(req, res)
{
    var newBook = {
        title: req.body.title,
        author: req.body.author,
        pages: req.body.pages,
        publisher: req.body.publisher
    }

    Book.create(newBook, function(err, newBook)
    {
        if(err)
        {
            console.log(err);
            res.send("Problem encountered");
        }
        newBook.save();
        console.log(newBook);
    });
    res.send("Testing Done, book added");
});