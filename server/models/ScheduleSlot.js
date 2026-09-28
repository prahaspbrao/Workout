const mongoose = require('mongoose');

const scheduleSlotSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  startTime: {
    type: String, // e.g. "09:00"
    required: true
  },
  endTime: {
    type: String, // e.g. "10:30"
    required: true
  },
  durationMinutes: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ['busy', 'free'],
    default: 'busy'
  },
  category: {
    type: String,
    default: 'General' // Work, Class, Break, Free Gap
  },
  isUtilized: {
    type: Boolean,
    default: false
  },
  utilizedWorkoutId: {
    type: String,
    default: null
  },
  date: {
    type: String,
    default: () => new Date().toISOString().split('T')[0]
  }
}, { timestamps: true });

module.exports = mongoose.model('ScheduleSlot', scheduleSlotSchema);
