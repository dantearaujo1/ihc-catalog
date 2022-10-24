require("dotenv").config();
const express = require ("express");
const mongoose = require('mongoose');
const app = express();

// Config constants
const PORT = 3000;
const API_URL_PATH = "/api/v1";
const DB_USER = process.env.DB_USER;
const DB_PASS = encodeURIComponent(process.env.DB_PASSWORD);

const json = require('./dataa.json');

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
app.get(API_URL_PATH, (req,res) => {
  res.json(json);
});

app.get(API_URL_PATH + '/posts', (req,res) => {
  res.send("We are on posts");
});


// How do we start listening to the server
app.listen(PORT);
