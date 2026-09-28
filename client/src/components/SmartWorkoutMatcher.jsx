import React, { useState } from 'react';
import { Dumbbell, Clock, Flame, Play, Filter, Check, Zap, Maximize, Shield } from 'lucide-react';

export default function SmartWorkoutMatcher({ workouts, selectedGap, onStartWorkout }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [maxDuration, setMaxDuration] = useState(selectedGap ? selectedGap.durationMinutes : 30);

  const categories = ['All', 'Desk & Chair Stretch', 'Quick Cardio', 'HIIT Blast', 'Core & Abs', 'Full Body Strength'];

  // Filter logic
  const filteredWorkouts = workouts.filter((w) => {
    const matchesCategory = selectedCategory === 'All' || w.category === selectedCategory;
    const matchesDuration = w.durationMinutes <= maxDuration;
    return matchesCategory && matchesDuration;
  });

  return (
    <div className="space-y-8">
      {/* Header & Gap Indicator */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Dumbbell className="w-6 h-6 text-emerald-400" />
            Smart Micro-Workout Library
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Choose routines tailored to your available free minutes and workspace setup.
          </p>
        </div>

        {selectedGap && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 px-4 py-2 rounded-xl flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span className="text-xs text-slate-300 font-medium">Active Slot:</span>
            <span className="text-xs font-bold text-emerald-400">{selectedGap.title} ({selectedGap.durationMinutes}m)</span>
          </div>
        )}
      </div>

      {/* Filter Controls */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-emerald-400" /> Filter Options
          </span>

          <span className="text-xs text-slate-400 font-semibold">
            Showing workouts ≤ <span className="text-emerald-400 font-bold">{maxDuration} mins</span>
          </span>
        </div>

        {/* Duration Quick Buttons */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs text-slate-400 font-medium mr-2">Available Time:</span>
          {[5, 10, 15, 20, 30].map((dur) => (
            <button
              key={dur}
              onClick={() => setMaxDuration(dur)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                maxDuration === dur
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {dur} Mins
            </button>
          ))}
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400 font-medium mr-2">Category:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  : 'bg-slate-800/60 text-slate-400 hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Workouts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorkouts.length > 0 ? (
          filteredWorkouts.map((workout) => (
            <div
              key={workout._id}
              className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    {workout.durationMinutes} MIN ROUTINE
                  </span>

                  <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-amber-400" />
                    ~{workout.estimatedCalories} kcal
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                  {workout.title}
                </h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  {workout.description}
                </p>

                <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-2 text-xs text-slate-300">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Category:</span>
                    <span className="font-semibold">{workout.category}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Equipment:</span>
                    <span className="font-semibold text-emerald-300">{workout.equipmentRequired}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Exercises:</span>
                    <span className="font-semibold">{workout.exercises?.length || 0} moves</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4">
                <button
                  onClick={() => onStartWorkout(workout)}
                  className="w-full gradient-btn py-2.5 rounded-xl font-bold text-xs text-slate-950 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Start Live Workout</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 glass-panel rounded-2xl">
            <p className="text-slate-400 text-sm">No micro-workouts found for the selected criteria.</p>
            <button
              onClick={() => {
                setMaxDuration(30);
                setSelectedCategory('All');
              }}
              className="mt-3 text-xs text-emerald-400 underline font-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
