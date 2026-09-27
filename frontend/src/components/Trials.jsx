import React, { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { CheckCircle2, XCircle, ScrollText, Award } from "lucide-react";
import { toast } from "sonner";

function fanfareSpeak(text) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.rate = 0.95; u.pitch = 1.15;
  window.speechSynthesis.speak(u);
}

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
          return (
            <button
              key={opt.id}
              data-testid={`trials-option-${trial.id}-${opt.id}`}
              onClick={() => choose(opt)}
              className={`text-left rounded-xl border p-3 transition
                ${isPicked
                  ? (opt.correct ? "border-emerald-400 bg-emerald-950/50" : "border-red-500/60 bg-red-950/40")
                  : "border-amber-700/30 bg-black/30 hover:border-amber-500/70 hover:bg-amber-950/30"}`}
            >
              <div className="flex items-center gap-2">
                <span className="font-serif text-amber-100">{opt.label}</span>
                {isPicked && (opt.correct
                  ? <CheckCircle2 size={16} className="text-emerald-400 ml-auto" />
                  : <XCircle size={16} className="text-red-400 ml-auto" />)}
              </div>
              {opt.sub && <p className="text-xs text-muted-foreground mt-1">{opt.sub}</p>}
            </button>
          );
        })}
      </div>

      {picked && (
        <div className="mt-4 space-y-3">
          {picked.outcome_image && (
            <div
              key={picked.id}
              data-testid={`trial-outcome-image-${trial.id}`}
              className="relative rounded-xl overflow-hidden border border-amber-600/30"
              style={{ animation: "steam-rise 0s, fade-scale 0.6s ease-out" }}
            >
              <img
                src={picked.outcome_image}
                alt={picked.label}
                className="w-full h-52 md:h-64 object-cover"
                style={{ animation: "kenburns 8s ease-out forwards" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
            </div>
          )}
          <div className={`rounded-lg p-3 text-sm ${picked.correct ? "bg-emerald-950/40 text-emerald-200" : "bg-red-950/30 text-red-200"}`}>
            {picked.feedback}
            {!picked.correct && (
              <button onClick={() => setPicked(null)} className="ml-2 underline text-amber-300">Try again</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export const Trials = ({ trials, solvedTrials, onSolve, badge, allSolved }) => {
  const celebrated = useRef(false);

  useEffect(() => {
    if (allSolved && !celebrated.current) {
      celebrated.current = true;
      toast.success("All Trials mastered! You are a true Alchemist!", { icon: "🏅", duration: 6000 });
      fanfareSpeak("Congratulations, Alchemist! You have mastered every trial!");
    }
    if (!allSolved) celebrated.current = false;
  }, [allSolved]);

  return (
    <div className="space-y-5">
      <div className="text-center">
        <h3 className="font-serif text-2xl md:text-3xl gilded-text">The Alchemist's Trials</h3>
        <p className="text-sm text-muted-foreground italic">Dilemmas of fine nuance. Weigh each root's true meaning.</p>
        <p className="text-sm text-amber-300/80 font-rune mt-1">{solvedTrials.length} / {trials.length} trials mastered</p>
      </div>

      {allSolved && (
        <div
          data-testid="trials-reward-badge"
          className="brass-frame rounded-2xl p-6 flex flex-col md:flex-row items-center gap-5 text-center md:text-left"
          style={{ animation: "fade-scale 0.7s ease-out" }}
        >
          {badge && (
            <img
              src={badge}
              alt="Master Alchemist badge"
              className="w-28 h-28 object-contain drop-shadow-[0_0_24px_rgba(212,175,55,0.6)]"
              style={{ animation: "fade-scale 0.9s ease-out" }}
            />
          )}
          <div>
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <Award className="text-amber-400" size={18} />
              <span className="text-[11px] uppercase tracking-widest text-amber-400/80 font-rune">Order of the Living Word</span>
            </div>
            <h4 className="font-serif text-2xl gilded-text">Master Alchemist</h4>
            <p className="text-sm text-slate-200">
              Every trial mastered! You can now read any word by its roots — the highest honour in the laboratory.
            </p>
          </div>
        </div>
      )}

      <div className="grid gap-5">
        {trials.map((t) => (
          <TrialCard key={t.id} trial={t} solved={solvedTrials.includes(t.id)} onSolve={onSolve} />
        ))}
      </div>
    </div>
  );
};
