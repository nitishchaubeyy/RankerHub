import React, { useState } from "react";
import { Code2, Target, CheckCircle2, Award, Play, X, Terminal, Check, Settings, RefreshCw } from "lucide-react";
import Card from "../components/ui/Card";
import SectionHeader from "../components/ui/SectionHeader";
import GradientButton from "../components/ui/GradientButton";

export const CodingVerse = () => {
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [editorCode, setEditorCode] = useState("");
  const [consoleLogs, setConsoleLogs] = useState([]);
  const [running, setRunning] = useState(false);
  const [validated, setValidated] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("JavaScript");

  const categories = [
    { name: "Arrays & Hashing", count: 48, solved: 12, icon: Target },
    { name: "Two Pointers & Sliders", count: 32, solved: 8, icon: Code2 },
    { name: "Stacks & Queues", count: 24, solved: 4, icon: CheckCircle2 },
    { name: "Trees & Graphs", count: 56, solved: 15, icon: Award }
  ];

  const recentChallenges = [
    { id: 1, title: "Two Sum", difficulty: "Easy", diffColor: "text-emerald-500 bg-emerald-500/10 border-emerald-500/25", xp: "+20 XP", category: "Arrays & Hashing" },
    { id: 2, title: "Longest Substring Without Repeating", difficulty: "Medium", diffColor: "text-amber-500 bg-amber-500/10 border-amber-500/25", xp: "+40 XP", category: "Two Pointers" },
    { id: 3, title: "Merge k Sorted Lists", difficulty: "Hard", diffColor: "text-red-500 bg-red-500/10 border-red-500/25", xp: "+80 XP", category: "Linked Lists" },
    { id: 4, title: "Trapping Rain Water", difficulty: "Hard", diffColor: "text-red-500 bg-red-500/10 border-red-500/25", xp: "+80 XP", category: "Arrays & Hashing" }
  ];

  const defaultTemplates = {
    JavaScript: "function solve(input) {\n  // Write your code here\n  console.log('Running code...');\n  return true;\n}",
    Python: "def solve(input_data):\n    # Write your code here\n    print('Running code...')\n    return True",
    Go: "package main\n\nimport \"fmt\"\n\nfunc solve(input string) bool {\n    // Write your code here\n    fmt.Println(\"Running code...\")\n    return true\n}",
    Rust: "fn solve(input: &str) -> bool {\n    // Write your code here\n    println!(\"Running code...\");\n    true\n}"
  };

  const handleOpenChallenge = (challenge) => {
    setActiveChallenge(challenge);
    setEditorCode(defaultTemplates[selectedLanguage]);
    setConsoleLogs(["Environment loaded.", "Ready to compile. Click 'Run Code' to execute test cases."]);
    setValidated(false);
  };

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    setEditorCode(defaultTemplates[lang]);
  };

  const handleRunCode = () => {
    setRunning(true);
    setConsoleLogs((prev) => [...prev, "> Compiling and running tests..."]);
    
    setTimeout(() => {
      setRunning(false);
      setConsoleLogs((prev) => [
        ...prev,
        "> Running Test Case 1: Success",
        "> Running Test Case 2: Success",
        "✔ All local tests passed! Ready to submit solutions."
      ]);
    }, 1500);
  };

  const handleSubmitCode = () => {
    setRunning(true);
    setTimeout(() => {
      setRunning(false);
      setValidated(true);
      setConsoleLogs((prev) => [
        ...prev,
        "> Submitting solution to live servers...",
        "🎉 Success! Challenge solved successfully. Earned " + (activeChallenge.xp || "+80 XP") + "!"
      ]);
    }, 1200);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <SectionHeader
        title="CodingVerse Arena"
        subtitle="Test your engineering skills with daily coding assignments, mock interviews, and tournaments."
        badge="Practice Hub"
      />

      {/* Hero Daily Challenge Panel */}
      <Card className="p-8 relative overflow-hidden bg-gradient-to-br from-purple-600/10 via-slate-50/0 to-slate-50/0 dark:from-purple-600/5 dark:via-slate-900/0 dark:to-slate-900/0 border-purple-500/15">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-4">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/20 uppercase tracking-wider">
              Daily Featured Challenge
            </span>
            
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white my-0 leading-tight">
              Edit Distance (Levensthein)
            </h2>
            
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed">
              Given two strings <code className="bg-slate-200/50 dark:bg-slate-800/80 px-1.5 py-0.5 rounded text-xs">word1</code> and <code className="bg-slate-200/50 dark:bg-slate-800/80 px-1.5 py-0.5 rounded text-xs">word2</code>, return the minimum number of operations required to convert <code className="bg-slate-200/50 dark:bg-slate-800/80 px-1.5 py-0.5 rounded text-xs">word1</code> to <code className="bg-slate-200/50 dark:bg-slate-800/80 px-1.5 py-0.5 rounded text-xs">word2</code>. You have three permitted operations: Insert, Delete, or Replace.
            </p>

            <div className="flex items-center gap-4 text-xs font-bold text-slate-500 pt-2">
              <span className="flex items-center gap-1">Difficulty: <span className="text-red-500">Hard (80 XP)</span></span>
              <span>•</span>
              <span>Target Time: 45 mins</span>
            </div>
          </div>

          <button
            onClick={() => handleOpenChallenge({ title: "Edit Distance (Levensthein)", xp: "+80 XP", difficulty: "Hard" })}
            className="w-full lg:w-auto px-8 py-3.5 rounded-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-750 hover:to-indigo-750 text-white shadow-lg shadow-purple-500/15 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-105 active:scale-100"
          >
            <Play className="w-4 h-4 fill-white" /> Start Challenge
          </button>
        </div>
      </Card>

      {/* Grid Layout: Category list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <Card key={idx} className="p-5 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800/60 w-11 h-11 flex items-center justify-center text-slate-500 border border-slate-200/20 dark:border-slate-800/20 group-hover:scale-110 transition-transform duration-200">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 dark:text-white leading-tight">
                    {cat.name}
                  </h3>
                  <span className="text-xs text-slate-400 font-semibold block mt-1">
                    {cat.count} Challenges Available
                  </span>
                </div>
              </div>

              {/* Progress */}
              <div className="mt-6 pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-1">
                <div className="flex justify-between text-[10px] font-bold text-slate-400">
                  <span>Solved</span>
                  <span>{cat.solved} / {cat.count}</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${(cat.solved / cat.count) * 100}%` }}
                    className="h-full bg-purple-600 rounded-full"
                  />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Sub List: Challenge Catalog Table */}
      <Card className="p-6">
        <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
          <h3 className="font-extrabold text-lg text-slate-900 dark:text-white my-0">
            Algorithmic Catalog
          </h3>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
            Solve problems to increase your global ranking XP.
          </p>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800/40 text-sm mt-4">
          {recentChallenges.map((item) => (
            <div
              key={item.id}
              className="py-4 flex items-center justify-between gap-4 hover:bg-slate-50/50 dark:hover:bg-slate-900/10 transition-colors rounded-xl px-2"
            >
              <div className="flex items-center gap-3">
                <div className="w-8.5 h-8.5 rounded-lg bg-slate-100 dark:bg-slate-800/80 flex items-center justify-center text-slate-400 border border-slate-200/10 dark:border-slate-800/10">
                  <Code2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-950 dark:text-slate-200 leading-tight">
                    {item.title}
                  </h4>
                  <span className="text-[10px] text-slate-400 font-semibold mt-0.5 block">
                    {item.category}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className={`px-2.5 py-0.5 text-[9px] font-bold rounded-full border ${item.diffColor}`}>
                  {item.difficulty}
                </span>

                <span className="text-xs font-bold text-purple-600 dark:text-purple-400">
                  {item.xp}
                </span>

                <button
                  onClick={() => handleOpenChallenge(item)}
                  className="px-3.5 py-1.5 text-xs font-bold rounded-lg bg-purple-600 hover:bg-purple-700 text-white border border-purple-500/20 transition-all cursor-pointer hover:scale-105 active:scale-100"
                >
                  Solve
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Editor sandbox modal */}
      {activeChallenge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            onClick={() => setActiveChallenge(null)}
            className="absolute inset-0 bg-slate-900/40 dark:bg-slate-950/70 backdrop-blur-md"
          />

          {/* Editor Box */}
          <div className="relative w-full max-w-4xl h-[85vh] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-6 flex flex-col gap-4 text-slate-800 dark:text-slate-100 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="space-y-1">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                  <Terminal className="w-3.5 h-3.5" /> Compiler Playground
                </span>
                <h3 className="text-xl font-black text-slate-950 dark:text-white leading-tight my-0">
                  {activeChallenge.title}
                </h3>
              </div>
              
              <button
                onClick={() => setActiveChallenge(null)}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Split layout: editor & terminal */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 min-h-0">
              {/* Left description */}
              <div className="p-4 bg-slate-50 dark:bg-slate-950/30 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 overflow-y-auto space-y-4 text-sm font-semibold">
                <h4 className="text-xs uppercase text-slate-400 tracking-wider font-extrabold my-0">Problem details</h4>
                <p className="text-slate-600 dark:text-slate-350">
                  Implement logic for the challenge. Write clean code and use the standard helper functions. Click 'Run Code' to validate against unit test cases.
                </p>
                <div>
                  <span className="block text-xs text-slate-400">Awarded Points</span>
                  <span className="text-purple-600 dark:text-purple-400 font-black">{activeChallenge.xp || "+80 XP"} XP</span>
                </div>
                <div>
                  <span className="block text-xs text-slate-400 font-semibold mb-2">Language Selection</span>
                  <div className="flex flex-wrap gap-1.5">
                    {["JavaScript", "Python", "Go", "Rust"].map((lang) => (
                      <button
                        key={lang}
                        onClick={() => handleLanguageChange(lang)}
                        className={`px-2 py-1 text-[10px] font-bold rounded-lg border cursor-pointer transition-all ${
                          selectedLanguage === lang
                            ? "bg-purple-600 border-purple-600 text-white shadow-sm"
                            : "border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Editor + Console column */}
              <div className="md:col-span-2 flex flex-col gap-4 min-h-0">
                {/* Editor Textarea */}
                <div className="flex-1 flex flex-col border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-slate-950">
                  <div className="h-9 bg-slate-900 border-b border-slate-800 px-4 flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <span>source code</span>
                    <span className="text-slate-400">{selectedLanguage}</span>
                  </div>
                  <textarea
                    value={editorCode}
                    onChange={(e) => setEditorCode(e.target.value)}
                    className="flex-1 p-4 bg-transparent border-none outline-none font-mono text-xs text-emerald-400 resize-none leading-relaxed"
                  />
                </div>

                {/* Console Terminal */}
                <div className="h-44 flex flex-col border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-slate-950 font-mono text-xs">
                  <div className="h-9 bg-slate-900 border-b border-slate-800 px-4 flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <span>Terminal output</span>
                    <button
                      onClick={() => setConsoleLogs([])}
                      className="text-[10px] text-slate-500 hover:text-slate-350 cursor-pointer"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="flex-1 p-3 overflow-y-auto space-y-1 text-slate-300 scrollbar-none">
                    {consoleLogs.map((log, idx) => (
                      <div
                        key={idx}
                        className={
                          log.startsWith("✔") || log.startsWith("🎉")
                            ? "text-emerald-400 font-bold"
                            : log.startsWith(">")
                            ? "text-purple-400"
                            : "text-slate-400"
                        }
                      >
                        {log}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Settings className="w-3.5 h-3.5" /> sandbox active
              </span>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleRunCode}
                  disabled={running}
                  className="px-5 py-2.5 text-xs font-bold rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
                >
                  {running ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-current" />} Run Code
                </button>
                <GradientButton
                  onClick={handleSubmitCode}
                  disabled={running || validated}
                  className="px-6 py-2.5 text-xs font-bold flex items-center gap-1.5"
                >
                  {running ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5 stroke-[3px]" />} Submit Solution
                </GradientButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodingVerse;