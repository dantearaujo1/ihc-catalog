const express = require ("express");
const app = express();

const PORT = 3000;
const URL_PROXY = "/api/v1"

const json = require('./dataa.json')

// I Have the ability to create routes
// ROUTES
app.get(URL_PROXY, (req,res) => {
  res.json(json);
});
app.get(URL_PROXY + '/posts', (req,res) => {
  res.send("We are on posts");
});


// How do we start listening to the server
app.listen(PORT);
