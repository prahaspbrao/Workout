import React from 'react';
import { Clock, Dumbbell, Flame, Sparkles, ArrowRight, Play, CheckCircle2, ShieldAlert, Zap } from 'lucide-react';

export default function Dashboard({ stats, freeGaps, onSelectGap, onStartWorkout, setActiveTab }) {
  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-900/40 via-slate-900 to-teal-900/40 border border-emerald-500/20 p-6 sm:p-8">
        <div className="absolute right-0 top-0 opacity-10 blur-xl pointer-events-none w-96 h-96 bg-emerald-400 rounded-full"></div>
        
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Stop Wasting Free Time
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Turn Daily Schedule Downtime into <span className="text-emerald-400">Smart Workouts</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Don't let 10 or 15-minute breaks disappear into unproductive scrolling. FitTime automatically analyzes your daily schedule, extracts free time gaps, and pairs them with high-efficiency micro-workouts.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => setActiveTab('schedule')}
              className="gradient-btn px-5 py-2.5 rounded-xl font-semibold text-slate-950 flex items-center gap-2 text-sm"
            >
              <span>Manage Daily Schedule</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('workouts')}
              className="bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all"
            >
              Browse Workout Library
            </button>
          </div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-xl border border-slate-800 hover:border-emerald-500/30 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Time Saved</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <Clock className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold text-white">{stats?.timeSavedFromWasting || 0}</span>
            <span className="text-xs text-slate-400 ml-1">mins saved</span>
          </div>
          <p className="text-xs text-emerald-400 mt-2 flex items-center gap-1 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" /> Reclaimed downtime
          </p>
        </div>

        <div className="glass-panel p-5 rounded-xl border border-slate-800 hover:border-amber-500/30 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Calories Burned</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <Flame className="w-4 h-4 text-amber-400" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold text-white">{stats?.totalCalories || 0}</span>
            <span className="text-xs text-slate-400 ml-1">kcal</span>
          </div>
          <p className="text-xs text-amber-400 mt-2 font-medium">
            🔥 High efficiency burn
          </p>
        </div>

        <div className="glass-panel p-5 rounded-xl border border-slate-800 hover:border-teal-500/30 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Micro-Workouts</span>
            <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center">
              <Dumbbell className="w-4 h-4 text-teal-400" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold text-white">{stats?.completedWorkoutsCount || 0}</span>
            <span className="text-xs text-slate-400 ml-1">sessions</span>
          </div>
          <p className="text-xs text-teal-400 mt-2 font-medium">
            ⚡ Quick consistency
          </p>
        </div>

        <div className="glass-panel p-5 rounded-xl border border-slate-800 hover:border-indigo-500/30 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Current Streak</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-indigo-400" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold text-white">{stats?.streakDays || 0}</span>
            <span className="text-xs text-slate-400 ml-1">days streak</span>
          </div>
          <p className="text-xs text-indigo-400 mt-2 font-medium">
            🎯 Active momentum
          </p>
        </div>
      </div>

      {/* Free Gap Alerts & Quick Match */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Identified Schedule Free Gaps */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-emerald-400" />
                Detected Schedule Downtime
              </h3>
              <p className="text-xs text-slate-400">Available free gaps found in your daily agenda</p>
            </div>

            <button
              onClick={() => setActiveTab('schedule')}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
            >
              <span>View Full Schedule</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {freeGaps && freeGaps.length > 0 ? (
            <div className="space-y-3">
              {freeGaps.slice(0, 3).map((gap) => (
                <div
                  key={gap._id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 hover:border-emerald-500/40 transition-all gap-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-emerald-400">{gap.durationMinutes}m</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-200">{gap.title}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Time Slot: <span className="text-emerald-400 font-mono">{gap.startTime} - {gap.endTime}</span>
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onSelectGap(gap);
                      setActiveTab('workouts');
                    }}
                    className="gradient-btn px-4 py-2 rounded-lg text-xs font-bold text-slate-950 flex items-center justify-center gap-1.5 shrink-0"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Match Workout</span>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-slate-800/30 rounded-xl border border-dashed border-slate-800">
              <ShieldAlert className="w-8 h-8 text-slate-500 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-300">No free downtime gaps detected yet</p>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                Add your classes or work sessions in the Schedule tab to calculate open windows!
              </p>
            </div>
          )}
        </div>

        {/* Quick Instant Workouts */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-1">
              <Zap className="w-5 h-5 text-amber-400" />
              Instant Free Time Workouts
            </h3>
            <p className="text-xs text-slate-400 mb-6">Have unexpected free time right now? Pick a duration:</p>

            <div className="space-y-3">
              {[
                { time: 5, name: '5-Min Desk Reset', desc: 'Posture stretch & neck roll', color: 'emerald' },
                { time: 10, name: '10-Min Energy Booster', desc: 'Rapid cardio interval', color: 'amber' },
                { time: 15, name: '15-Min Express Core', desc: 'Abs & back stability', color: 'teal' },
              ].map((item) => (
                <button
                  key={item.time}
                  onClick={() => {
                    onSelectGap({ durationMinutes: item.time, title: `${item.time} Mins Free Gap` });
                    setActiveTab('workouts');
                  }}
                  className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-800/70 border border-slate-700/60 hover:bg-slate-800 hover:border-slate-600 transition-all text-left"
                >
                  <div>
                    <span className="text-xs font-extrabold text-emerald-400 block">{item.time} MINS FREE</span>
                    <span className="text-sm font-semibold text-slate-200">{item.name}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 text-center">
            <span className="text-xs text-slate-400">💡 15 mins daily workout = 91 hours of health built per year</span>
          </div>
        </div>
      </div>
    </div>
  );
}
