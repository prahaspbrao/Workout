import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipForward, X, CheckCircle2, Flame, Clock, Award } from 'lucide-react';

export default function WorkoutTimer({ workout, slot, onClose, onFinishWorkout }) {
  const exercises = workout.exercises || [];
  const [currentStep, setCurrentStep] = useState(0);
  const [timeLeft, setTimeLeft] = useState(exercises[0]?.durationSeconds || 30);
  const [isRunning, setIsRunning] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentExercise = exercises[currentStep] || exercises[0];

  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      if (currentStep < exercises.length - 1) {
        setCurrentStep((prev) => prev + 1);
        setTimeLeft(exercises[currentStep + 1]?.durationSeconds || 30);
      } else {
        setIsRunning(false);
        setIsCompleted(true);
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, currentStep, exercises]);

  const handleNext = () => {
    if (currentStep < exercises.length - 1) {
      setCurrentStep((prev) => prev + 1);
      setTimeLeft(exercises[currentStep + 1]?.durationSeconds || 30);
    } else {
      setIsRunning(false);
      setIsCompleted(true);
    }
  };

  const handleFinish = () => {
    onFinishWorkout({
      workoutTitle: workout.title,
      workoutCategory: workout.category,
      durationMinutes: workout.durationMinutes,
      caloriesBurned: workout.estimatedCalories,
      slotTitle: slot?.title || 'Downtime Interval'
    });
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const progressPercent = Math.round(((currentStep + 1) / exercises.length) * 100);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="w-full max-w-xl glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-500/30 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {!isCompleted ? (
          <div className="space-y-6 text-center">
            {/* Header */}
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400">
                {workout.title} ({workout.durationMinutes} MIN)
              </span>
              <h3 className="text-2xl font-black text-white mt-1">
                Step {currentStep + 1} of {exercises.length}: {currentExercise.name}
              </h3>
            </div>

            {/* Timer Ring / Display */}
            <div className="my-6 py-8 px-4 rounded-3xl bg-slate-900/80 border border-slate-800 inline-block w-full max-w-xs mx-auto relative overflow-hidden">
              <div
                className="absolute left-0 bottom-0 top-0 bg-emerald-500/10 transition-all duration-1000"
                style={{ width: `${(timeLeft / (currentExercise.durationSeconds || 30)) * 100}%` }}
              />

              <div className="relative">
                <span className="text-5xl font-black font-mono text-emerald-400 tracking-tight">
                  {formatTime(timeLeft)}
                </span>
                <p className="text-xs text-slate-400 font-semibold mt-2">
                  Target: <span className="text-slate-200">{currentExercise.targetArea}</span>
                </p>
              </div>
            </div>

            {/* Instruction Card */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-left space-y-1">
              <span className="text-[11px] font-extrabold uppercase text-amber-400 tracking-wider">Instructions:</span>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">{currentExercise.instructions}</p>
              {currentExercise.reps && (
                <p className="text-xs text-emerald-400 font-bold pt-1">Reps: {currentExercise.reps}</p>
              )}
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-slate-400 font-semibold">
                <span>Workout Progress</span>
                <span>{progressPercent}%</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-center gap-4 pt-2">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className="w-14 h-14 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-all border border-slate-700"
              >
                {isRunning ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-0.5" />}
              </button>

              <button
                onClick={handleNext}
                className="gradient-btn px-6 py-3 rounded-full font-bold text-xs text-slate-950 flex items-center gap-2"
              >
                <span>{currentStep < exercises.length - 1 ? 'Next Move' : 'Finish Session'}</span>
                <SkipForward className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Completion Celebration View */
          <div className="text-center py-6 space-y-6">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/30">
              <Award className="w-10 h-10 text-slate-950" />
            </div>

            <div>
              <h3 className="text-3xl font-black text-white">Awesome Job!</h3>
              <p className="text-emerald-400 font-semibold text-sm mt-1">
                You just converted a free gap into health momentum!
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-left">
              <div>
                <span className="text-xs text-slate-400 font-medium">Time Reclaimed</span>
                <p className="text-xl font-bold text-white flex items-center gap-1">
                  <Clock className="w-4 h-4 text-emerald-400" /> {workout.durationMinutes} mins
                </p>
              </div>

              <div>
                <span className="text-xs text-slate-400 font-medium">Est. Calorie Burn</span>
                <p className="text-xl font-bold text-amber-400 flex items-center gap-1">
                  <Flame className="w-4 h-4 text-amber-400" /> {workout.estimatedCalories} kcal
                </p>
              </div>
            </div>

            <button
              onClick={handleFinish}
              className="w-full gradient-btn py-3 rounded-xl font-extrabold text-sm text-slate-950 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>Log Session & Return</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
