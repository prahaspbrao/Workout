const Workout = require('../models/Workout');
const { isFallback } = require('../config/db');

// Seed workouts list used in memory fallback or database initialization
const initialWorkouts = [
  {
    _id: 'w1',
    title: '5-Minute Posture & Desk Reset',
    description: 'Perfect for micro-breaks between study or work sessions. Requires no equipment and relieves neck and lumbar strain.',
    durationMinutes: 5,
    category: 'Desk & Chair Stretch',
    difficulty: 'Beginner',
    equipmentRequired: 'Chair / Standing',
    estimatedCalories: 25,
    icon: 'Maximize',
    exercises: [
      { name: 'Seated Neck Roll & Shoulder Shrugs', durationSeconds: 60, reps: '10 circles each side', instructions: 'Sit up straight, roll head gently in full circles.', targetArea: 'Neck & Shoulders' },
      { name: 'Chair Torso Twist', durationSeconds: 60, reps: '10 reps per side', instructions: 'Hold chair backrest and gently rotate torso.', targetArea: 'Spine & Core' },
      { name: 'Chest Opener & Wrist Stretch', durationSeconds: 60, reps: 'Hold for 30s', instructions: 'Interlace fingers behind back and stretch upwards.', targetArea: 'Chest & Arms' },
      { name: 'Seated Hamstring Stretch', durationSeconds: 60, reps: '30s per leg', instructions: 'Extend one leg forward and hinge gently at hips.', targetArea: 'Hamstrings' },
      { name: 'Standing Overhead Reach & Deep Breaths', durationSeconds: 60, reps: '5 deep breaths', instructions: 'Stand up, stretch hands up high and inhale deeply.', targetArea: 'Full Body' }
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
    icon: 'Zap',
    exercises: [
      { name: 'Light Jumping Jacks', durationSeconds: 45, reps: 'Continuous', instructions: 'Land softly on toes, keep steady rhythm.', targetArea: 'Full Body Cardio' },
      { name: 'Rest / Active Breath', durationSeconds: 15, reps: 'Breath', instructions: 'Inhale through nose, exhale through mouth.', targetArea: 'Recovery' },
      { name: 'High Knees', durationSeconds: 45, reps: 'Continuous', instructions: 'Drive knees towards waist height rapidly.', targetArea: 'Legs & Cardio' },
      { name: 'Rest', durationSeconds: 15, reps: 'Breath', instructions: 'Shake out arms and legs.', targetArea: 'Recovery' },
      { name: 'Speed Skater Hops', durationSeconds: 45, reps: 'Continuous', instructions: 'Bound side to side swinging opposite arm.', targetArea: 'Glutes & Legs' },
      { name: 'Rest', durationSeconds: 15, reps: 'Breath', instructions: 'Control breathing.', targetArea: 'Recovery' },
      { name: 'Shadow Boxing Punch Combos', durationSeconds: 60, reps: 'Jabs & Crosses', instructions: 'Throw rhythmic punches while bouncing on feet.', targetArea: 'Upper Body & Core' },
      { name: 'Standing Calf Raises & Arm Circles', durationSeconds: 60, reps: '20 reps', instructions: 'Raise up on tiptoes while making arm circles.', targetArea: 'Calves & Shoulders' }
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
    icon: 'Shield',
    exercises: [
      { name: 'Elbow Plank Hold', durationSeconds: 60, reps: 'Hold 60s', instructions: 'Engage core, maintain straight body line.', targetArea: 'Core & Stabilizers' },
      { name: 'Russian Twists', durationSeconds: 45, reps: '25 twists', instructions: 'Sit on tailbone, twist torso side to side.', targetArea: 'Obliques' },
      { name: 'Bicycle Crunches', durationSeconds: 45, reps: '20 reps', instructions: 'Alternate elbow to opposite knee smoothly.', targetArea: 'Abs' },
      { name: 'Mountain Climbers', durationSeconds: 45, reps: '30 fast reps', instructions: 'Drive knees to chest rapidly from high plank position.', targetArea: 'Lower Abs & Cardio' },
      { name: 'Superman Hold', durationSeconds: 45, reps: 'Hold 45s', instructions: 'Lie on belly, raise chest and legs off floor.', targetArea: 'Lower Back' },
      { name: 'Cobra Stretch Cooldown', durationSeconds: 60, reps: 'Hold 60s', instructions: 'Press hips down and arch upper back gently.', targetArea: 'Abdominal Wall' }
    ]
  },
  {
    _id: 'w4',
    title: '20-Minute Full-Body HIIT Burn',
    description: 'Maximum calorie burn in 20 minutes. Alternates high-intensity functional moves with short recovery periods.',
    durationMinutes: 20,
    category: 'HIIT Blast',
    difficulty: 'Intermediate',
    equipmentRequired: 'None (Bodyweight)',
    estimatedCalories: 180,
    icon: 'Flame',
    exercises: [
      { name: 'Bodyweight Squats', durationSeconds: 60, reps: '20 reps', instructions: 'Sit back into heels, knees behind toes.', targetArea: 'Quads & Glutes' },
      { name: 'Push-ups (Standard or Knee)', durationSeconds: 45, reps: '12-15 reps', instructions: 'Keep core tight, lower chest to floor.', targetArea: 'Chest & Triceps' },
      { name: 'Burpees (No push-up)', durationSeconds: 45, reps: '10 reps', instructions: 'Drop hands, jump feet back, jump up with hands overhead.', targetArea: 'Full Body' },
      { name: 'Forward Lunges', durationSeconds: 60, reps: '10 per leg', instructions: 'Step forward, 90 degree bend in front knee.', targetArea: 'Legs & Balance' },
      { name: 'Plank Shoulder Taps', durationSeconds: 45, reps: '20 taps', instructions: 'In plank position, tap opposite shoulder without swaying hips.', targetArea: 'Core & Arms' },
      { name: 'Jumping Jacks Finisher', durationSeconds: 60, reps: 'Continuous', instructions: 'All-out effort for final burst.', targetArea: 'Cardio' }
    ]
  },
  {
    _id: 'w5',
    title: '30-Minute Total Fitness Strength',
    description: 'Comprehensive 30-minute strength and endurance session designed for longer free gaps in your schedule.',
    durationMinutes: 30,
    category: 'Full Body Strength',
    difficulty: 'Advanced',
    equipmentRequired: 'Bodyweight / Dumbbells Optional',
    estimatedCalories: 250,
    icon: 'Dumbbell',
    exercises: [
      { name: 'Dynamic Warm-up & Leg Swings', durationSeconds: 120, reps: '2 mins', instructions: 'Prepare joints and elevate body temperature.', targetArea: 'Full Body' },
      { name: 'Jump Squats or Deep Squats', durationSeconds: 60, reps: '15 reps', instructions: 'Explode up off toes at top of movement.', targetArea: 'Explosive Legs' },
      { name: 'Decline or Standard Push-ups', durationSeconds: 60, reps: '15 reps', instructions: 'Slow eccentric control on the way down.', targetArea: 'Chest & Shoulders' },
      { name: 'Walking Lunges with Torso Twist', durationSeconds: 60, reps: '12 steps', instructions: 'Twist torso towards front leg at bottom of stride.', targetArea: 'Legs & Core' },
      { name: 'Tricep Dips on Chair/Bench', durationSeconds: 60, reps: '15 reps', instructions: 'Lower hips straight down, push back up using triceps.', targetArea: 'Triceps' },
      { name: 'Side Plank Holds', durationSeconds: 60, reps: '30s per side', instructions: 'Stack feet, lift hips high off ground.', targetArea: 'Obliques' },
      { name: 'Full Body Cooldown Stretch', durationSeconds: 180, reps: '3 mins', instructions: 'Hold stretches for hamstrings, quads, chest, and back.', targetArea: 'Flexibility' }
    ]
  }
];

let memoryWorkouts = [...initialWorkouts];

// Get all workouts with optional filters
exports.getWorkouts = async (req, res) => {
  try {
    const { category, maxDuration, difficulty } = req.query;

    let workouts = [];
    if (!isFallback()) {
      try {
        let query = {};
        if (category) query.category = category;
        if (difficulty) query.difficulty = difficulty;
        if (maxDuration) query.durationMinutes = { $lte: Number(maxDuration) };
        workouts = await Workout.find(query);
        if (workouts.length === 0 && !category && !maxDuration) {
          workouts = memoryWorkouts;
        }
      } catch (e) {
        workouts = memoryWorkouts;
      }
    } else {
      workouts = memoryWorkouts;
    }

    // Filter memory list if needed
    let filtered = workouts;
    if (category) filtered = filtered.filter(w => w.category === category);
    if (difficulty) filtered = filtered.filter(w => w.difficulty === difficulty);
    if (maxDuration) filtered = filtered.filter(w => w.durationMinutes <= Number(maxDuration));

    res.json({
      success: true,
      count: filtered.length,
      workouts: filtered
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Smart recommendation algorithm based on free gap duration
exports.recommendWorkouts = async (req, res) => {
  try {
    const availableMinutes = Number(req.query.duration) || 15;

    let workouts = [];
    if (!isFallback()) {
      try {
        workouts = await Workout.find({ durationMinutes: { $lte: availableMinutes } });
        if (workouts.length === 0) {
          workouts = memoryWorkouts.filter(w => w.durationMinutes <= availableMinutes);
        }
      } catch (e) {
        workouts = memoryWorkouts.filter(w => w.durationMinutes <= availableMinutes);
      }
    } else {
      workouts = memoryWorkouts.filter(w => w.durationMinutes <= availableMinutes);
    }

    // Sort by best match (closest duration to available time)
    workouts.sort((a, b) => b.durationMinutes - a.durationMinutes);

    res.json({
      success: true,
      availableMinutes,
      recommendedCount: workouts.length,
      recommendedWorkouts: workouts
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get workout by ID
exports.getWorkoutById = async (req, res) => {
  try {
    const { id } = req.params;
    let workout = memoryWorkouts.find(w => w._id === id);

    if (!isFallback()) {
      try {
        const dbWorkout = await Workout.findById(id);
        if (dbWorkout) workout = dbWorkout;
      } catch (e) {
        // use memory
      }
    }

    if (!workout) {
      return res.status(404).json({ success: false, message: 'Workout not found' });
    }

    res.json({ success: true, workout });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports.initialWorkouts = initialWorkouts;
