import React, { useState, useEffect } from "react";
import LottiePlayer from "../components/ui/LottiePlayer";
import {
  MapPin,
  Calendar,
  Sparkles,
  Award,
  ShieldCheck,
  TrendingUp,
  Bookmark,
  CheckCircle2,
  ExternalLink,
  GitCommit,
  GitBranch,
  Star,
  Users,
  Mail,
  Building2,
  User,
  Gift,
  Copy,
  Check
} from "lucide-react";
import { Github, Twitter, Linkedin, Instagram } from "../components/ui/Icons";
import { query, collection, where, getCountFromServer } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useAuth } from "../context/AuthContext";
import successTick from "../assets/animations/succes_tick.json";
import trophyAnimation from "../assets/animations/trophy.json";
import { systemBadges } from "../constants";
import Card from "../components/ui/Card";
import SectionHeader from "../components/ui/SectionHeader";
import GradientButton from "../components/ui/GradientButton";

export const Profile = () => {
  const { userData, user } = useAuth();
  const [copied, setCopied] = useState(false);
  const [rank, setRank] = useState("Loading...");

  // Optimized rank count query
  useEffect(() => {
    if (!userData || !userData.points) return;

    const fetchRank = async () => {
      try {
        const q = query(
          collection(db, "users"),
          where("points.totalPoints", ">", userData.points.totalPoints)
        );
        const snapshot = await getCountFromServer(q);
        const currentRank = snapshot.data().count + 1;
        setRank(`#${currentRank}`);
      } catch (err) {
        console.error("Error calculating dynamic rank:", err);
        setRank("#N/A");
      }
    };

    fetchRank();
  }, [userData]);

  const handleShareProfile = () => {
    const code = userData?.referralCode || "NEWCODE";
    navigator.clipboard.writeText(`https://rankerhub.dev/#/login?ref=${code}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const totalPoints = userData?.points?.totalPoints || 0;
  const gitRankPoints = userData?.points?.gitRankPoints || 0;
  const referralPoints = userData?.points?.referralPoints || 0;
  const streakPoints = userData?.points?.streakPoints || 0;
  const codingVersePoints = userData?.points?.codingVersePoints || 0;
  const streak = userData?.streak || 1;

  const profileStats = [
    { label: "XP Points", value: totalPoints.toLocaleString(), detail: "Total Earned XP" },
    { label: "Git Rank", value: rank, detail: rank === "Loading..." ? "Calculating..." : "Global leaderboard position" },
    { label: "Active Streak", value: `${streak} Day${streak !== 1 ? "s" : ""}`, detail: "Consecutive daily logins" },
    { label: "Invites Shared", value: `${Math.floor(referralPoints / 100)} Used`, detail: "Referral code successes" }
  ];

  const githubStats = [
    { label: "Commits", value: userData?.githubStats?.commits || 0, icon: GitCommit, color: "text-blue-500 bg-blue-500/10" },
    { label: "Repositories", value: userData?.githubStats?.repos || 0, icon: GitBranch, color: "text-indigo-500 bg-indigo-500/10" },
    { label: "Stars Earned", value: userData?.githubStats?.stars || 0, icon: Star, color: "text-amber-500 bg-amber-500/10" },
    { label: "Followers", value: userData?.githubStats?.followers || 0, icon: Users, color: "text-purple-500 bg-purple-500/10" }
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <SectionHeader
        title="Developer Profile"
        subtitle="Manage your public links, view achievements, and review earned badges."
        badge="Verified Account"
        badgeColor="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
      >
        <GradientButton onClick={handleShareProfile} className="py-2.5 px-4 text-xs">
          {copied ? "Link Copied!" : "Copy Referral Link"}
        </GradientButton>
      </SectionHeader>

      {/* Hero Profile Details Card */}
      <Card className="p-8 relative overflow-hidden flex flex-col md:flex-row items-center gap-8 border-slate-200/50 dark:border-slate-800/50">
        
        {/* Glow backdrop */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Profile Avatar Frame with Active Badge indicator */}
        <div className="relative w-32 h-32 flex-shrink-0">
          <div className="w-full h-full rounded-2xl overflow-hidden ring-4 ring-violet-500/20 shadow-xl">
            <img
              src={userData?.avatar || user?.photoURL || "https://avatars.githubusercontent.com/u/9919?v=4"}
              alt="Profile Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Active status bubble */}
          <span className="absolute -bottom-1.5 -right-1.5 w-7 h-7 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 border-2 border-white dark:border-slate-900 flex items-center justify-center text-xs text-white shadow-md animate-pulse">
            🔥
          </span>
        </div>

        {/* Bio information */}
        <div className="flex-1 space-y-4 text-center md:text-left">
          <div className="space-y-1.5">
            <div className="flex items-center justify-center md:justify-start gap-2 flex-wrap">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white my-0">
                {userData?.name || "Developer"}
              </h2>
              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20">
                RankerHub PRO
              </span>
            </div>
            <span className="text-sm font-bold text-slate-400 dark:text-slate-500 block">
              @{userData?.githubUsername || "developer"} • {userData?.college || "Mumbai College"}
            </span>
          </div>

          <p className="text-slate-500 dark:text-slate-400 text-sm max-w-2xl leading-relaxed font-medium">
            Verified RankerHub platform developer located in Mumbai. Actively syncing repository activity to scale the leaderboard, sharing referral tokens, and resolving daily algorithmic arena challenges. ☕
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2 text-xs font-bold text-slate-400">
            <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-slate-400" /> Mumbai, India</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4 text-slate-400" /> Joined {userData?.createdAt ? new Date(userData.createdAt).toLocaleDateString(undefined, {month: 'long', year: 'numeric'}) : "May 2026"}
            </span>
            <span className="flex items-center gap-1 text-violet-500">
              🎫 Referral Code: <span className="font-extrabold bg-violet-500/10 px-2 py-0.5 rounded-full select-all">{userData?.referralCode || "N/A"}</span>
            </span>
          </div>

          {/* Social Links */}
          <div className="flex justify-center md:justify-start items-center gap-3 pt-2">
            {/* GitHub - always available */}
            <a
              href={`https://github.com/${userData?.githubUsername || ""}`}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl border border-slate-200/50 dark:border-slate-800/50 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm text-slate-500 transition-all hover:bg-slate-100 dark:hover:bg-slate-800"
              title="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            
            {/* LinkedIn - show only if user has set it */}
            {userData?.linkedinUrl && (
              <a
                href={userData.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl border border-slate-200/50 dark:border-slate-800/50 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm text-slate-500 transition-all hover:bg-indigo-500/10 hover:text-indigo-600"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            
            {/* Instagram - show only if user has set it */}
            {userData?.instagramHandle && (
              <a
                href={`https://instagram.com/${userData.instagramHandle}`}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl border border-slate-200/50 dark:border-slate-800/50 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm text-slate-500 transition-all hover:bg-pink-500/10 hover:text-pink-500"
                title="Instagram Profile"
              >
                <Instagram className="w-4 h-4" />
              </a>
            )}
            
            {/* Email link */}
            {(userData?.email || user?.email) && (
              <a
                href={`mailto:${userData?.email || user?.email}`}
                className="p-2.5 rounded-xl border border-slate-200/50 dark:border-slate-800/50 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm text-slate-500 transition-all hover:bg-blue-500/10 hover:text-blue-500"
                title="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            )}
          </div>

        </div>

      </Card>

      {/* Personal Details Card */}
      <Card className="p-6 border-slate-200/50 dark:border-slate-800/50">
        <div className="pb-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-lg text-slate-900 dark:text-white my-0">Personal Details</h3>
            <p className="text-xs text-slate-400 dark:text-slate-500">Information collected during onboarding — stored securely once</p>
          </div>
          <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
            <ShieldCheck className="w-3 h-3" />
            Verified
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
          {/* Full Name */}
          <div className="p-4 rounded-xl border border-slate-200/40 dark:border-slate-800/40 bg-slate-50/50 dark:bg-slate-950/20">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="p-1.5 rounded-lg bg-violet-500/10 text-violet-500"><User className="w-3.5 h-3.5" /></div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Full Name</span>
            </div>
            <span className="text-sm font-bold text-slate-900 dark:text-white">{userData?.name || "—"}</span>
          </div>

          {/* Email */}
          <div className="p-4 rounded-xl border border-slate-200/40 dark:border-slate-800/40 bg-slate-50/50 dark:bg-slate-950/20">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-500"><Mail className="w-3.5 h-3.5" /></div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email</span>
            </div>
            <span className="text-sm font-bold text-slate-900 dark:text-white break-all">{userData?.email || user?.email || "—"}</span>
          </div>

          {/* Gender */}
          <div className="p-4 rounded-xl border border-slate-200/40 dark:border-slate-800/40 bg-slate-50/50 dark:bg-slate-950/20">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="p-1.5 rounded-lg bg-pink-500/10 text-pink-500"><User className="w-3.5 h-3.5" /></div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Gender</span>
            </div>
            <span className="text-sm font-bold text-slate-900 dark:text-white capitalize">{userData?.gender || "—"}</span>
          </div>

          {/* Date of Birth */}
          <div className="p-4 rounded-xl border border-slate-200/40 dark:border-slate-800/40 bg-slate-50/50 dark:bg-slate-950/20">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="p-1.5 rounded-lg bg-orange-500/10 text-orange-500"><Calendar className="w-3.5 h-3.5" /></div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Date of Birth</span>
            </div>
            <span className="text-sm font-bold text-slate-900 dark:text-white">
              {userData?.dob ? new Date(userData.dob).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' }) : "—"}
            </span>
          </div>

          {/* City */}
          <div className="p-4 rounded-xl border border-slate-200/40 dark:border-slate-800/40 bg-slate-50/50 dark:bg-slate-950/20">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-500"><MapPin className="w-3.5 h-3.5" /></div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">City</span>
            </div>
            <span className="text-sm font-bold text-slate-900 dark:text-white">{userData?.city || "Mumbai"}</span>
          </div>

          {/* College */}
          <div className="p-4 rounded-xl border border-slate-200/40 dark:border-slate-800/40 bg-slate-50/50 dark:bg-slate-950/20">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-500"><Building2 className="w-3.5 h-3.5" /></div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">College</span>
            </div>
            <span className="text-sm font-bold text-slate-900 dark:text-white">{userData?.college || "—"}</span>
          </div>

          {/* LinkedIn */}
          <div className="p-4 rounded-xl border border-slate-200/40 dark:border-slate-800/40 bg-slate-50/50 dark:bg-slate-950/20">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-600"><Linkedin className="w-3.5 h-3.5" /></div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">LinkedIn</span>
            </div>
            {userData?.linkedinUrl ? (
              <a href={userData.linkedinUrl} target="_blank" rel="noreferrer" className="text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:underline break-all flex items-center gap-1">
                {userData.linkedinUrl.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//i, '').replace(/\/$/, '') || 'View'}
                <ExternalLink className="w-3 h-3 flex-shrink-0" />
              </a>
            ) : (
              <span className="text-sm font-bold text-slate-400">Not provided</span>
            )}
          </div>

          {/* Instagram */}
          <div className="p-4 rounded-xl border border-slate-200/40 dark:border-slate-800/40 bg-slate-50/50 dark:bg-slate-950/20">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="p-1.5 rounded-lg bg-pink-500/10 text-pink-500"><Instagram className="w-3.5 h-3.5" /></div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Instagram</span>
            </div>
            {userData?.instagramHandle ? (
              <a href={`https://instagram.com/${userData.instagramHandle}`} target="_blank" rel="noreferrer" className="text-sm font-bold text-pink-600 dark:text-pink-400 hover:underline flex items-center gap-1">
                @{userData.instagramHandle}
                <ExternalLink className="w-3 h-3 flex-shrink-0" />
              </a>
            ) : (
              <span className="text-sm font-bold text-slate-400">Not provided</span>
            )}
          </div>

          {/* Referral Code */}
          <div className="p-4 rounded-xl border border-violet-500/20 bg-violet-50/30 dark:bg-violet-950/10">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="p-1.5 rounded-lg bg-violet-500/10 text-violet-500"><Gift className="w-3.5 h-3.5" /></div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Your Referral Code</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-extrabold text-violet-700 dark:text-violet-400 select-all tracking-widest">{userData?.referralCode || "N/A"}</span>
              <button
                onClick={handleShareProfile}
                className="p-1 rounded-md hover:bg-violet-500/10 text-violet-500 transition-colors"
                title="Copy referral link"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* Grid: Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {profileStats.map((stat, idx) => (
          <Card key={idx} className="p-5 text-center flex flex-col items-center justify-center border-slate-200/50 dark:border-slate-800/50">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              {stat.label}
            </span>
            <span className="block text-2xl md:text-3xl font-black text-slate-900 dark:text-white leading-none">
              {stat.value}
            </span>
            <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 mt-1 block">
              {stat.detail}
            </span>
          </Card>
        ))}
      </div>

      {/* Grid: Verified GitHub Audit Snapshot & Points Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Verified GitHub Audit Snapshot */}
        <Card className="p-6 flex flex-col justify-between border-slate-200/50 dark:border-slate-800/50">
          <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-extrabold text-lg text-slate-900 dark:text-white my-0">GitHub Audit Snapshot</h3>
            <p className="text-xs text-slate-400 dark:text-slate-500">Verified counts fetched once on onboarding to set GitRank points</p>
          </div>

          <div className="grid grid-cols-2 gap-4 my-6">
            {githubStats.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="p-4 rounded-xl border border-slate-200/40 dark:border-slate-800/40 bg-slate-50/50 dark:bg-slate-950/20 flex items-center gap-3">
                  <div className={`p-2.5 rounded-lg ${item.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-lg font-black text-slate-900 dark:text-white leading-tight">
                      {item.value.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase mt-0.5 block">{item.label}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-400 font-semibold flex items-center justify-between">
            <span>Points mapping: Commits(+2) Repos(+5) Stars(+3) Followers(+2)</span>
            <span className="text-violet-600 dark:text-violet-400 font-bold">{gitRankPoints} GitPoints</span>
          </div>
        </Card>

        {/* Detailed Points breakdown */}
        <Card className="p-6 flex flex-col justify-between border-slate-200/50 dark:border-slate-800/50">
          <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-extrabold text-lg text-slate-900 dark:text-white my-0">Points Engine Breakdown</h3>
            <p className="text-xs text-slate-400 dark:text-slate-500">Multi-engine ratings tracking points distributions</p>
          </div>

          <div className="my-6 space-y-3.5">
            {[
              { label: "GitRank Points", value: gitRankPoints, max: Math.max(10, totalPoints), color: "bg-blue-500" },
              { label: "CodingVerse Points", value: codingVersePoints, max: Math.max(10, totalPoints), color: "bg-purple-500" },
              { label: "Streak Points", value: streakPoints, max: Math.max(10, totalPoints), color: "bg-orange-500" },
              { label: "Referral Points", value: referralPoints, max: Math.max(10, totalPoints), color: "bg-emerald-500" }
            ].map((engine, idx) => {
              const pct = Math.floor((engine.value / engine.max) * 100) || 0;
              return (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                    <span>{engine.label}</span>
                    <span>{engine.value} pts</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800/80 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${engine.color} rounded-full transition-all duration-300`} 
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-400 font-bold flex items-center justify-between">
            <span>Aggregated Rating Score</span>
            <span className="text-violet-600 dark:text-violet-400 font-extrabold text-xs">{totalPoints} TotalPoints</span>
          </div>
        </Card>

      </div>

      {/* Grid: Badges (Trophy Case) & Lotties */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Badges Box (Takes 2 cols) */}
        <Card className="lg:col-span-2 flex flex-col justify-between border-slate-200/50 dark:border-slate-800/50">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="font-extrabold text-lg text-slate-900 dark:text-white my-0">
                Badge Achievements Case
              </h3>
              <p className="text-xs text-slate-400 dark:text-slate-500">
                Unlock specialized ratings badges by hitting milestones.
              </p>
            </div>
            <Award className="w-5 h-5 text-violet-500" />
          </div>

          {/* Badges List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
            {systemBadges.map((badge) => {
              // Conditionally unlock badges dynamically!
              let unlocked = false;
              if (badge.id === "b1") unlocked = true; // Pioneer (Everyone)
              if (badge.id === "b2" && gitRankPoints >= 100) unlocked = true; // Code Warrior (100+ git points)
              if (badge.id === "b3" && streak >= 5) unlocked = true; // Streak Master (5+ streak)
              if (badge.id === "b4" && referralPoints >= 100) unlocked = true; // Referral (1+ referral code used)

              return (
                <div
                  key={badge.id}
                  className={`
                    relative overflow-hidden p-4 rounded-xl border flex items-center gap-3.5 group transition-all duration-300
                    ${unlocked 
                      ? "border-violet-500/20 bg-slate-50/50 dark:bg-slate-950/20" 
                      : "border-slate-200/30 dark:border-slate-800/20 bg-slate-100/10 dark:bg-slate-950/5 opacity-50"}
                  `}
                >
                  {unlocked && (
                    <div className="absolute right-2 top-2 w-7 h-7 flex-shrink-0 opacity-80 group-hover:scale-110 transition-transform">
                      <LottiePlayer animationData={successTick} loop={false} className="w-full h-full" />
                    </div>
                  )}

                  {/* Badge Visual Circle */}
                  <div className={`w-11 h-11 rounded-full bg-gradient-to-tr ${badge.color} text-white flex items-center justify-center font-black text-sm shadow-md`}>
                    {badge.name.charAt(0)}
                  </div>

                  <div>
                    <h4 className="font-extrabold text-slate-900 dark:text-slate-200 leading-tight flex items-center gap-1">
                      {badge.name}
                      {!unlocked && <span className="text-[8px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">Locked</span>}
                    </h4>
                    <span className="text-[10px] text-slate-400 font-semibold mt-0.5 block">
                      {badge.description}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-400 font-bold text-center">
            Dynamically unlocked based on verified database scores.
          </div>
        </Card>

        {/* Global Trophy card */}
        <Card className="flex flex-col items-center justify-center p-8 text-center relative overflow-hidden bg-gradient-to-br from-violet-600/10 to-indigo-600/10 border-violet-500/15">
          <div className="w-40 h-40 flex items-center justify-center mb-4">
            <LottiePlayer animationData={trophyAnimation} loop={true} className="w-full h-full" />
          </div>
          
          <div className="space-y-1">
            <h3 className="font-extrabold text-slate-900 dark:text-white leading-tight my-0">
              Community Champion
            </h3>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 max-w-[200px] block">
              You are globally verified inside the top 1,000 developers.
            </span>
          </div>

          <div className="mt-6 flex items-center gap-1 text-[10px] font-black text-violet-600 dark:text-violet-400 bg-white/70 dark:bg-slate-900/60 border border-violet-500/20 px-3 py-1 rounded-xl shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            RankerHub Verified Member
          </div>
        </Card>

      </div>
    </div>
  );
};

export default Profile;
