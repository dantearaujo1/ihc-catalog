const express = require ("express");
const app = express();

const PORT = 3000;
const API_URL_PATH = "/api/v1"

const json = require('./dataa.json')

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
