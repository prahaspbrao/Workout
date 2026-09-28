import React from 'react';
import { BarChart3, Clock, Flame, Calendar, Award, CheckCircle2 } from 'lucide-react';

export default function AnalyticsHistory({ logs, stats }) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-emerald-400" />
          Analytics & Downtime History
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Review your logged sessions and track how effectively you turn free time into physical fitness.
        </p>
      </div>

      {/* Analytics Summary Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Total Active Mins</span>
            <h3 className="text-2xl font-extrabold text-white mt-0.5">{stats?.totalActiveMinutes || 0} mins</h3>
            <p className="text-xs text-emerald-400 mt-1 font-medium">Reclaimed downtime</p>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
            <Flame className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Total Calories Burned</span>
            <h3 className="text-2xl font-extrabold text-white mt-0.5">{stats?.totalCalories || 0} kcal</h3>
            <p className="text-xs text-amber-400 mt-1 font-medium">Active expenditure</p>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center shrink-0">
            <Award className="w-6 h-6 text-indigo-400" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Workout Streak</span>
            <h3 className="text-2xl font-extrabold text-white mt-0.5">{stats?.streakDays || 0} Days</h3>
            <p className="text-xs text-indigo-400 mt-1 font-medium">Consistent daily habit</p>
          </div>
        </div>
      </div>

      {/* History Table */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Calendar className="w-5 h-5 text-emerald-400" />
          Completed Micro-Workout History
        </h3>

        {logs && logs.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-900/80 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="px-4 py-3">Workout Name</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Duration</th>
                  <th className="px-4 py-3">Calories</th>
                  <th className="px-4 py-3">Source Free Slot</th>
                  <th className="px-4 py-3">Date Completed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {logs.map((log) => (
                  <tr key={log._id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-4 py-3.5 font-bold text-white flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      {log.workoutTitle}
                    </td>
                    <td className="px-4 py-3.5 text-xs">
                      <span className="px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 font-semibold text-slate-300">
                        {log.workoutCategory}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-xs font-semibold text-emerald-400 font-mono">
                      {log.durationMinutes} mins
                    </td>
                    <td className="px-4 py-3.5 text-xs font-semibold text-amber-400 font-mono">
                      {log.caloriesBurned} kcal
                    </td>
                    <td className="px-4 py-3.5 text-xs text-slate-400">
                      {log.slotTitle}
                    </td>
                    <td className="px-4 py-3.5 text-xs text-slate-400 font-mono">
                      {new Date(log.completedAt).toLocaleDateString()} {new Date(log.completedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 text-slate-400">
            <p className="text-sm font-semibold">No workout sessions logged yet.</p>
            <p className="text-xs mt-1">Complete your first micro-workout to populate your analytics!</p>
          </div>
        )}
      </div>
    </div>
  );
}
