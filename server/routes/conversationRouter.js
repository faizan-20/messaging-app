const express = require('express');
const router = express.Router();

const conversation_controller = require('../controllers/conversationController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, conversation_controller.accessConversation);

module.exports = router;