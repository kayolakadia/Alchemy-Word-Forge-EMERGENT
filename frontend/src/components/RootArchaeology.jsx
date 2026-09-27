import React, { useState } from "react";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight, Volume2, History } from "lucide-react";

function speak(text) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.rate = 0.92; u.pitch = 1.02;
  window.speechSynthesis.speak(u);
}

const Journey = ({ journey }) => {
  const [i, setI] = useState(0);
  const frame = journey.frames[i];
  const last = journey.frames.length - 1;

  const go = (n) => {
    const next = Math.max(0, Math.min(last, n));
    setI(next);
    speak(journey.frames[next].text);
  };

  return (
    <div className="brass-frame rounded-2xl p-5 md:p-6">
      <div className="flex items-center gap-2 mb-1">
        <History size={16} className="text-amber-400" />
        <span className="text-[11px] uppercase tracking-widest text-amber-400/80 font-rune">Root Archaeology</span>
      </div>
      <h3 className="font-serif text-2xl gilded-text mb-1">
        The Root “{journey.root}” — {journey.meaning}
      </h3>
      <p className="text-sm text-muted-foreground italic mb-4">{journey.intro}</p>

      {/* stage */}
      <div className="relative rounded-xl overflow-hidden border border-amber-600/30 mb-4">
        <img
          key={frame.id}
          src={frame.image}
          alt={frame.title}
          data-testid={`root-frame-image-${frame.id}`}
          className="w-full h-64 md:h-80 object-cover"
          style={{ animation: "fade-scale 0.7s ease-out, kenburns 9s ease-out forwards" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent pointer-events-none" />
        <div className="absolute bottom-4 left-5 right-5">
          <span className="text-[11px] uppercase tracking-widest font-rune text-emerald-300">{frame.era}</span>
          <h4 className="font-serif text-2xl md:text-3xl text-amber-50 drop-shadow-lg">{frame.title}</h4>
        </div>
      </div>

      <div key={frame.id + "-txt"} style={{ animation: "fade-scale 0.6s ease-out" }}>
        <p className="text-base text-slate-100 mb-4">{frame.text}</p>
      </div>

      {/* progress dots */}
      <div className="flex items-center justify-center gap-2 mb-4">
        {journey.frames.map((f, idx) => (
          <button
            key={f.id}
            data-testid={`root-dot-${f.id}`}
            onClick={() => go(idx)}
            className={`h-2.5 rounded-full transition-all ${idx === i ? "w-8 bg-amber-400" : "w-2.5 bg-amber-800/50 hover:bg-amber-600"}`}
            aria-label={f.title}
          />
        ))}
      </div>

      <div className="flex items-center justify-between">
        <Button
          data-testid="root-prev-button"
          variant="outline"
          disabled={i === 0}
          onClick={() => go(i - 1)}
          className="border-amber-600/40 text-amber-200 hover:bg-amber-950/40"
        >
          <ChevronLeft size={16} className="mr-1" /> Back
        </Button>
        <button
          data-testid="root-speak-button"
          onClick={() => speak(frame.text)}
          className="w-11 h-11 rounded-full bg-black/50 border border-amber-500/50 flex items-center justify-center text-amber-200 hover:bg-amber-950/60"
          title="Read aloud"
        >
          <Volume2 size={20} />
        </button>
        <Button
          data-testid="root-next-button"
          disabled={i === last}
          onClick={() => go(i + 1)}
          className="bg-gradient-to-b from-amber-400 to-amber-600 text-black hover:from-amber-300 hover:to-amber-500"
        >
          {i === last ? "The end" : "Transmute forward"} <ChevronRight size={16} className="ml-1" />
        </Button>
      </div>
    </div>
  );
};

export const RootArchaeology = ({ journeys }) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="font-serif text-2xl md:text-3xl gilded-text">Root Archaeology</h3>
        <p className="text-sm text-muted-foreground italic">
          Watch one ancient root travel through time and branch into the words we use today.
        </p>
      </div>
      {(journeys || []).map((j) => <Journey key={j.id} journey={j} />)}
    </div>
  );
};
