import React from "react";
import { Link } from "react-router-dom";
import { Trophy, ChevronRight } from "lucide-react";
import { leaderboardData } from "../../data/leaderboard";
import Card from "../ui/Card";

export const RankPreview = () => {
  // Grab top 3 users
  const topThree = leaderboardData.slice(0, 3);

  const medalColors = {
    1: "bg-amber-500 text-white shadow-[0_0_15px_rgba(245,158,11,0.4)]",
    2: "bg-slate-300 text-slate-900 border border-slate-400/30",
    3: "bg-orange-600 text-white"
  };

  return (
    <Card className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">Leaderboard Preview</h3>
          <p className="text-xs text-slate-400 dark:text-slate-500">Top performers this week</p>
        </div>
        <Link
          to="/gitrank"
          className="text-xs font-bold text-violet-600 dark:text-violet-400 hover:underline flex items-center gap-1 group cursor-pointer"
        >
          View all <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Ranks Cards List */}
      <div className="flex-1 mt-6 space-y-4">
        {topThree.map((user) => (
          <div
            key={user.rank}
            className="flex items-center justify-between p-3 rounded-xl border border-slate-200/40 dark:border-slate-800/40 bg-slate-50/50 dark:bg-slate-950/30 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              {/* Rank Medal */}
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${medalColors[user.rank] || "bg-slate-200"}`}>
                {user.rank === 1 ? <Trophy className="w-3.5 h-3.5" /> : user.rank}
              </div>

              {/* User Info */}
              <div className="w-9 h-9 rounded-lg overflow-hidden flex-shrink-0">
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              </div>

              <div>
                <span className="text-sm font-extrabold text-slate-900 dark:text-slate-200 block leading-tight">
                  {user.name}
                </span>
                <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 block">
                  @{user.username} • {user.language}
                </span>
              </div>
            </div>

            {/* Points / Streak */}
            <div className="text-right">
              <span className="block text-sm font-extrabold text-slate-900 dark:text-white leading-tight">
                {user.points.toLocaleString()}
              </span>
              <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-orange-500 dark:text-orange-400">
                🔥 {user.streak}d streak
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RankPreview;
