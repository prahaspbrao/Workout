import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import ScheduleManager from './components/ScheduleManager';
import SmartWorkoutMatcher from './components/SmartWorkoutMatcher';
import WorkoutTimer from './components/WorkoutTimer';
import AnalyticsHistory from './components/AnalyticsHistory';

// Fallback initial data for instant standalone rendering
const defaultWorkouts = [
  {
    _id: 'w1',
    title: '5-Minute Posture & Desk Reset',
    description: 'Perfect for micro-breaks between study or work sessions. Requires no equipment and relieves neck and lumbar strain.',
    durationMinutes: 5,
    category: 'Desk & Chair Stretch',
    difficulty: 'Beginner',
    equipmentRequired: 'Chair / Standing',
    estimatedCalories: 25,
    exercises: [
      { name: 'Seated Neck Roll & Shoulder Shrugs', durationSeconds: 60, instructions: 'Sit up straight, roll head gently in full circles.', reps: '10 circles', targetArea: 'Neck & Shoulders' },
      { name: 'Chair Torso Twist', durationSeconds: 60, instructions: 'Hold chair backrest and gently rotate torso.', reps: '10 reps per side', targetArea: 'Spine & Core' },
      { name: 'Chest Opener & Wrist Stretch', durationSeconds: 60, instructions: 'Interlace fingers behind back and stretch upwards.', reps: 'Hold for 30s', targetArea: 'Chest & Arms' },
      { name: 'Seated Hamstring Stretch', durationSeconds: 60, instructions: 'Extend one leg forward and hinge gently at hips.', reps: '30s per leg', targetArea: 'Hamstrings' },
      { name: 'Standing Overhead Reach', durationSeconds: 60, instructions: 'Stand up, stretch hands up high and inhale deeply.', reps: '5 deep breaths', targetArea: 'Full Body' }
    ]
  },
  {
    _id: 'w2',
    title: '10-Minute Rapid Energy Booster',
    description: 'Quick cardio interval routine to supercharge focus, boost heart rate, and shake off sluggishness in 10 minutes.',
    durationMinutes: 10,
    category: 'Quick Cardio',
    difficulty: 'Beginner',
    equipmentRequired: 'None (Bodyweight)',
    estimatedCalories: 75,
    exercises: [
      { name: 'Light Jumping Jacks', durationSeconds: 45, instructions: 'Land softly on toes, keep steady rhythm.', reps: 'Continuous', targetArea: 'Full Body Cardio' },
      { name: 'High Knees', durationSeconds: 45, instructions: 'Drive knees towards waist height rapidly.', reps: 'Continuous', targetArea: 'Legs & Cardio' },
      { name: 'Speed Skater Hops', durationSeconds: 45, instructions: 'Bound side to side swinging opposite arm.', reps: 'Continuous', targetArea: 'Glutes & Legs' },
      { name: 'Shadow Boxing Combos', durationSeconds: 60, instructions: 'Throw rhythmic punches while bouncing on feet.', reps: 'Jabs & Crosses', targetArea: 'Upper Body & Core' }
    ]
  },
  {
    _id: 'w3',
    title: '15-Minute Express Core & Abs',
    description: 'Target your abdominal wall and lower back stability without needing heavy weights or equipment.',
    durationMinutes: 15,
    category: 'Core & Abs',
    difficulty: 'Intermediate',
    equipmentRequired: 'Yoga Mat / Carpet',
    estimatedCalories: 110,
    exercises: [
      { name: 'Elbow Plank Hold', durationSeconds: 60, instructions: 'Engage core, maintain straight body line.', reps: 'Hold 60s', targetArea: 'Core & Stabilizers' },
      { name: 'Russian Twists', durationSeconds: 45, instructions: 'Sit on tailbone, twist torso side to side.', reps: '25 twists', targetArea: 'Obliques' },
      { name: 'Bicycle Crunches', durationSeconds: 45, instructions: 'Alternate elbow to opposite knee smoothly.', reps: '20 reps', targetArea: 'Abs' },
      { name: 'Mountain Climbers', durationSeconds: 45, instructions: 'Drive knees to chest rapidly from high plank position.', reps: '30 fast reps', targetArea: 'Lower Abs & Cardio' }
    ]
  }
];

const defaultTimeline = [
  { _id: 's1', title: 'Morning Lecture / Deep Work', startTime: '09:00', endTime: '10:30', durationMinutes: 90, type: 'busy', category: 'Study/Work', isUtilized: false },
  { _id: 'g1', title: 'Free Time Gap (45 mins available)', startTime: '10:30', endTime: '11:15', durationMinutes: 45, type: 'free', category: 'Free Downtime', isUtilized: false },
  { _id: 's2', title: 'Team Sync Meeting', startTime: '11:15', endTime: '12:00', durationMinutes: 45, type: 'busy', category: 'Work', isUtilized: false },
  { _id: 'g2', title: 'Free Time Gap (90 mins available)', startTime: '12:00', endTime: '13:30', durationMinutes: 90, type: 'free', category: 'Free Downtime', isUtilized: false },
  { _id: 's3', title: 'Project Research Session', startTime: '13:30', endTime: '15:00', durationMinutes: 90, type: 'busy', category: 'Study', isUtilized: false }
];

