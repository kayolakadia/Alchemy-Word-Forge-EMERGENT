import React from "react";
import { Button } from "./ui/button";
import { Sparkles, CalendarDays, CheckCircle2 } from "lucide-react";

const typeClass = { prefix: "rune-prefix", root: "rune-root", suffix: "rune-suffix" };

export const DailyReagent = ({ daily, claimedToday, onBrew }) => {
  if (!daily) return null;
  const { reagent, bonus_word } = daily;

  return (
    <div
      data-testid="daily-reagent-card"
      className="brass-frame rounded-2xl p-4 md:p-5 flex flex-col md:flex-row md:items-center gap-4 border-amber-500/40"
    >
      <div className="flex items-center gap-3">
        <span className="w-11 h-11 rounded-full bg-gradient-to-b from-amber-300 to-amber-700 flex items-center justify-center text-black shrink-0">
          <CalendarDays size={20} />
        </span>
        <div>
          <p className="text-[10px] uppercase tracking-widest text-amber-400/80 font-rune">Daily Reagent</p>
          <div className="flex items-center gap-2">
            <span className={`rune ${typeClass[reagent.type]} text-sm`}>{reagent.glyph}</span>
            <span className="text-sm text-slate-300">{reagent.meaning}</span>
          </div>
        </div>
      </div>

      <div className="flex-1 md:border-l md:border-amber-700/30 md:pl-4">
        <p className="text-sm text-slate-200">
          Today's bonus transmutation:{" "}
          <span className="font-serif text-amber-100" data-testid="daily-bonus-word">{bonus_word.word}</span>
        </p>
        <p className="text-[11px] text-muted-foreground">
          Brew it to earn renown and claim today's reward.
        </p>
      </div>

      {claimedToday ? (
        <div data-testid="daily-claimed-badge" className="flex items-center gap-2 text-emerald-300 text-sm font-serif px-3">
          <CheckCircle2 size={18} /> Claimed today
        </div>
      ) : (
        <Button
          data-testid="daily-brew-button"
          onClick={onBrew}
          className="bg-gradient-to-b from-amber-400 to-amber-600 text-black hover:from-amber-300 hover:to-amber-500 shrink-0"
        >
          <Sparkles size={16} className="mr-2" /> Brew today's bonus
        </Button>
      )}
    </div>
  );
};
