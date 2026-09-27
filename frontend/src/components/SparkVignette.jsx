import React from "react";
import { Dialog, DialogContent } from "./ui/dialog";
import { Button } from "./ui/button";
import { Sparkles, FlaskConical } from "lucide-react";

const typeClass = { prefix: "rune-prefix", root: "rune-root", suffix: "rune-suffix" };

export const SparkVignette = ({ spark, reagentIndex, onClose, onOpenTree }) => {
  const open = !!spark;
  const status = spark?.status;
  const word = spark?.word;

  const seqReagents = (word?.sequence || []).map((id) => reagentIndex[id]).filter(Boolean);

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) onClose(); }}>
      <DialogContent
        data-testid="spark-vignette-modal"
        className="max-w-2xl brass-frame border-amber-500/40 p-0 overflow-hidden max-h-[90vh] overflow-y-auto"
      >
        {status === "inert" && (
          <div className="p-8 text-center">
            <FlaskConical className="mx-auto text-amber-400 mb-3" size={40} />
            <h3 className="font-serif text-2xl gilded-text mb-2">The mixture fizzles…</h3>
            <p className="text-muted-foreground">{spark.message}</p>
            <Button onClick={onClose} className="mt-5 bg-amber-600 text-black hover:bg-amber-500">Try again</Button>
          </div>
        )}

        {(status === "success" || status === "monster") && word && (
          <div>
            {/* Vignette image / monster panel */}
            <div className="relative">
              {word.image ? (
                <img
                  src={word.image}
                  alt={word.word}
                  data-testid="vignette-image"
                  className="w-full h-64 md:h-72 object-cover"
                />
              ) : (
                <div className="w-full h-56 flex items-center justify-center bg-gradient-to-b from-emerald-950 to-black relative overflow-hidden">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <span key={i} className="steam" style={{ left: `${15 + i * 13}%`, animationDelay: `${i * 0.3}s` }} />
                  ))}
                  <span className="font-serif text-3xl text-emerald-300 relative z-10">Rogue Transmutation!</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-3 left-5 right-5">
                <span className={`text-[11px] uppercase tracking-widest font-rune ${status === "monster" ? "text-emerald-300" : "text-amber-300"}`}>
                  {status === "monster" ? "Rogue Monster Word" : "Transmutation Complete"}
                </span>
                <h2 data-testid="vignette-word-title" className="font-serif text-3xl md:text-4xl font-extrabold text-amber-50 drop-shadow-lg">
                  {word.word}
                </h2>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {/* morpheme breakdown */}
              <div className="flex flex-wrap items-center gap-2">
                {seqReagents.map((r, i) => (
                  <React.Fragment key={i}>
                    {i > 0 && <span className="text-amber-500 font-bold">+</span>}
                    <span className={`rune ${typeClass[r.type]} text-xs`}>{r.glyph}</span>
                  </React.Fragment>
                ))}
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest text-amber-400/80 font-rune mb-1">Meaning</p>
                <p className="text-base md:text-lg text-slate-100">{word.definition}</p>
              </div>

              <div className="border-l-2 border-amber-600/50 pl-4">
                <p className="text-xs uppercase tracking-widest text-amber-400/80 font-rune mb-1">Etymology</p>
                <p className="text-sm text-slate-300 italic">{word.etymology}</p>
              </div>

              {word.vignette && (
                <p className="text-sm text-emerald-200/90">{word.vignette}</p>
              )}

              <div className="flex flex-wrap gap-3 pt-2">
                <Button onClick={onClose} data-testid="vignette-continue-button" className="bg-gradient-to-b from-amber-400 to-amber-600 text-black hover:from-amber-300 hover:to-amber-500">
                  <Sparkles size={16} className="mr-2" /> Continue
                </Button>
                {status === "success" && onOpenTree && (
                  <Button variant="outline" onClick={onOpenTree} className="border-amber-600/40 text-amber-200 hover:bg-amber-950/40">
                    View on the Philosopher's Tree
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
