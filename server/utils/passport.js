const passportJwt = require("passport-jwt");
const User = require("../models/user");

const JwtStrategy = passportJwt.Strategy;

const init = (passport) => {
  let opts = {};
  opts.secretOrKey = process.env.JWT_SECRET;
  opts.issuer = process.env.JWT_ISSUER;
  opts.audience = process.env.JWT_AUDIENCE;
  opts.jwtFromRequest = passportJwt.ExtractJwt.fromAuthHeaderWithScheme("JWT");

  passport.use(
    new JwtStrategy(opts, (jwtPayload, done) => {
      User.findOne({ _id: jwtPayload.userId })
        .lean()
        .exec((err, user) => {
          if (err) {
            return done(err, false);
          }
          if (user) {
            done(null, user);
          } else {
            done(null, false, "User found in token but not found in records");
          }
        });
    }),
  );

  return passport;
};

module.exports = init;
