const mongosoe = require('mongoose');
const User = require('../models/user');

exports.allUsers = async(req, res) => {
    try{
        const keyword = req.query.search 
        ? 
        {
            $or: [
                { first_name: { $regex: req.query.search, $options: "i" } },
                { username: { $regex: req.query.search, $options: "i" } },
            ]
        }
        : {};

        const users = await User.find(keyword);

        res.json({users})
    } catch(err) {
        console.error(err);
    }
}