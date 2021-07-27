const express = require("express");

const router = express.Router();

// create a new order
router.post("/bookrequest", (req, res, next) => {
  res.json({
    flag: "POST {24033}",
    book: req.body.bookName,
  });
});
module.exports = router;
