const express = require("express");
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

const user_controller = require('../controllers/userController');

router.route('/get-users').get(protect, user_controller.allUsers);

module.exports = router;