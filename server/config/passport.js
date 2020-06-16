const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const jwt_config = require('../config/jwt_config');
const User = require('../models/user.model');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        // Find the user given the email
        const user = await User.findOne({ "email": email }).select('password email');
        if (!user) {
            return done(null, false);
        }

        const passwordIsValid = await user.validatePassword(password);
        if (!passwordIsValid) {
            return done(null, false);
        }

        done(null, user);
    } catch (error) {
        done(error, false);
    }
}));

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwt_config.secret
}, async (payload, done) => {
    try {
        // Find the user by data extracted from token
        const user = await User.findById(payload._id);

        // If user doesn't exists, null means no error, false means no user
        if (!user) return done(null, false, payload);

        // null means no error, and pass the user
        done(null, user);
    } catch (error) {
        done(error, false);
    }
}));