import React from "react";
import { Lock } from "lucide-react";

export const Bestiary = ({ constellations, words, discovered, onOpenWord }) => {
  const total = words.length;
  const found = discovered.length;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="font-serif text-2xl md:text-3xl gilded-text">The Grand Alchemical Bestiary</h3>
        <p className="text-sm text-muted-foreground italic">Every word you transmute is charted forever in the grimoire.</p>
        <p className="text-sm text-amber-300/80 font-rune mt-1">{found} / {total} entries charted</p>
      </div>

      {constellations.map((c) => {
        const list = words.filter((w) => w.constellation === c.id);
        return (
          <div key={c.id}>
            <h4 className="font-serif text-lg text-amber-200 mb-3 border-b border-amber-700/30 pb-1">
              {c.name}
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {list.map((w) => {
                const isFound = discovered.includes(w.id);
                return (
                  <button
                    key={w.id}
                    data-testid={`bestiary-entry-${w.id}`}
                    disabled={!isFound}
                    onClick={() => isFound && onOpenWord(w)}
                    className={`brass-frame rounded-xl overflow-hidden text-left transition ${isFound ? "hover:scale-[1.03]" : "opacity-70"}`}
                  >
                    <div className="relative h-28 md:h-32">
                      {isFound ? (
                        <img src={w.image} alt={w.word} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-black/50 flex items-center justify-center">
                          <Lock className="text-slate-600" size={26} />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
                      <span className="absolute bottom-2 left-2 right-2 font-serif text-sm text-amber-50 leading-tight">
                        {isFound ? w.word : "Undiscovered"}
                      </span>
                    </div>
                    {isFound && (
                      <p className="text-[11px] text-muted-foreground p-2 line-clamp-2">{w.definition}</p>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
