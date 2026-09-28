const mongoose = require('mongoose');

const workoutLogSchema = new mongoose.Schema({
  workoutTitle: {
    type: String,
    required: true
  },
  workoutCategory: {
    type: String,
    default: 'General'
  },
  durationMinutes: {
    type: Number,
    required: true
  },
  caloriesBurned: {
    type: Number,
    required: true
  },
  slotTitle: {
    type: String,
    default: 'Spontaneous Free Gap'
  },
  completedAt: {
    type: Date,
    default: Date.now
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5
  }
}, { timestamps: true });

module.exports = mongoose.model('WorkoutLog', workoutLogSchema);
