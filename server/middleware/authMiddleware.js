const jwt = require("jsonwebtoken");
const User = require('../models/user');

const protect = async(req, res, next) => {
    if (req.header['access-token']){
        try{
            const token = req.headers['access-token'];

            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            req.user = await User.findOne({username: decoded.user.username}).select("-password");
            next();
        } catch(err) {
            res.status(400).json('invalid token');
        }
    } else{
        res.status(400).json({failure: "invalid token"})
    }
}

module.exports = { protect };