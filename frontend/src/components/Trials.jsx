import React, { useState } from "react";
import { Button } from "./ui/button";
import { CheckCircle2, XCircle, ScrollText } from "lucide-react";

const TrialCard = ({ trial, solved, onSolve }) => {
  const [picked, setPicked] = useState(null);

  const choose = (opt) => {
    setPicked(opt);
    if (opt.correct) onSolve(trial.id);
  };

  return (
    <div data-testid={`trial-card-${trial.id}`} className="brass-frame rounded-2xl p-5 md:p-6">
      <div className="flex items-center gap-2 mb-2">
        <ScrollText size={16} className="text-amber-400" />
        <span className="text-[11px] uppercase tracking-widest text-amber-400/80 font-rune">{trial.kind}</span>
        {solved && <CheckCircle2 size={16} className="text-emerald-400 ml-auto" />}
      </div>
      <p className="text-base md:text-lg text-slate-100 mb-4">{trial.scenario}</p>

      <div className="grid gap-3 sm:grid-cols-3">
        {trial.options.map((opt) => {
          const isPicked = picked?.id === opt.id;
          const show = isPicked;
          return (
            <button
              key={opt.id}
              data-testid={`trials-option-${trial.id}-${opt.id}`}
              onClick={() => choose(opt)}
              className={`text-left rounded-xl border p-3 transition
                ${show
                  ? (opt.correct ? "border-emerald-400 bg-emerald-950/50" : "border-red-500/60 bg-red-950/40")
                  : "border-amber-700/30 bg-black/30 hover:border-amber-500/70 hover:bg-amber-950/30"}`}
            >
              <div className="flex items-center gap-2">
                <span className="font-serif text-amber-100">{opt.label}</span>
                {show && (opt.correct
                  ? <CheckCircle2 size={16} className="text-emerald-400 ml-auto" />
                  : <XCircle size={16} className="text-red-400 ml-auto" />)}
              </div>
              {opt.sub && <p className="text-xs text-muted-foreground mt-1">{opt.sub}</p>}
            </button>
          );
        })}
      </div>

      {picked && (
        <div className={`mt-4 rounded-lg p-3 text-sm ${picked.correct ? "bg-emerald-950/40 text-emerald-200" : "bg-red-950/30 text-red-200"}`}>
          {picked.feedback}
          {!picked.correct && (
            <button onClick={() => setPicked(null)} className="ml-2 underline text-amber-300">Try again</button>
          )}
        </div>
      )}
    </div>
  );
};

export const Trials = ({ trials, solvedTrials, onSolve }) => {
  return (
    <div className="space-y-5">
      <div className="text-center">
        <h3 className="font-serif text-2xl md:text-3xl gilded-text">The Alchemist's Trials</h3>
        <p className="text-sm text-muted-foreground italic">Dilemmas of fine nuance. Weigh each root's true meaning.</p>
        <p className="text-sm text-amber-300/80 font-rune mt-1">{solvedTrials.length} / {trials.length} trials mastered</p>
      </div>
      <div className="grid gap-5">
        {trials.map((t) => (
          <TrialCard key={t.id} trial={t} solved={solvedTrials.includes(t.id)} onSolve={onSolve} />
        ))}
      </div>
    </div>
  );
};
