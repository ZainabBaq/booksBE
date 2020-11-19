const express = require("express");
const cors = require("cors");
const books = require("./books.json");

const app = express();

// Middleware
app.use(cors());

// ROUTES
app.get("/", (req, res) => {
  console.log("HELLO");
  res.send({
    routesAvailable: {
      "get all books": "/books",
    },
  });
});

app.get("/books", (req, res) => {
  console.log("HELLO");
  res.json(books);
});
// PORTS
app.listen(80, () => {
  console.log("The application is running on a local host 8000");
});
