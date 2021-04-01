const express = require('express');
const app = express();
const mongoose = require('mongoose');
const {mongoUrl} = require('./config/index');
const authorsRoutes = require('./api/routes/authors');
const booksRoutes = require('./api/routes/books');

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

mongoose.connect(mongoUrl,
  {useNewUrlParser: true, useUnifiedTopology: true },
  (data)=>{console.log("Database connection established ? : "+data)}
);

mongoose.Promise = global.Promise;

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

app.use('/authors', authorsRoutes);
app.use('/books', booksRoutes);

module.exports = app;