const defaultFreeGaps = [
  { _id: 'g1', title: 'Morning Downtime Gap', startTime: '10:30', endTime: '11:15', durationMinutes: 45, type: 'free' },
  { _id: 'g2', title: 'Lunch Hour Downtime Gap', startTime: '12:00', endTime: '13:30', durationMinutes: 90, type: 'free' }
];

const defaultLogs = [
  {
    _id: 'log1',
    workoutTitle: '5-Minute Posture & Desk Reset',
    workoutCategory: 'Desk & Chair Stretch',
    durationMinutes: 5,
    caloriesBurned: 25,
    slotTitle: 'Morning Downtime Gap (10:30-11:15)',
    completedAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    _id: 'log2',
    workoutTitle: '10-Minute Rapid Energy Booster',
    workoutCategory: 'Quick Cardio',
    durationMinutes: 10,
    caloriesBurned: 75,
    slotTitle: 'Lunch Hour Downtime Gap (12:00-13:30)',
    completedAt: new Date().toISOString()
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [timeline, setTimeline] = useState(defaultTimeline);
  const [freeGaps, setFreeGaps] = useState(defaultFreeGaps);
  const [workouts, setWorkouts] = useState(defaultWorkouts);
  const [logs, setLogs] = useState(defaultLogs);
  const [stats, setStats] = useState({
    totalActiveMinutes: 15,
    totalCalories: 100,
    completedWorkoutsCount: 2,
    timeSavedFromWasting: 15,
    streakDays: 2
  });

  const [selectedGap, setSelectedGap] = useState(null);
  const [activeWorkout, setActiveWorkout] = useState(null);

  // Fetch data from API if server is running
  const fetchData = async () => {
    try {
      const schedRes = await axios.get('/api/schedule');
      if (schedRes.data?.success && schedRes.data.timeline?.length > 0) {
        setTimeline(schedRes.data.timeline);
        setFreeGaps(schedRes.data.freeGaps || []);
      }
    } catch (err) {
      console.warn('API Schedule notice (using local fallback state):', err.message);
    }

    try {
      const workRes = await axios.get('/api/workouts');
      if (workRes.data?.success && workRes.data.workouts?.length > 0) {
        setWorkouts(workRes.data.workouts);
      }
    } catch (err) {
      console.warn('API Workouts notice (using local fallback state):', err.message);
    }

    try {
      const logRes = await axios.get('/api/logs');
      if (logRes.data?.success) {
        setLogs(logRes.data.logs || defaultLogs);
        if (logRes.data.stats) {
          setStats(logRes.data.stats);
        }
      }
    } catch (err) {
      console.warn('API Logs notice (using local fallback state):', err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddSlot = async (slotData) => {
    try {
      const res = await axios.post('/api/schedule', slotData);
      if (res.data?.success) {
        fetchData();
      } else {
        const newSlot = { ...slotData, _id: 's_' + Date.now(), type: 'busy', isUtilized: false };
        setTimeline((prev) => [...prev, newSlot]);
      }
    } catch (err) {
      const newSlot = { ...slotData, _id: 's_' + Date.now(), type: 'busy', isUtilized: false };
      setTimeline((prev) => [...prev, newSlot]);
    }
  };

  const handleDeleteSlot = async (id) => {
    try {
      await axios.delete(`/api/schedule/${id}`);
      fetchData();
    } catch (err) {
      setTimeline((prev) => prev.filter((s) => s._id !== id));
    }
  };

  const handleFinishWorkout = async (logData) => {
    try {
      await axios.post('/api/logs', logData);
      fetchData();
    } catch (err) {
      const newLog = { ...logData, _id: 'l_' + Date.now(), completedAt: new Date().toISOString() };
      setLogs((prev) => [newLog, ...prev]);
      setStats((prev) => ({
        ...prev,
        totalActiveMinutes: prev.totalActiveMinutes + logData.durationMinutes,
        totalCalories: prev.totalCalories + logData.caloriesBurned,
        completedWorkoutsCount: prev.completedWorkoutsCount + 1,
        timeSavedFromWasting: prev.timeSavedFromWasting + logData.durationMinutes,
      }));
    } finally {
      setActiveWorkout(null);
      setActiveTab('analytics');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      {/* Navigation Header */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} stats={stats} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <Dashboard
            stats={stats}
            freeGaps={freeGaps}
            onSelectGap={setSelectedGap}
            onStartWorkout={setActiveWorkout}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'schedule' && (
          <ScheduleManager
            timeline={timeline}
            freeGaps={freeGaps}
            onAddSlot={handleAddSlot}
            onDeleteSlot={handleDeleteSlot}
            onSelectGap={setSelectedGap}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'workouts' && (
          <SmartWorkoutMatcher
            workouts={workouts}
            selectedGap={selectedGap}
            onStartWorkout={setActiveWorkout}
          />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsHistory logs={logs} stats={stats} />
        )}
      </main>

      {/* Live Interactive Workout Modal Timer */}
      {activeWorkout && (
        <WorkoutTimer
          workout={activeWorkout}
          slot={selectedGap}
          onClose={() => setActiveWorkout(null)}
          onFinishWorkout={handleFinishWorkout}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <p>FitTime MERN Application &copy; {new Date().getFullYear()} — Smart Time Management & Micro-Workout Optimizer</p>
      </footer>
    </div>
  );
}
