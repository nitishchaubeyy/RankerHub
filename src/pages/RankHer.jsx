import React from "react";
import { Sparkles, Quote, Star } from "lucide-react";
import { womenLeaderboardData } from "../data/leaderboard";
import Card from "../components/ui/Card";
import SectionHeader from "../components/ui/SectionHeader";
import ComingSoonCard from "../components/ui/ComingSoonCard";

export const RankHer = () => {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <SectionHeader
        title="RankHer Initiative"
        subtitle="Celebrating diversity in technology. Showcasing and spotlighting top women software engineers."
        badge="Equality Focus"
        badgeColor="bg-pink-500/10 text-pink-600 dark:text-pink-400 border border-pink-500/20"
      />

      <ComingSoonCard
        title="Women In Tech Leaderboard - Coming Soon"
        description="Our community advocacy framework is in development. Registered female coders will be spotlighted, matched with top technical mentors, and automatically verified for active industry awards. Currently showcasing simulated advocate stats."
        icon={Sparkles}
        features={[
          "Verified credentials badges & awards",
          "Mentorship matchmaking matching engine",
          "Highlight spotlights and developer journals",
          "Exclusive coding challenges and workshops"
        ]}
        estimatedArrival="Q4 2026"
        showHourglass={true}
      />

      {/* Feature / Spotlights: Top Women in Tech Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {womenLeaderboardData.slice(0, 2).map((user, _idx) => (
          <Card
            key={user.rank}
            className="p-6 relative overflow-hidden flex flex-col md:flex-row items-center gap-6 border-pink-500/15"
          >
            {/* Pink glow in card */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/5 rounded-full blur-2xl pointer-events-none" />

            {/* Profile Avatar */}
            <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 ring-4 ring-pink-500/10 relative">
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              <div className="absolute bottom-1 right-1 bg-pink-500 text-white p-1 rounded-lg">
                <Star className="w-3.5 h-3.5 fill-white" />
              </div>
            </div>

            {/* Advocate description & Quote */}
            <div className="flex-1 space-y-3 text-center md:text-left">
              <div>
                <span className="text-[10px] font-bold text-pink-600 dark:text-pink-400 uppercase tracking-widest bg-pink-500/10 dark:bg-pink-500/20 px-2 py-0.5 rounded-full border border-pink-500/20">
                  {user.featuredBadge}
                </span>
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mt-2 mb-0">
                  {user.name}
                </h3>
                <span className="text-xs font-bold text-slate-400">
                  @{user.username} • {user.role}
                </span>
              </div>

              {/* Quote */}
              <div className="bg-slate-50 dark:bg-slate-950/40 p-3 rounded-xl border border-slate-200/25 dark:border-slate-800/25 relative">
                <Quote className="w-4 h-4 text-pink-300 dark:text-pink-500/40 absolute top-2 left-2" />
                <p className="text-xs italic text-slate-500 dark:text-slate-400 pl-5 pr-2 pt-1 font-medium leading-relaxed">
                  "{user.empowermentQuote}"
                </p>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-4 text-xs font-bold text-slate-500 pt-1">
                <span>Streak: <span className="text-orange-500">🔥 {user.streak}d</span></span>
                <span>Contributions: <span className="text-slate-800 dark:text-white">{user.contributions}</span></span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Empowerment Gradient Banners Section */}
      <Card className="relative overflow-hidden p-8 text-white bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 border-none shadow-[0_10px_35px_rgba(236,72,153,0.3)]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none -z-10" />
        
        <div className="max-w-2xl space-y-4">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight leading-tight my-0">
            Fostering Representation in Tech.
          </h2>
          <p className="text-sm md:text-base text-pink-50 leading-relaxed font-medium">
            Advancing diversity within technology builds more creative, inclusive solutions. The RankHer initiative highlights women software engineers, ensuring high visibility for contributions, publications, and system leadership.
          </p>
          <div className="pt-2 flex items-center gap-3">
            <span className="px-3 py-1 rounded-xl text-xs bg-white/20 text-white font-bold backdrop-blur-md">
              Gender Equity Focus
            </span>
            <span className="px-3 py-1 rounded-xl text-xs bg-white/20 text-white font-bold backdrop-blur-md">
              Career Advancement
            </span>
          </div>
        </div>
      </Card>

      {/* Mock leaderboard display */}
      <Card className="p-6">
        <div className="pb-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <h3 className="font-extrabold text-lg text-slate-900 dark:text-white my-0">
            Top Advocate Standings
          </h3>
          <span className="text-xs font-bold text-slate-400 uppercase">Simulated Standings</span>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800/40 text-sm mt-4">
          {womenLeaderboardData.map((user) => (
            <div
              key={user.rank}
              className="py-4 flex items-center justify-between gap-4 hover:bg-slate-50/50 dark:hover:bg-slate-900/10 transition-colors rounded-xl px-2"
            >
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-slate-400 w-6">
                  #{user.rank}
                </span>

                <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                </div>

                <div>
                  <span className="font-extrabold text-slate-900 dark:text-white block leading-tight">
                    {user.name}
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold block">
                    @{user.username} • {user.role}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="hidden sm:block text-right">
                  <span className="text-[10px] font-bold text-pink-500 dark:text-pink-400 bg-pink-500/10 dark:bg-pink-500/20 px-2 py-0.5 rounded-full border border-pink-500/20 uppercase tracking-wider">
                    {user.featuredBadge}
                  </span>
                </div>

                <div className="text-right min-w-[70px]">
                  <span className="block font-black text-slate-900 dark:text-white leading-none">
                    {user.points.toLocaleString()}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400">XP Points</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

    </div>
  );
};

export default RankHer;
