const express = require('express');
const { chatWithBot } = require('../controllers/chatbotController');

const router = express.Router();

// Unified route for all stages
router.post('/:stage', chatWithBot);

module.exports = router;