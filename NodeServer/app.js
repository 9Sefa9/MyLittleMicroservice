const express = require('express');
const app = express();
//const mongoose = require('mongoose');
//const {mongoUrl} = require('./config/index');
const authorsRoutes = require('./api/routes/authors');
const booksRoutes = require('./api/routes/books');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('./config/database');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use((req,res, next)=>{console.log("cors"); cors(); next();});
mongoose();
app.use('/authors', authorsRoutes);
app.use('/books', booksRoutes);
app.use((req,res)=>{
  res.status("404").send('<html><body><h1>404 - API ERROR!</h1><h3>Please use appropriate API calls.</h3></bod></html>');
});
module.exports = app;

/*Manuell CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
});
*/
//Automatical CORS

/*
*/
