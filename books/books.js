var express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser");

app.use(bodyParser.json());

//-----Database setup-----//

const dotenv = require("dotenv");
const Book = require("./Book.js");
dotenv.config();
      
mongoose.connect("mongodb+srv://" + process.env.DB_USERNAME +":" + process.env.DB_PASSWORD + "@cluster0.flz5m.mongodb.net/"+process.env.DB_NAME+"?retryWrites=true&w=majority", {useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true}, function(){
    console.log("Connected to database!");
});

//-----Server setup-----//

app.listen(8686, function(){
    console.log("Server is up and running! Port 8686");
});

//-----Books functionality-----//

//Root page//

app.get("/", function(req, res){
    res.send("This is the root page for books");
});

//Create books//

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
    res.send("New book added");
});

//List books//

app.get("/books", function(req, res){
    Book.find({}, function(err, books){
        if(err)
        {
            console.log(err);
            res.send("Problem encountered");
        }
        res.json(books);
    });
});

//Find a book//

app.get("/book/:id", function(req, res){
    Book.findById(req.params.id, function(err, book){
        if(err){
            console.log(err);
            res.send("Problem encountered");
        }
        if(book)
        {
            res.json(book);
        } else{
            res.send("book id is invalid");
        }
    });
});

//Remove a book//

app.delete("/book/:id", function(req, res){
    Book.findByIdAndDelete(req.params.id, function(err, book){
        if(err){
            console.log(err);
            res.send("Problem encountered");
        }
        if(book)
        {
            console.log("Book deleted!\n" + book);
            res.redirect("/books");
        } else{
            res.send("book id is invalid");
        }
    });
});

