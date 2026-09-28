import React from 'react';
import { Zap, Clock, Dumbbell, BarChart3, Calendar, Flame } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, stats }) {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Zap },
    { id: 'schedule', label: 'Schedule & Free Gaps', icon: Calendar },
    { id: 'workouts', label: 'Smart Workouts', icon: Dumbbell },
    { id: 'analytics', label: 'Analytics & History', icon: BarChart3 },
  ];

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800 bg-slate-900/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Zap className="w-6 h-6 text-slate-950 font-bold" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-200 bg-clip-text text-transparent">
                FitTime
              </h1>
              <p className="text-xs text-slate-400 font-medium hidden sm:block">
                Smart Time & Micro-Workout Optimizer
              </p>
            </div>
          </div>

          {/* Nav Tabs */}
          <nav className="flex items-center gap-1 sm:gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-inner'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <span className="hidden md:inline">{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Quick Metrics Badge */}
          <div className="hidden lg:flex items-center gap-4 text-xs font-semibold">
            <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-700/60">
              <Flame className="w-4 h-4 text-amber-400" />
              <span className="text-slate-300">Streak:</span>
              <span className="text-amber-400 font-bold">{stats?.streakDays || 0} Days</span>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-700/60">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span className="text-slate-300">Active:</span>
              <span className="text-emerald-400 font-bold">{stats?.totalActiveMinutes || 0} min</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
