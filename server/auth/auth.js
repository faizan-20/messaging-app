const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
require('dotenv').config();

const User = require('../models/user');

passport.use(
    'signup',
    new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password'
        },
        async (username, password, done) => {
            try {
                const user = await User.create({ username, password });
                return done(null, user);
            } catch (err) {
                done(err);
            }
        }
    )
);

passport.use(
    'login',
    new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
    async (username, password, done) => {
        try {
            const user = await User.findOne({ username });
            if (!user) return done(null, flase, {message: 'Incurrect username'});
            
            const validate = await user.isValidPassword(password);

            if (!validate) return done(null, false, {message: 'Incorrect password'});

            return done(null, user, {message: 'Logged in successfully'});
        } catch (err) {
            return done(err);
        }
    }
    )
);

passport.use(
    new JWTstrategy(
        {
            secretOrKey: process.env.SECRET_KEY,
            jwtFromRequest: ExtractJWT.fromHeader('access-token')
        },
        async (token, done) => {
            try {
                return done(null, token.user);
            } catch (err) {
                done(err);
            }
        }
    )
);