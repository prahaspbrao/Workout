const mongoose = require('mongoose');
require('dotenv').config();

const Workout = require('./models/Workout');
const ScheduleSlot = require('./models/ScheduleSlot');
const { initialWorkouts } = require('./controllers/workoutController');

const seedData = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/smart_time_workout';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB for seeding...');

    await Workout.deleteMany({});
    await ScheduleSlot.deleteMany({});

    await Workout.insertMany(initialWorkouts);

    const sampleSlots = [
      { title: 'Morning Lecture / Deep Work', startTime: '09:00', endTime: '10:30', durationMinutes: 90, type: 'busy', category: 'Study/Work' },
      { title: 'Team Sync Meeting', startTime: '11:15', endTime: '12:00', durationMinutes: 45, type: 'busy', category: 'Work' },
      { title: 'Project Research Session', startTime: '13:30', endTime: '15:00', durationMinutes: 90, type: 'busy', category: 'Study' },
      { title: 'Evening Coding Session', startTime: '16:30', endTime: '18:00', durationMinutes: 90, type: 'busy', category: 'Coding' },
    ];

    await ScheduleSlot.insertMany(sampleSlots);

    console.log('✅ Seed successful! Sample workouts and schedule slots loaded.');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error.message);
    process.exit(1);
  }
};

seedData();
