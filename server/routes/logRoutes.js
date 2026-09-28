const express = require('express');
const router = express.Router();
const { logWorkout, getLogsAndStats } = require('../controllers/logController');

router.get('/', getLogsAndStats);
router.post('/', logWorkout);

module.exports = router;
