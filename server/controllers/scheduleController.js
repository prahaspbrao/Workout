const ScheduleSlot = require('../models/ScheduleSlot');
const { isFallback } = require('../config/db');

// In-memory initial data store for seamless demo execution without DB setup
let memoryScheduleSlots = [
  { _id: 's1', title: 'Morning Lecture / Deep Work', startTime: '09:00', endTime: '10:30', durationMinutes: 90, type: 'busy', category: 'Study/Work', isUtilized: false },
  { _id: 's2', title: 'Team Sync Meeting', startTime: '11:15', endTime: '12:00', durationMinutes: 45, type: 'busy', category: 'Work', isUtilized: false },
  { _id: 's3', title: 'Project Research Session', startTime: '13:30', endTime: '15:00', durationMinutes: 90, type: 'busy', category: 'Study', isUtilized: false },
  { _id: 's4', title: 'Evening Coding Session', startTime: '16:30', endTime: '18:00', durationMinutes: 90, type: 'busy', category: 'Coding', isUtilized: false },
];

// Utility function to convert HH:MM to minutes from midnight
const timeToMinutes = (timeStr) => {
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
};

// Utility function to convert minutes from midnight to HH:MM
const minutesToTime = (totalMinutes) => {
  const h = Math.floor(totalMinutes / 60).toString().padStart(2, '0');
  const m = (totalMinutes % 60).toString().padStart(2, '0');
  return `${h}:${m}`;
};

// Calculate free gaps between busy slots
const calculateFreeGaps = (busySlots) => {
  const sorted = [...busySlots].sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));
  const freeGaps = [];

  for (let i = 0; i < sorted.length - 1; i++) {
    const endCurrent = timeToMinutes(sorted[i].endTime);
    const startNext = timeToMinutes(sorted[i + 1].startTime);

    if (startNext > endCurrent) {
      const gapDuration = startNext - endCurrent;
      if (gapDuration >= 5) { // Minimum 5 min gap to be useful
        freeGaps.push({
          _id: `gap_${i}_${endCurrent}`,
          title: `Free Time Gap (${gapDuration} mins available)`,
          startTime: minutesToTime(endCurrent),
          endTime: minutesToTime(startNext),
          durationMinutes: gapDuration,
          type: 'free',
          category: 'Free Downtime',
          isUtilized: sorted[i].isUtilized || false
        });
      }
    }
  }

  return freeGaps;
};

// Get all schedule slots + detected free gaps
exports.getSchedule = async (req, res) => {
  try {
    let slots = [];
    if (!isFallback()) {
      try {
        slots = await ScheduleSlot.find().sort({ startTime: 1 });
      } catch (e) {
        slots = memoryScheduleSlots;
      }
    } else {
      slots = memoryScheduleSlots;
    }

    const freeGaps = calculateFreeGaps(slots.filter(s => s.type === 'busy'));
    const fullTimeline = [...slots, ...freeGaps].sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));

    res.json({
      success: true,
      busySlotsCount: slots.length,
      freeGapsCount: freeGaps.length,
      timeline: fullTimeline,
      freeGaps: freeGaps
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add a schedule slot
exports.addSlot = async (req, res) => {
  try {
    const { title, startTime, endTime, category } = req.body;
    const startMins = timeToMinutes(startTime);
    const endMins = timeToMinutes(endTime);

    if (endMins <= startMins) {
      return res.status(400).json({ success: false, message: 'End time must be after start time' });
    }

    const durationMinutes = endMins - startMins;

    const newSlot = {
      _id: 'slot_' + Date.now(),
      title: title || 'Scheduled Activity',
      startTime,
      endTime,
      durationMinutes,
      type: 'busy',
      category: category || 'General',
      isUtilized: false
    };

    if (!isFallback()) {
      try {
        const created = await ScheduleSlot.create(newSlot);
        return res.status(201).json({ success: true, slot: created });
      } catch (e) {
        memoryScheduleSlots.push(newSlot);
        return res.status(201).json({ success: true, slot: newSlot });
      }
    } else {
      memoryScheduleSlots.push(newSlot);
      return res.status(201).json({ success: true, slot: newSlot });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a schedule slot
exports.deleteSlot = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isFallback()) {
      try {
        await ScheduleSlot.findByIdAndDelete(id);
      } catch (e) {
        memoryScheduleSlots = memoryScheduleSlots.filter(s => s._id !== id);
      }
    } else {
      memoryScheduleSlots = memoryScheduleSlots.filter(s => s._id !== id);
    }
    res.json({ success: true, message: 'Slot removed' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports.memoryScheduleSlots = memoryScheduleSlots;
