import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Trophy, ChevronRight } from "lucide-react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useAuth } from "../../context/AuthContext";
import Card from "../ui/Card";

export const RankPreview = () => {
  const { user } = useAuth();
  const [topThree, setTopThree] = useState([]);
  const [loading, setLoading] = useState(true);

  const medalColors = {
    1: "bg-amber-500 text-white shadow-[0_0_15px_rgba(245,158,11,0.4)]",
    2: "bg-slate-300 text-slate-900 border border-slate-400/30",
    3: "bg-orange-600 text-white"
  };

  useEffect(() => {
    if (!user) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 0);
      return () => clearTimeout(timer);
    }

    const q = query(
      collection(db, "users"),
      where("onboardingStatus", "==", "complete")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const users = [];
        snapshot.forEach((doc) => {
          users.push(doc.data());
        });

        // Sort by totalPoints descending
        users.sort((a, b) => (b.points?.totalPoints || 0) - (a.points?.totalPoints || 0));

        // Slice top 3
        const top3 = users.slice(0, 3).map((u, i) => ({
          ...u,
          rank: i + 1
        }));

        setTopThree(top3);
        setLoading(false);
      },
      (error) => {
        console.error("RankPreview query failed:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  return (
    <Card className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h3 className="font-extrabold text-lg text-slate-900 dark:text-white my-0">Leaderboard Preview</h3>
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
        {loading ? (
          <div className="h-full flex items-center justify-center py-10">
            <div className="w-5 h-5 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : topThree.length > 0 ? (
          topThree.map((user) => (
            <div
              key={user.uid}
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
                    @{user.githubUsername} • {user.githubStats?.primaryLanguage || "JavaScript"}
                  </span>
                </div>
              </div>

              {/* Points / Streak */}
              <div className="text-right">
                <span className="block text-sm font-extrabold text-slate-900 dark:text-white leading-tight">
                  {user.points?.totalPoints?.toLocaleString() || 0}
                </span>
                <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-orange-500 dark:text-orange-400">
                  🔥 {user.streak ?? 0}d streak
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-xs text-center text-slate-400 py-10">No ranked users yet</p>
        )}
      </div>
    </Card>
  );
};

export default RankPreview;
