const express = require('express');
const router = express.Router();
const streamController = require('../controllers/streamController');

router.get('/api/:userId', streamController.getStreams);
router.post('/api/:userId', streamController.createStream);
router.delete('/api/:userId/:streamId', streamController.deleteStream);

module.exports = router;
