const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, user_controller.getAllUsers);

module.exports = router;