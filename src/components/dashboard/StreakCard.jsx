import React from "react";
import { Flame, Check } from "lucide-react";
import { streakHistory, focusStats } from "../../data/streaks";
import Card from "../ui/Card";

export const StreakCard = () => {
  const percentComplete = Math.min(
    100,
    Math.round((focusStats.dailyProgressMins / focusStats.dailyGoalMins) * 100)
  );

  return (
    <Card className="flex flex-col h-full overflow-hidden relative">
      {/* Background orange glow */}
      <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">Streak Tracker</h3>
          <p className="text-xs text-slate-400 dark:text-slate-500">Keep up your daily coding habit</p>
        </div>
        <div className="flex items-center gap-1 text-orange-500 dark:text-orange-400 font-extrabold text-sm animate-pulse">
          <Flame className="w-5 h-5 fill-orange-500/20" />
          <span>{focusStats.activeStreak} Days</span>
        </div>
      </div>

      {/* Progress Circle & Metrics */}
      <div className="flex-1 mt-6 flex flex-col md:flex-row items-center justify-around gap-6">
        
        {/* Progress Bar Display */}
        <div className="flex-1 w-full space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>Today's Progress</span>
            <span>{focusStats.dailyProgressMins} / {focusStats.dailyGoalMins} mins</span>
          </div>

          {/* Bar track */}
          <div className="w-full h-3.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-200/20 dark:border-slate-800/20">
            <div
              style={{ width: `${percentComplete}%` }}
              className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-500"
            />
          </div>

          <div className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
            Spend 15 more minutes coding today to extend your streak.
          </div>
        </div>

        {/* Mascot state or Longest streak */}
        <div className="p-3 bg-gradient-to-br from-orange-500/5 to-red-500/5 rounded-xl border border-orange-500/10 text-center flex-shrink-0 min-w-[110px]">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Longest Streak
          </span>
          <span className="block text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
            {focusStats.longestStreak} Days
          </span>
          <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500">
            Personal Record
          </span>
        </div>

      </div>

      {/* Week day bubbles */}
      <div className="grid grid-cols-7 gap-2.5 mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80">
        {streakHistory.map((item, idx) => {
          const isDone = item.status === "completed";
          const isCurrent = item.status === "current";
          
          return (
            <div key={idx} className="flex flex-col items-center gap-1.5">
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500">
                {item.day}
              </span>
              
              <div
                className={`
                  w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-300
                  ${isDone 
                    ? "bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-md shadow-orange-500/15" 
                    : isCurrent 
                      ? "bg-orange-500/15 border border-orange-500/35 text-orange-500 animate-pulse" 
                      : "bg-slate-100 dark:bg-slate-800/40 text-slate-300 dark:text-slate-600 border border-transparent"}
                `}
                title={`${item.date}: ${item.status}`}
              >
                {isDone ? <Check className="w-3.5 h-3.5 stroke-[3px]" /> : isCurrent ? "🦉" : "?"}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default StreakCard;
