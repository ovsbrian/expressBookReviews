const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    // check if username and password are provided
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({message: "Username and password are required"});
    }
    // check if username already exists
    if (users[req.body.username]) {
        return res.status(400).json({message: "Username already exists"});
    }
    // register new user
    users[req.body.username] = {
         
        password: req.body.password
    };
    return res.status(200).json({message: "User registered successfully"});
});


// Get the book list available in the shop
public_users.get('/',function (req, res) {
    res.send(JSON.stringify(books,null,4));
    return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  
    const details  = req.params.isbn;
    res.send(books[details])
       
  return res.status(300).json({message: "Yet to be implemented"});
 });
  




 
// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    let author = req.params.author;
    let booksByAuthor = [];
    let bookKeys = Object.keys(books);
    for (let i = 0; i < bookKeys.length; i++) {
        let book = books[bookKeys[i]];
        if (book.author === author) {
            booksByAuthor.push(book);
        }
    }
    res.send(booksByAuthor);
});


// Get all books based on title
public_users.get('/title/:title',function (req, res) {
     let title = req.params.title;
    let booksByTitle = [];
    let bookKeys = Object.keys(books);
    for (let i = 0; i < bookKeys.length; i++) {
        let book = books[bookKeys[i]];
        if (book.title === title) {
            booksByTitle.push(book);
        }
    }
    res.send(booksByTitle);
  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const details  = req.params.isbn;
    res.send(books[details].reviews)
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
