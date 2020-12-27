const express = require("express");
const passport = require("passport");
const { checkout } = require("../controllers/orders");

const router = express.Router();

// create a new order
router.post(
  "/checkout",
  passport.authenticate("jwt", { session: false }),
  checkout
);
module.exports = router;
