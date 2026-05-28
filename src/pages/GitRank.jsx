import React, { useState, useMemo } from "react";
import { Search, Filter, Star } from "lucide-react";
import { Github } from "../components/ui/Icons";

import { leaderboardData } from "../data/leaderboard";
import Card from "../components/ui/Card";
import SectionHeader from "../components/ui/SectionHeader";
import ComingSoonCard from "../components/ui/ComingSoonCard";

export const GitRank = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("All");

  const languages = ["All", "TypeScript", "Rust", "Go", "Python", "Kotlin", "Ruby", "JavaScript"];

  // Filter leaderboard items based on user inputs
  const filteredData = useMemo(() => {
    return leaderboardData.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesLang = selectedLanguage === "All" || user.language === selectedLanguage;
      
      return matchesSearch && matchesLang;
    });
  }, [searchTerm, selectedLanguage]);

  // Highlight top contributors cards (Top 3)
  const topContributors = useMemo(() => {
    return leaderboardData.slice(0, 3);
  }, []);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <SectionHeader
        title="GitRank Leaderboard"
        subtitle="Global ratings and rankings based on public GitHub repository logs."
        badge="Engine Active"
      />

      <ComingSoonCard
        title="GitHub Ranking Engine - Coming Soon"
        description="Our background sync processes are in staging. Real-time GitHub authentication and pull request auditing will be available in the next release. Currently displaying simulated developer data."
        icon={Github}
        features={[
          "OAuth GitHub integration",
          "Public/Private repo PR analytics",
          "Lines of code & review weight audits",
          "Weekly community tournament brackets"
        ]}
        estimatedArrival="Q3 2026"
        showHourglass={true}
      />

      {/* Top 3 Featured Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {topContributors.map((user, idx) => (
          <Card
            key={user.rank}
            className={`
              relative overflow-hidden flex flex-col items-center justify-between text-center p-6 border
              ${idx === 0 
                ? "bg-gradient-to-b from-amber-500/10 via-slate-50/0 to-slate-50/0 dark:from-amber-500/5 dark:via-slate-900/0 dark:to-slate-900/0 border-amber-500/30" 
                : "border-slate-200/50 dark:border-slate-800/50"}
            `}
          >
            {/* Crown/Medal Overlay for First place */}
            {idx === 0 && (
              <div className="absolute top-4 right-4 flex items-center justify-center p-1.5 rounded-full bg-amber-500 text-white shadow-md">
                <Star className="w-4 h-4 fill-white" />
              </div>
            )}

            <div className="flex flex-col items-center space-y-3">
              <span className="text-xs font-bold text-slate-400 uppercase">
                Contributor Rank #{user.rank}
              </span>
              
              {/* Profile Image */}
              <div className="w-16 h-16 rounded-2xl overflow-hidden ring-4 ring-violet-500/10">
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              </div>

              <div>
                <h4 className="text-base font-extrabold text-slate-950 dark:text-white leading-tight">
                  {user.name}
                </h4>
                <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
                  @{user.username}
                </span>
              </div>
              
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 border border-slate-300/20 dark:border-slate-700/20">
                {user.language}
              </span>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/80 w-full flex items-center justify-around text-xs">
              <div>
                <span className="block font-black text-slate-900 dark:text-white leading-none">
                  {user.contributions}
                </span>
                <span className="text-[10px] text-slate-400 font-bold uppercase mt-1 block">Commits</span>
              </div>
              <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-800" />
              <div>
                <span className="block font-black text-violet-600 dark:text-violet-400 leading-none">
                  {user.points.toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-400 font-bold uppercase mt-1 block">Points</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Leaderboard Table / Search & Filters Controls */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          {/* Search */}
          <div className="relative w-full sm:max-w-xs">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search user..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-950/20 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 dark:text-white transition-all"
            />
          </div>

          {/* Languages Filter List */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
            <Filter className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <div className="flex gap-1.5">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setSelectedLanguage(lang)}
                  className={`
                    px-2.5 py-1 text-xs font-bold rounded-lg border transition-all cursor-pointer whitespace-nowrap
                    ${selectedLanguage === lang
                      ? "bg-violet-600 border-violet-600 text-white shadow-sm"
                      : "border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-100/50 dark:hover:bg-slate-800/50"}
                  `}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Responsive Table UI */}
        <div className="overflow-x-auto">
          <table className="w-full text-left mt-4 border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800/80 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4">Rank</th>
                <th className="py-3 px-4">Developer</th>
                <th className="py-3 px-4">Focus Language</th>
                <th className="py-3 px-4 text-center">Streak</th>
                <th className="py-3 px-4 text-center">Contributions</th>
                <th className="py-3 px-4 text-right">XP Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/40 text-sm">
              {filteredData.length > 0 ? (
                filteredData.map((user) => (
                  <tr
                    key={user.rank}
                    className="hover:bg-slate-50/50 dark:hover:bg-slate-900/20 transition-colors group"
                  >
                    {/* Rank cell */}
                    <td className="py-4 px-4 font-bold text-slate-500">
                      #{user.rank}
                    </td>

                    {/* Developer profile cell */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg overflow-hidden flex-shrink-0">
                          <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <span className="font-extrabold text-slate-900 dark:text-white block group-hover:text-violet-500 transition-colors">
                            {user.name}
                          </span>
                          <span className="text-[10px] text-slate-400 font-semibold block">
                            @{user.username}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Language tag cell */}
                    <td className="py-4 px-4">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200/10 dark:border-slate-800/10">
                        {user.language}
                      </span>
                    </td>

                    {/* Streak flame cell */}
                    <td className="py-4 px-4 text-center font-bold text-orange-600 dark:text-orange-400 whitespace-nowrap">
                      🔥 {user.streak} days
                    </td>

                    {/* Contributions count cell */}
                    <td className="py-4 px-4 text-center font-bold text-slate-800 dark:text-slate-200">
                      {user.contributions}
                    </td>

                    {/* Points cell */}
                    <td className="py-4 px-4 text-right font-black text-slate-900 dark:text-white">
                      {user.points.toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-slate-400 dark:text-slate-500">
                    <p className="text-sm font-bold">No results found</p>
                    <p className="text-xs mt-1">Try adjusting your search criteria or filtering by a different language</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default GitRank;
