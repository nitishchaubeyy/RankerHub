import React from "react";
import { motion } from "framer-motion";
import { Heart, Mail } from "lucide-react";
import { Github, Linkedin, Instagram } from "../ui/Icons";

export const TeamCard = ({ username, avatar, role, description, isOwner, links, className = "" }) => {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`
        relative p-6 rounded-2xl bg-white/40 dark:bg-slate-950/40 border backdrop-blur-xl shadow-lg overflow-hidden flex flex-col sm:flex-row items-center gap-6 group transition-all duration-300
        ${isOwner 
          ? "border-violet-500/30 dark:border-violet-500/20 bg-gradient-to-tr from-slate-50/80 to-slate-100/80 dark:from-slate-900/40 dark:to-slate-950/40 hover:border-violet-500/50" 
          : "border-slate-200/50 dark:border-slate-800/50 hover:border-indigo-500/30 dark:hover:border-indigo-500/20"
        }
        ${className}
      `}
    >
      {/* Glow effect */}
      <div className={`absolute -top-12 -left-12 w-44 h-44 rounded-full blur-3xl pointer-events-none transition-all duration-500 group-hover:scale-125
        ${isOwner ? "bg-violet-500/10 dark:bg-violet-500/15" : "bg-indigo-500/5 dark:bg-indigo-500/10"}
      `} />

      {/* Subtle Dot Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#8b5cf6_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.02] pointer-events-none" />

      {/* Avatar Container */}
      <div className={`
        relative w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 border-2
        ${isOwner ? "border-violet-500/40 shadow-violet-500/10" : "border-indigo-500/20 shadow-indigo-500/5"}
        shadow-md group-hover:scale-105 transition-transform duration-300
      `}>
        <img src={avatar} alt={`${username} avatar`} className="w-full h-full object-cover" />
        
        {/* Heart Icon Overlay */}
        <div className="absolute bottom-0 right-0 bg-rose-600 text-white p-1 rounded-tl-lg shadow-sm" aria-hidden="true">
          <Heart className="w-3 h-3 fill-white stroke-white" />
        </div>
      </div>

      {/* Content */}
      <div className="space-y-2 text-center sm:text-left flex-1 relative z-10">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
          <h3 className="text-lg font-black text-slate-900 dark:text-white my-0 tracking-tight">
            {username}
          </h3>
          <span className={`
            px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border
            ${isOwner
              ? "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20"
              : "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20"
            }
          `}>
            {role}
          </span>
        </div>
        
        <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold my-0 leading-relaxed max-w-md">
          {description}
        </p>
        
        {/* Connection Links */}
        {links && (
          <div className="mt-4 pt-3 border-t border-slate-200/40 dark:border-slate-800/40 flex justify-center sm:justify-start gap-3">
            {links.github && (
              <a
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition duration-200 cursor-pointer"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {links.linkedin && (
              <a
                href={links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition duration-200 cursor-pointer"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            {links.instagram && (
              <a
                href={links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition duration-200 cursor-pointer"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            )}
            {links.email && (
              <a
                href={links.email}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition duration-200 cursor-pointer"
                title="Email Contact"
              >
                <Mail className="w-4 h-4" />
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TeamCard;
