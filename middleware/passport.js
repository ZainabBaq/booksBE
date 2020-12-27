const LocalStrategy = require("passport-local");
const { User } = require("../db/models");
const bcrypt = require("bcrypt");
const JWTStrategy = require("passport-jwt").Strategy;
const { JWT_SECRET } = require("../config/keys");
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;

exports.localStrategy = new LocalStrategy(async (email, password, done) => {
  //
  console.log("Hello?");
  try {
    const user = await User.findOne({
      where: { email: email },
    });
    // check if password match
    const userAuthenticated =
      user && (await bcrypt.compare(password, user.password));

    return done(null, userAuthenticated && user);
  } catch (error) {
    console.log("Error:", error);
    done(error);
  }
});

exports.jwtStrategy = new JWTStrategy(
  {
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
  },
  async (jwtPayload, done) => {
    console.log(
      "Seconds left on this session:",
      (jwtPayload.exp - Date.now()) / 1000,
      "s"
    );
    if (jwtPayload.exp < Date.now()) {
      let error = new Error("Token expired");
      error.status = 401;
      return done(error); // status 401
    }
    try {
      const user = await User.findByPk(jwtPayload.id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  }
);
