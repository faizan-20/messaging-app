const passport = require('passport');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/user');
require('dotenv').config();

exports.signup_post = async(req, res) => {
    try {
        const checkUsername = await User.findOne({username: req.body.username});

        if (!checkUsername) {
            const user = new User({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                username: req.body.username,
                password: req.body.password,
            });
            await user.save();
            return res.json({
                result: "success",
                user
            });
        } else {
            return res.json({
                result: "user already exists",
            });
        }
    } catch(err) {
        return next(err);
    }
}

exports.login_post = async(req, res) => {
    try {
        passport.authenticate(
            'login',
            async (err, user, info) => {
                try {
                    if (err || !user) {
                        const error = new Error('An error occurd.');
                        return console.error(error);
                    }

                    req.login(
                        user,
                        {session: false},
                        async (error) => {
                            if (error) return console.error(error);
                            const body = {_id: user._id, username: user.username};
                            const token = jwt.sign({ user: body }, process.env.SECRET_KEY);

                            return res.json({ token });
                        }
                    );
                } catch(error) {
                    console.error(error);
                }
            }
        )(req, res);
    } catch(error) {
       res.json('error');
    }
}

exports.checkLogged_post = async (req, res, next) => {
        const token = req.headers['access-token'];
        if(token === null) return res.status(401).json('Unauthorize user')

        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            const user = await User.findOne({username: decoded.user.username}).select("-password");
            res.json(user);
        } catch(e) {
            console.log(e);
            res.status(400);
        }
}