const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');

const User = require('../models/user');

exports.getAllUsers = asyncHandler(async(req, res) => {
    const { keyword } = req.query.search ? {
        $or: [
            { username: { $regex: req.query.search, $options: "i" } },
            { first_name: { $regex: req.query.search, $options: "i" } },
            { last_name: { $regex: req.query.search, $options: "i" } },
        ],
    } : {}

    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    res.json(users);
});