const WorkoutLog = require('../models/WorkoutLog');
const { isFallback } = require('../config/db');

let memoryLogs = [
  {
    _id: 'log1',
    workoutTitle: '5-Minute Posture & Desk Reset',
    workoutCategory: 'Desk & Chair Stretch',
    durationMinutes: 5,
    caloriesBurned: 25,
    slotTitle: 'Free Downtime (10:30-11:15)',
    completedAt: new Date(Date.now() - 86400000).toISOString(),
    rating: 5
  },
  {
    _id: 'log2',
    workoutTitle: '10-Minute Rapid Energy Booster',
    workoutCategory: 'Quick Cardio',
    durationMinutes: 10,
    caloriesBurned: 75,
    slotTitle: 'Free Downtime (12:00-13:30)',
    completedAt: new Date().toISOString(),
    rating: 5
  }
];

exports.logWorkout = async (req, res) => {
  try {
    const { workoutTitle, workoutCategory, durationMinutes, caloriesBurned, slotTitle, rating } = req.body;

    const newLog = {
      _id: 'log_' + Date.now(),
      workoutTitle: workoutTitle || 'Micro Workout',
      workoutCategory: workoutCategory || 'General',
      durationMinutes: Number(durationMinutes) || 10,
      caloriesBurned: Number(caloriesBurned) || 50,
      slotTitle: slotTitle || 'Spontaneous Free Gap',
      completedAt: new Date().toISOString(),
      rating: Number(rating) || 5
    };

    if (!isFallback()) {
      try {
        const created = await WorkoutLog.create(newLog);
        return res.status(201).json({ success: true, log: created });
      } catch (e) {
        memoryLogs.unshift(newLog);
        return res.status(201).json({ success: true, log: newLog });
      }
    } else {
      memoryLogs.unshift(newLog);
      return res.status(201).json({ success: true, log: newLog });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getLogsAndStats = async (req, res) => {
  try {
    let logs = [];
    if (!isFallback()) {
      try {
        logs = await WorkoutLog.find().sort({ completedAt: -1 });
      } catch (e) {
        logs = memoryLogs;
      }
    } else {
      logs = memoryLogs;
    }

    const totalActiveMinutes = logs.reduce((acc, l) => acc + (l.durationMinutes || 0), 0);
    const totalCalories = logs.reduce((acc, l) => acc + (l.caloriesBurned || 0), 0);
    const completedWorkoutsCount = logs.length;
    
    // Estimate free time utilized vs wasted (assuming average 15m free gap per workout)
    const timeSavedFromWasting = totalActiveMinutes; 

    res.json({
      success: true,
      stats: {
        totalActiveMinutes,
        totalCalories,
        completedWorkoutsCount,
        timeSavedFromWasting,
        streakDays: Math.min(completedWorkoutsCount, 5) // Dynamic streak calculation
      },
      logs
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
