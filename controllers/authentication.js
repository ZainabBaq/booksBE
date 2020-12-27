const { User } = require("../db/models");
const { hashPassword } = require("../helpers/authentication");
const JWT = require("jsonwebtoken");
const { JWT_EXPIRATION_DATE, JWT_SECRET } = require("../config/keys");
exports.createUser = async (req, res, next) => {
  try {
    const hashedPassword = hashPassword(req.body.password);
    req.body.password = hashedPassword;
    const user = await User.create(req.body);
    res.status(201).json(tokenObject(user));
  } catch (error) {
    next(error);
  }
};

exports.signIn = async (req, res, next) => {
  try {
    res.json({ message: "You are logged in!", ...tokenObject(req.user) });
  } catch (error) {
    next(error);
  }
};

const tokenObject = (user) => ({
  token: jwt(user),
});
const jwt = (user) => {
  const payload = () => ({
    id: user.id,
    email: user.email,
    name: user.name,
    exp: Date.now() + JWT_EXPIRATION_DATE,
  });

  return JWT.sign(JSON.stringify(payload()), JWT_SECRET);
};
