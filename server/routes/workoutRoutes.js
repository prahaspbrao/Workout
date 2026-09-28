const express = require('express');
const router = express.Router();
const { getWorkouts, recommendWorkouts, getWorkoutById } = require('../controllers/workoutController');

router.get('/', getWorkouts);
router.get('/recommend', recommendWorkouts);
router.get('/:id', getWorkoutById);

module.exports = router;
