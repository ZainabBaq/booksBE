const express = require("express");
const router = express.Router();
const { createUser, signIn } = require("../controllers/authentication");
const passport = require("passport");

const signInPassportMiddleware = passport.authenticate("local", {
  session: false,
});

router.post("/signup", createUser);
router.post("/signin", signInPassportMiddleware, signIn);

module.exports = router;
