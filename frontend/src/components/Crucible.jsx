import React, { useState } from "react";
import { Button } from "./ui/button";
import { Sparkles, Trash2, X } from "lucide-react";

const typeClass = { prefix: "rune-prefix", root: "rune-root", suffix: "rune-suffix" };

export const Crucible = ({ assembledReagents, onDropId, onRemove, onClear, onTransmute, busy }) => {
  const [over, setOver] = useState(false);
  const armed = assembledReagents.length > 0;

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        data-testid="alembic-crucible-dropzone"
        className={`crucible relative w-full max-w-md h-64 md:h-72 flex flex-wrap items-center justify-center gap-2 p-6 ${armed ? "armed" : ""} ${over ? "dragover" : ""}`}
        onDragOver={(e) => { e.preventDefault(); setOver(true); }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setOver(false);
          const id = e.dataTransfer.getData("text/reagent");
          if (id) onDropId(id);
        }}
      >
        {/* bubbles */}
        {armed && Array.from({ length: 7 }).map((_, i) => (
          <span
            key={i}
            className="bubble"
            style={{
              left: `${12 + i * 11}%`,
              width: `${6 + (i % 3) * 4}px`,
              height: `${6 + (i % 3) * 4}px`,
              animationDuration: `${2.5 + (i % 4) * 0.7}s`,
              animationDelay: `${i * 0.35}s`,
            }}
          />
        ))}

        {!armed && (
          <p className="text-center text-muted-foreground text-sm md:text-base px-6 relative z-10">
            Drag reagents here — or tap them — to charge the Crucible.
          </p>
        )}

        <div className="flex flex-wrap items-center justify-center gap-2 relative z-10">
          {assembledReagents.map((r, i) => (
            <span key={i} className="relative group">
              <span className={`rune ${typeClass[r.type]} text-sm md:text-base pointer-events-none`}>
                {r.glyph}
              </span>
              <button
                type="button"
                data-testid={`crucible-remove-${i}`}
                onClick={() => onRemove(i)}
                className="absolute -top-2 -right-2 bg-black/80 border border-amber-500/50 rounded-full p-0.5 text-amber-200 hover:text-white hover:bg-red-800/80 transition"
                aria-label="remove reagent"
              >
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button
          data-testid="transmute-action-button"
          disabled={!armed || busy}
          onClick={onTransmute}
          className="font-serif tracking-wide bg-gradient-to-b from-amber-400 to-amber-600 text-black hover:from-amber-300 hover:to-amber-500 shadow-[0_0_24px_rgba(212,175,55,0.4)] px-6"
        >
          <Sparkles size={18} className="mr-2" />
          {busy ? "Transmuting…" : "Spark the Reaction"}
        </Button>
        <Button
          data-testid="crucible-clear-button"
          variant="outline"
          disabled={!armed || busy}
          onClick={onClear}
          className="border-amber-600/40 text-amber-200 hover:bg-amber-950/40"
        >
          <Trash2 size={16} className="mr-2" /> Empty
        </Button>
      </div>
    </div>
  );
};
