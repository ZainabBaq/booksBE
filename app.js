const express = require("express");
const cors = require("cors");
const app = express();
const cookiesRoutes = require("./routes/books");
const db = require("./db/models");
const path = require("path");
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/media", express.static(path.join(__dirname, "media")));

// Routes Middleware
app.use("/books", cookiesRoutes);

// Not found middlewre
app.use((req, res, next) => {
  res.status(404).json({ message: "Path not found!" });
});
const run = async () => {
  try {
    // TODO: MAKE SURE TI REMOVE force
    await db.sequelize.sync({ force: true });
    console.log("Connection to the database successful!");
    await app.listen(8000, () => {
      console.log("The application is running on localhost:8000");
    });
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
};

run();
// PORTS
app.listen(80, () => {
  console.log("The application is running on a local host 8000");
});
