import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Progress } from "./ui/progress";
import { RANKS, getRankIndex, getRank, getNextRank } from "../game/rank";
import { Medal, Lock, CheckCircle2 } from "lucide-react";

export const RankBadge = ({ score, open, setOpen }) => {
  const rank = getRank(score);
  const idx = getRankIndex(score);
  const next = getNextRank(score);
  const pct = next
    ? Math.min(100, Math.round(((score - rank.min) / (next.min - rank.min)) * 100))
    : 100;

  return (
    <>
      <button
        data-testid="rank-badge-button"
        onClick={() => setOpen(true)}
        className="brass-frame rounded-full pl-2 pr-4 py-1.5 flex items-center gap-2 hover:scale-[1.03] transition"
        title="Your Alchemist Rank"
      >
        <span className="w-7 h-7 rounded-full bg-gradient-to-b from-amber-300 to-amber-700 flex items-center justify-center text-black">
          <Medal size={16} />
        </span>
        <span className="text-left leading-none">
          <span className="block text-[9px] uppercase tracking-widest text-amber-400/70 font-rune">Rank</span>
          <span data-testid="rank-title" className="block text-sm font-serif text-amber-100">{rank.title}</span>
        </span>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent data-testid="rank-dialog" className="brass-frame border-amber-500/40 max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl gilded-text">Your Alchemist Rank</DialogTitle>
            <DialogDescription className="sr-only">Your current alchemist rank and progress toward the next title.</DialogDescription>
          </DialogHeader>

          <div className="space-y-1 mb-2">
            <p className="text-sm text-slate-300 italic">"{rank.blurb}"</p>
            {next ? (
              <>
                <div className="flex justify-between text-xs text-amber-300/80 font-rune pt-2">
                  <span>{rank.title}</span>
                  <span>{score} / {next.min} renown → {next.title}</span>
                </div>
                <Progress value={pct} className="h-2 bg-amber-950/60" />
              </>
            ) : (
              <p className="text-sm text-amber-300 font-rune pt-2">Highest rank achieved — {score} renown!</p>
            )}
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
            {RANKS.map((r, i) => {
              const achieved = i <= idx;
              return (
                <div
                  key={r.id}
                  data-testid={`rank-row-${r.id}`}
                  className={`flex items-center gap-3 rounded-lg p-2 border ${achieved ? "border-amber-500/40 bg-amber-950/30" : "border-slate-700/40 bg-black/30 opacity-70"}`}
                >
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center ${achieved ? "bg-gradient-to-b from-amber-300 to-amber-700 text-black" : "bg-slate-800 text-slate-500"}`}>
                    {achieved ? <CheckCircle2 size={16} /> : <Lock size={14} />}
                  </span>
                  <div className="flex-1">
                    <p className={`font-serif text-sm ${achieved ? "text-amber-100" : "text-slate-400"}`}>{r.title}</p>
                    <p className="text-[11px] text-muted-foreground">{r.min} renown</p>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-[11px] text-muted-foreground text-center pt-1">
            Renown = words charted + trials mastered + rogue creatures saved.
          </p>
        </DialogContent>
      </Dialog>
    </>
  );
};
