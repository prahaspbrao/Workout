const express = require('express');
const router = express.Router();
const { getSchedule, addSlot, deleteSlot } = require('../controllers/scheduleController');

router.get('/', getSchedule);
router.post('/', addSlot);
router.delete('/:id', deleteSlot);

module.exports = router;
