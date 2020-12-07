const { User } = require("../db/models");
const { hashPassword } = require("../helpers/authentication");

exports.createUser = async (req, res, next) => {
  try {
    const hashedPassword = hashPassword(req.body.password);
    req.body.password = hashedPassword;
    const user = await User.create(req.body);
    res.json(user);
  } catch (error) {
    next(error);
  }
};
