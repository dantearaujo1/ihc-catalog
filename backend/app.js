const express = require ("express");
const app = express();

const PORT = 3000;
const URL_PROXY = "/api/v1"

// I Have the ability to create routes
// ROUTES
app.get(URL_PROXY, (req,res) => {
  const json =
[
      {
        "id":"0",
        "name":"Artigo 1",
        "cat":"Quality",
      },
      {
        "id":"1",
        "name":"Artigo 2",
        "cat":"Quality",
      },
      {
        "id":"2",
        "name":"Artigo 3",
        "cat":"Quality",
      },
      {
        "id":"3",
        "name":"Artigo 4",
        "cat":"Quality",
      },
      {
        "id":"4",
        "name":"Artigo 5",
        "cat":"Quality",
      },
]

  res.json(json);
  console.log("hello")
});
app.get(URL_PROXY + '/posts', (req,res) => {
  res.send("We are on posts");
});


// How do we start listening to the server
app.listen(PORT);
