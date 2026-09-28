import React, { useState } from 'react';
import { Calendar, Plus, Trash2, Clock, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export default function ScheduleManager({ timeline, freeGaps, onAddSlot, onDeleteSlot, onSelectGap, setActiveTab }) {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:00');
  const [category, setCategory] = useState('Work/Study');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !startTime || !endTime) return;

    onAddSlot({ title, startTime, endTime, category });
    setTitle('');
    setShowForm(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Calendar className="w-6 h-6 text-emerald-400" />
            Daily Agenda & Downtime Extractor
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Enter your busy time blocks. FitTime automatically identifies free windows and matches workouts!
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="gradient-btn px-4 py-2.5 rounded-xl text-xs font-bold text-slate-950 flex items-center justify-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Busy Time Block</span>
        </button>
      </div>

      {/* Add Slot Modal / Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="glass-panel p-6 rounded-2xl border border-emerald-500/30 space-y-4">
          <h3 className="text-base font-bold text-emerald-400">Add New Busy Event</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Event Title</label>
              <input
                type="text"
                placeholder="e.g., Physics Lecture / Zoom Call"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-emerald-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Start Time</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-emerald-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">End Time</label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-emerald-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Work">Work</option>
                <option value="Study">Study</option>
                <option value="Class">Class</option>
                <option value="Meeting">Meeting</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="gradient-btn px-4 py-2 rounded-lg text-xs font-bold text-slate-950"
            >
              Save Event
            </button>
          </div>
        </form>
      )}

      {/* Free Gap Summary Banner */}
      <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-emerald-300">
              {freeGaps.length} Free Time Gap{freeGaps.length !== 1 ? 's' : ''} Detected Today
            </h4>
            <p className="text-xs text-slate-400">
              Total available downtime: <span className="text-emerald-400 font-bold">{freeGaps.reduce((a, b) => a + b.durationMinutes, 0)} minutes</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {freeGaps.map((gap) => (
            <button
              key={gap._id}
              onClick={() => {
                onSelectGap(gap);
                setActiveTab('workouts');
              }}
              className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold transition-all flex items-center gap-1"
            >
              <span>{gap.durationMinutes}m Gap</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          ))}
        </div>
      </div>

      {/* Daily Timeline List */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-lg font-bold text-white">Daily Timeline</h3>

        <div className="relative border-l-2 border-slate-800 ml-4 pl-6 space-y-6">
          {timeline && timeline.map((item) => {
            const isFree = item.type === 'free';
            return (
              <div key={item._id} className="relative group">
                {/* Timeline Dot */}
                <div
                  className={`absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2 ${
                    isFree
                      ? 'bg-emerald-500 border-emerald-400 shadow-md shadow-emerald-500/50'
                      : 'bg-slate-800 border-slate-600'
                  }`}
                />

                <div
                  className={`p-4 rounded-xl transition-all ${
                    isFree
                      ? 'bg-emerald-950/20 border border-emerald-500/30 hover:border-emerald-500/60'
                      : 'bg-slate-800/50 border border-slate-700/50'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-slate-400 font-semibold flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-500" />
                          {item.startTime} - {item.endTime}
                        </span>

                        <span
                          className={`text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-md ${
                            isFree
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-slate-700 text-slate-300'
                          }`}
                        >
                          {isFree ? `${item.durationMinutes} Min Free Downtime` : item.category}
                        </span>
                      </div>

                      <h4 className={`text-base font-bold mt-1 ${isFree ? 'text-emerald-300' : 'text-slate-200'}`}>
                        {item.title}
                      </h4>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {isFree ? (
                        <button
                          onClick={() => {
                            onSelectGap(item);
                            setActiveTab('workouts');
                          }}
                          className="gradient-btn px-4 py-2 rounded-lg text-xs font-bold text-slate-950 flex items-center gap-1.5"
                        >
                          <span>Use for Workout</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <button
                          onClick={() => onDeleteSlot(item._id)}
                          className="p-2 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-all"
                          title="Remove Event"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
