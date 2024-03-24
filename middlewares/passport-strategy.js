const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const knex = require('../knexfile').development;
const jwtSecret = process.env.JWT_SECRET;

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret
};

passport.use(new JWTStrategy(options, (jwt_payload, done) => {
    knex('users').where({ id: jwt_payload.sub }).first()
        .then(user => {
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
        .catch(err => {
            return done(err, false);
        });
}));

module.exports = passport;