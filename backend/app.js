require("dotenv").config();
const express = require ("express");
const mongoose = require('mongoose');
const app = express();

// This parses incoming JSON requests and puts the parsed data in req.body
app.use(express.json());
// Body parser for html post fomr
app.use(express.urlencoded({extended:false}));

// Config constants
const PORT = 3000;
const API_URL_PATH = "/api/v1";
const DB_USER = process.env.DB_USER;
const DB_PASS = encodeURIComponent(process.env.DB_PASSWORD);

// Local data
const json = require('./dataa.json');

// Connection between database and the server application
mongoose
  .connect(`mongodb+srv://${DB_USER}:${DB_PASS}@cluster-00.8nwrqdh.mongodb.net/?retryWrites=true&w=majority`)
  .then(() => {
    console.log("Conectamos ao MongoDB!");
  })
  .catch((err) => {
    console.log(err);
  });


// I Have the ability to create routes
// ROUTES
const articleRoutes = require('./routes/articleRoutes');
app.use(API_URL_PATH.concat('/','article'), articleRoutes);

// TODO: Remove this! Is for testing purpose only
app.get(API_URL_PATH, (req,res) => {
  res.json(json);
});


// How do we start listening to the server
app.listen(PORT);
