const passport = require("passport");
const passportJWT = require("passport-jwt");
const { User } = require("../model/userSchema");


let ExtractJWT = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;


let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJWT.fromAuthHeaderWithScheme("jwt");
jwtOptions.secretOrKey = "pa657HI!sna87";


let strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
  User.findOne({ id: jwt_payload.id }, function (err, user) {
    if (user) {
      next(null, user);
    } else {
      next(null, false);
    }
  });
});

passport.use(strategy);
passport.use(User.createStrategy());
