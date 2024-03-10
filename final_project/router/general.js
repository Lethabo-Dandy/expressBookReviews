const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    //Write your code here
    const username = req.body.username;
    const password = req.body.password;
    if(username === "" && password === ""){
      return res.status(404).json({message: "User and password not provided!"})
    }else if(username === ""){
      return res.status(404).json({message: "User not provided!"})
    }else if(password === ""){
      return res.status(404).json({message: "Password not provided!"})
    }else{
      if(username && password){
          if(!isValid(username)){
              users.push({"username":username,"password":password});
              return res.status(200).json({message:"User successfully registred. Now you can login"})
          }else{
              return res.status(404).json({message: `${username} already exists!`}); 
          }
        }
    }
});

// Get the book list available in the shop
public_users.get('/',async function (req, res) {
    try {
      const bookList = await getBooks(); 
      res.json(bookList); // Neatly format JSON output
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error retrieving book list" });
    }
});

// Get book details based on ISBN
const getByISBN = (isbn) => {
    return new Promise((resolve, reject) => {
        let isbnNum = parseInt(isbn);
        if (books[isbnNum]) {
            resolve(books[isbnNum]);
        } else {
            reject({ status: 404, message: `ISBN ${isbn} not found` });
        }
    });
};
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    //Write your code here
    return res.status(300).json({message: "Yet to be implemented"});
      const author = req.params.author;
      getBooks()
      .then((bookEntries) => Object.values(bookEntries))
      .then((books) => books.filter((book) => book.author === author))
      .then((filteredBooks) => res.send(filteredBooks));
  });
//  Task 4 & Task 12
//  Get all books based on title
public_users.get('/title/:title',function (req, res) {
    //Write your code here
    return res.status(300).json({message: "Yet to be implemented"});
      const title = req.params.title;
      getBooks()
      .then((bookEntries) => Object.values(bookEntries))
      .then((books) => books.filter((book) => book.title === title))
      .then((filteredBooks) => res.send(filteredBooks));
  });

//  Task 5 & Task 13
//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    //Write your code here
    return res.status(300).json({message: "Yet to be implemented"});
      const isbn = req.params.isbn;
      getByISBN(req.params.isbn)
      .then(
          result => res.send(result.reviews),
          error => res.status(error.status).json({message: error.message})
      );
  });

module.exports.general = public_users;
