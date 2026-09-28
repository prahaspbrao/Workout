const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  durationSeconds: { type: Number, default: 30 },
  reps: { type: String, default: '' },
  instructions: { type: String, default: '' },
  targetArea: { type: String, default: 'Full Body' }
});

const workoutSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  durationMinutes: {
    type: Number,
    required: true // e.g. 5, 10, 15, 20, 30
  },
  category: {
    type: String,
    enum: ['Desk & Chair Stretch', 'Quick Cardio', 'HIIT Blast', 'Core & Abs', 'Full Body Strength', 'Mobility & Yoga'],
    default: 'Quick Cardio'
  },
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },
  equipmentRequired: {
    type: String,
    default: 'None (Bodyweight)'
  },
  estimatedCalories: {
    type: Number,
    required: true
  },
  exercises: [exerciseSchema],
  icon: {
    type: String,
    default: 'Activity'
  }
}, { timestamps: true });

module.exports = mongoose.model('Workout', workoutSchema);
