const express = require('express');
const router = express.Router();
require('dotenv').config();

const auth_controller = require('../controllers/authController');

router.post('/signup', auth_controller.signup_post);
router.post('/login', auth_controller.login_post);

module.exports = router;