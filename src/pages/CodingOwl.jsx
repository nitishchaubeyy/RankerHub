import React from "react";
import { BookOpen, Timer, Plus, Check } from "lucide-react";
import { habitCards, weeklyHeatmap } from "../data/streaks";
import Card from "../components/ui/Card";
import SectionHeader from "../components/ui/SectionHeader";
import ComingSoonCard from "../components/ui/ComingSoonCard";

export const CodingOwl = () => {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <SectionHeader
        title="CodingOwl Streak Tracker"
        subtitle="Stay consistent, build ironclad coding habits, and earn points with our companion owl."
        badge="Consistency mascot"
        badgeColor="bg-orange-500/10 text-orange-500 dark:text-orange-400 border border-orange-500/20"
      />

      <ComingSoonCard
        title="Consistency Tracking Engine - Coming Soon"
        description="Our browser habit auditing engine is under active evaluation. Automatic verification of daily commits and IDE focus sessions will be available in our production release. Current logs represent simulated streak progress."
        icon={BookOpen}
        features={[
          "Mascot mood evolution levels",
          "Automatic GitHub commit tracking audits",
          "Focus mode timer analytics sync",
          "Streak multiplier score multipliers"
        ]}
        estimatedArrival="Q3 2026"
        showHourglass={true}
      />

      {/* Mascot & Streak Highlight */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Mascot bubble */}
        <Card className="lg:col-span-2 p-8 flex flex-col sm:flex-row items-center gap-6 bg-gradient-to-br from-orange-500/10 via-slate-50/0 to-slate-50/0 dark:from-orange-500/5 dark:via-slate-900/0 dark:to-slate-900/0 border-orange-500/15">
          {/* Mascot Mascot representation */}
          <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-orange-400 to-red-500 flex items-center justify-center text-4xl shadow-lg border border-orange-400/25 flex-shrink-0 animate-bounce">
            🦉
          </div>

          <div className="space-y-3 flex-1 text-center sm:text-left">
            <h3 className="text-xl font-extrabold text-slate-950 dark:text-white my-0">
              Mascot: Oliver the Owl
            </h3>
            
            <div className="bg-white/80 dark:bg-slate-950/60 p-4 rounded-xl border border-slate-200/40 dark:border-slate-800/45 text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-semibold italic relative">
              "Whoo-whoo! You've logged code for 12 consecutive days, Indresh. Oliver is proud! Maintain your streak today to earn a 1.5x points multiplier."
            </div>
            
            <div className="flex justify-center sm:justify-start items-center gap-4 text-xs font-bold text-slate-400">
              <span>Mood: <span className="text-orange-500">Ecstatic! 🔥</span></span>
              <span>•</span>
              <span>Next Check-in: 8 hours remaining</span>
            </div>
          </div>
        </Card>

        {/* Focus Timer Session Card */}
        <Card className="p-6 flex flex-col justify-between">
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase">Focus Arena</span>
            <h3 className="text-lg font-extrabold text-slate-950 dark:text-white my-0">
              Focus Mode Session
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Lock out distractions and log heads-down coding time.
            </p>
          </div>

          {/* Timer visualization */}
          <div className="my-6 text-center">
            <span className="text-4xl font-black text-slate-900 dark:text-white tracking-widest block font-mono">
              25:00
            </span>
            <span className="text-[10px] text-slate-400 uppercase font-bold mt-1.5 block">
              Pomodoro Interval
            </span>
          </div>

          <button
            disabled
            className="w-full py-2.5 rounded-xl font-bold bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border border-slate-300/10 cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Timer className="w-4 h-4" /> Start Focus
          </button>
        </Card>

      </div>

      {/* Habits Checklist Grid */}
      <div className="space-y-4">
        <h3 className="font-extrabold text-lg text-slate-900 dark:text-white my-0">
          Your Habit Dashboard
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {habitCards.map((habit) => (
            <Card key={habit.id} className="p-5 flex flex-col justify-between border-slate-200/50 dark:border-slate-800/50 hover:border-orange-500/25 transition-all">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-orange-500/10 text-orange-500 dark:text-orange-400 border border-orange-500/20">
                    {habit.frequency}
                  </span>
                  
                  <span className="text-xs font-bold text-orange-500 dark:text-orange-400 flex items-center gap-0.5">
                    🔥 {habit.streak}d
                  </span>
                </div>

                <h4 className="font-extrabold text-slate-900 dark:text-white leading-tight my-0">
                  {habit.title}
                </h4>
                
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                  {habit.description}
                </p>
              </div>

              {/* Progress Slider */}
              <div className="mt-6 pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-2">
                <div className="flex justify-between items-center text-[10px] font-bold text-slate-400">
                  <span>Today's status</span>
                  <span className={habit.progress === 100 ? "text-emerald-500" : "text-slate-400"}>
                    {habit.progress === 100 ? "Completed" : "In Progress"}
                  </span>
                </div>
                
                <button
                  disabled
                  className="w-full py-1.5 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border border-slate-300/5 cursor-not-allowed flex items-center justify-center gap-1"
                >
                  {habit.progress === 100 ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />} Mark Complete
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* 4 Weeks Consistency heatmap representation */}
      <Card className="p-6">
        <div className="pb-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-lg text-slate-900 dark:text-white my-0">
              Weekly Consistency Grid
            </h3>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              A historical log of your daily check-in marks.
            </p>
          </div>
          <span className="text-xs font-bold text-orange-500">Last 4 Weeks</span>
        </div>

        <div className="mt-6 grid grid-cols-4 gap-6">
          {weeklyHeatmap.map((week, idx) => (
            <div key={idx} className="space-y-3">
              <span className="text-xs font-bold text-slate-400 block text-center">
                Week {week.week}
              </span>
              
              <div className="flex justify-between items-center gap-1.5 py-3 px-4 rounded-xl bg-slate-50 dark:bg-slate-950/30 border border-slate-200/40 dark:border-slate-800/40">
                {week.days.map((day, dayIdx) => (
                  <div
                    key={dayIdx}
                    className={`w-3 h-3 rounded-full ${
                      day === 2
                        ? "bg-gradient-to-r from-orange-500 to-red-500 shadow-md shadow-orange-500/20"
                        : day === 1
                          ? "bg-orange-500/40 dark:bg-orange-500/20"
                          : "bg-slate-200 dark:bg-slate-800/50"
                    }`}
                    title={`Day status: ${day}`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-6 mt-6 text-xs text-slate-400 font-bold">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-200 dark:bg-slate-800" />
            <span>Missed</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-orange-500/20" />
            <span>Logged</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-orange-500 to-red-500" />
            <span>Bonus Multiplier Achieved</span>
          </div>
        </div>
      </Card>

    </div>
  );
};

export default CodingOwl;
