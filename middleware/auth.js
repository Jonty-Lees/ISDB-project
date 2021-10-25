const passport = require('passport');
const passportJWT = require('passport-jwt');

let ExtractJWT = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;

let jwtOptions = {};
jwtOptions.jwtFromRequest = passportJWT.ExtractJwt.fromAuthHeaderWithScheme("jwt");
jwtOptions.secretOrKey = "aSecretLikeNoOther";

// Create Stratergy

let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next){
    User.findOne({ id: jwt_payload.id}, function (err, user){
        if (user){
            next(null,user);
        } else {
            next(null, false)
        }
    })
})

passport.use(strategy);
passport.use(User.createStrategy)