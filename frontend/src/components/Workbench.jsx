import React from "react";
import { MorphemeTile, typeLabel } from "./MorphemeTile";
import { Crucible } from "./Crucible";
import { VoiceIncantation } from "./VoiceIncantation";
import { Cog } from "lucide-react";

const legend = [
  { type: "prefix", label: "Catalysts", note: "Prefixes · direction & relation" },
  { type: "root", label: "Elements", note: "Roots · the raw substance" },
  { type: "suffix", label: "Seals", note: "Suffixes · lock the formula" },
];
const legendDot = { prefix: "bg-blue-400", root: "bg-amber-400", suffix: "bg-emerald-400" };

export const Workbench = ({
  constellations, reagentIndex, activeId, setActiveId,
  assembledReagents, onAddReagent, onRemove, onClear, onTransmute, onVoice, busy,
}) => {
  const active = constellations.find((c) => c.id === activeId) || constellations[0];
  const reagents = active.reagent_ids.map((id) => reagentIndex[id]).filter(Boolean);
  const grouped = {
    prefix: reagents.filter((r) => r.type === "prefix"),
    root: reagents.filter((r) => r.type === "root"),
    suffix: reagents.filter((r) => r.type === "suffix"),
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(360px,42%)] gap-6">
      {/* Reagent cabinet */}
      <div className="brass-frame rounded-2xl p-5 md:p-6 relative overflow-hidden">
        <Cog className="gear-spin absolute -right-8 -top-8 text-amber-700/10" size={140} />
        <div className="flex items-center justify-between mb-4 relative z-10">
          <h3 className="font-serif text-xl md:text-2xl gilded-text">The Reagent Cabinet</h3>
        </div>

        {/* constellation selector */}
        <div className="flex flex-wrap gap-2 mb-5 relative z-10">
          {constellations.map((c) => (
            <button
              key={c.id}
              data-testid={`constellation-tab-${c.id}`}
              onClick={() => setActiveId(c.id)}
              className={`text-xs md:text-sm px-3 py-1.5 rounded-full border transition font-serif
                ${c.id === activeId
                  ? "bg-amber-500/20 border-amber-400 text-amber-100"
                  : "border-amber-700/30 text-amber-300/70 hover:border-amber-500/60"}`}
            >
              {c.name.replace("The Crucible of ", "")}
            </button>
          ))}
        </div>

        <div className="space-y-4 relative z-10">
          {legend.map((l) => (
            <div key={l.type}>
              <div className="flex items-center gap-2 mb-2">
                <span className={`w-2.5 h-2.5 rounded-full ${legendDot[l.type]}`} />
                <span className="text-sm font-semibold text-amber-100">{l.label}</span>
                <span className="text-[11px] text-muted-foreground">{l.note}</span>
              </div>
              <div className="flex flex-wrap gap-2 pl-4">
                {grouped[l.type].length === 0
                  ? <span className="text-xs text-muted-foreground italic">— none in this constellation —</span>
                  : grouped[l.type].map((r) => (
                      <MorphemeTile key={r.id} reagent={r} onClick={(rr) => onAddReagent(rr.id)} />
                    ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Crucible + voice */}
      <div className="brass-frame rounded-2xl p-5 md:p-6 flex flex-col items-center relative">
        <div className="text-center mb-4">
          <h3 className="font-serif text-xl md:text-2xl gilded-text">{active.name}</h3>
          <p className="text-sm text-muted-foreground italic">{active.tagline}</p>
        </div>
        <Crucible
          assembledReagents={assembledReagents}
          onDropId={onAddReagent}
          onRemove={onRemove}
          onClear={onClear}
          onTransmute={onTransmute}
          busy={busy}
        />
        <div className="mt-6 flex flex-col items-center gap-1">
          <VoiceIncantation onResult={onVoice} />
          <p className="text-[11px] text-muted-foreground text-center max-w-[220px] mt-1">
            Or press the brass horn and pronounce the whole word aloud.
          </p>
        </div>
      </div>
    </div>
  );
};
