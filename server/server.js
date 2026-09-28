const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { connectDB } = require('./config/db');
const scheduleRoutes = require('./routes/scheduleRoutes');
const workoutRoutes = require('./routes/workoutRoutes');
const logRoutes = require('./routes/logRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/schedule', scheduleRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/logs', logRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    app: 'FitTime - Smart Time & Workout Manager',
    time: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Server Internal Error' });
});

app.listen(PORT, () => {
  console.log(`🚀 FitTime Backend Server running on http://localhost:${PORT}`);
});
