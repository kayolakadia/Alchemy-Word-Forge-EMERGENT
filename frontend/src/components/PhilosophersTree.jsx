import React, { useState } from "react";
import { Lock, Star } from "lucide-react";

// Radial constellation map per crucible. Central core-root star with word nodes around it.
export const PhilosophersTree = ({ constellations, words, discovered, reagentIndex, onOpenWord }) => {
  const [activeId, setActiveId] = useState(constellations[0].id);
  const active = constellations.find((c) => c.id === activeId);
  const list = words.filter((w) => w.constellation === activeId);
  const core = reagentIndex[active.core_root];

  const total = list.length;
  const foundHere = list.filter((w) => discovered.includes(w.id)).length;

  const nodes = list.map((w, i) => {
    const angle = (i / total) * Math.PI * 2 - Math.PI / 2;
    const R = 40;
    return {
      w,
      x: 50 + R * Math.cos(angle),
      y: 50 + R * Math.sin(angle),
      found: discovered.includes(w.id),
    };
  });

  return (
    <div className="brass-frame rounded-2xl p-5 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <div>
          <h3 className="font-serif text-2xl gilded-text">The Philosopher's Tree</h3>
          <p className="text-sm text-muted-foreground italic">Every transmutation lights a new star. Tap a discovered star to relive it.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {constellations.map((c) => (
            <button
              key={c.id}
              data-testid={`tree-constellation-tab-${c.id}`}
              onClick={() => setActiveId(c.id)}
              className={`text-xs md:text-sm px-3 py-1.5 rounded-full border transition font-serif
                ${c.id === activeId ? "bg-amber-500/20 border-amber-400 text-amber-100" : "border-amber-700/30 text-amber-300/70 hover:border-amber-500/60"}`}
            >
              {c.name.replace("The Crucible of ", "")}
            </button>
          ))}
        </div>
      </div>

      <p className="text-center text-sm text-amber-300/80 font-rune mb-2">
        {foundHere} / {total} stars kindled
      </p>

      <div className="relative w-full max-w-2xl mx-auto aspect-square">
        {/* connecting beams */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          {nodes.map((n, i) => (
            <line
              key={i}
              x1="50" y1="50" x2={n.x} y2={n.y}
              stroke={n.found ? "rgba(212,175,55,0.55)" : "rgba(212,175,55,0.12)"}
              strokeWidth="0.4"
              strokeDasharray={n.found ? "0" : "1.5 1.5"}
            />
          ))}
        </svg>

        {/* core root node */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
          style={{ left: "50%", top: "50%" }}
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-b from-amber-500 to-amber-800 border-2 border-amber-200 flex items-center justify-center shadow-[0_0_40px_rgba(212,175,55,0.6)]">
            <span className="font-rune font-bold text-black text-sm md:text-base">{core?.glyph}</span>
          </div>
          <span className="mt-1 text-[11px] text-amber-200/80 max-w-[110px] text-center">{core?.meaning}</span>
        </div>

        {/* word nodes */}
        {nodes.map((n, i) => (
          <button
            key={i}
            data-testid={`philosophers-tree-node-${n.w.id}`}
            disabled={!n.found}
            onClick={() => n.found && onOpenWord(n.w)}
            className="tree-node absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center w-24"
            style={{ left: `${n.x}%`, top: `${n.y}%` }}
          >
            <span className={`w-12 h-12 rounded-full flex items-center justify-center border-2
              ${n.found
                ? "bg-gradient-to-b from-amber-300 to-amber-600 border-amber-100 text-black shadow-[0_0_22px_rgba(212,175,55,0.7)]"
                : "bg-slate-900/80 border-slate-600 text-slate-500"}`}>
              {n.found ? <Star size={20} fill="currentColor" /> : <Lock size={16} />}
            </span>
            <span className={`mt-1 text-[11px] font-serif text-center leading-tight ${n.found ? "text-amber-100" : "text-slate-500"}`}>
              {n.found ? n.w.word : "???"}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
