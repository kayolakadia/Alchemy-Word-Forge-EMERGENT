import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Sparkles, FlaskConical, Volume2, VolumeX, Wand2, Loader2 } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const typeClass = { prefix: "rune-prefix", root: "rune-root", suffix: "rune-suffix" };

function speak(text) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.rate = 0.92;
  u.pitch = 1.02;
  window.speechSynthesis.speak(u);
}
function stopSpeech() {
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
}

export const SparkVignette = ({ spark, reagentIndex, onClose, onOpenTree }) => {
  const open = !!spark;
  const status = spark?.status;
  const word = spark?.word;

  const [genImage, setGenImage] = useState(null);
  const [genLoading, setGenLoading] = useState(false);
  const [narrating, setNarrating] = useState(false);

  const seqReagents = (word?.sequence || []).map((id) => reagentIndex[id]).filter(Boolean);

  const narrationText = word
    ? `${word.word}. ${word.definition} The origin: ${word.etymology}`
    : (spark?.message || "");

  // auto-narrate + reset generated art whenever a new spark opens
  useEffect(() => {
    setGenImage(null);
    setGenLoading(false);
    if (open && (status === "success" || status === "monster")) {
      setNarrating(true);
      speak(narrationText);
    }
    return () => stopSpeech();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spark]);

  const toggleNarrate = () => {
    if (narrating) { stopSpeech(); setNarrating(false); }
    else { speak(narrationText); setNarrating(true); }
  };

  const illustrate = useCallback(async () => {
    if (!word) return;
    setGenLoading(true);
    try {
      const res = await axios.post(`${API}/monster-art`, { reagent_ids: word.sequence });
      setGenImage(res.data.image);
    } catch (e) {
      console.error("illustrate failed", e);
    } finally {
      setGenLoading(false);
    }
  }, [word]);

  const handleClose = () => { stopSpeech(); setNarrating(false); onClose(); };

  const heroImage = genImage || word?.image;

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) handleClose(); }}>
      <DialogContent
        data-testid="spark-vignette-modal"
        className="max-w-2xl brass-frame border-amber-500/40 p-0 overflow-hidden max-h-[90vh] overflow-y-auto"
      >
        <DialogTitle className="sr-only">{word ? word.word : "Transmutation result"}</DialogTitle>
        <DialogDescription className="sr-only">{word ? word.definition : (spark?.message || "")}</DialogDescription>

        {status === "inert" && (
          <div className="p-8 text-center">
            <FlaskConical className="mx-auto text-amber-400 mb-3" size={40} />
            <h3 className="font-serif text-2xl gilded-text mb-2">The mixture fizzles…</h3>
            <p className="text-muted-foreground">{spark.message}</p>
            <Button onClick={handleClose} className="mt-5 bg-amber-600 text-black hover:bg-amber-500">Try again</Button>
          </div>
        )}

        {(status === "success" || status === "monster") && word && (
          <div>
            <div className="relative">
              {heroImage ? (
                <img
                  src={heroImage}
                  alt={word.word}
                  data-testid="vignette-image"
                  className="w-full h-64 md:h-72 object-cover"
                />
              ) : (
                <div className="w-full h-56 flex flex-col items-center justify-center bg-gradient-to-b from-emerald-950 to-black relative overflow-hidden gap-3">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <span key={i} className="steam" style={{ left: `${15 + i * 13}%`, animationDelay: `${i * 0.3}s` }} />
                  ))}
                  <span className="font-serif text-3xl text-emerald-300 relative z-10">Rogue Transmutation!</span>
                  {genLoading ? (
                    <span className="relative z-10 flex items-center gap-2 text-emerald-200 text-sm">
                      <Loader2 className="animate-spin" size={16} /> Conjuring your creature…
                    </span>
                  ) : (
                    <Button
                      data-testid="illustrate-monster-button"
                      onClick={illustrate}
                      className="relative z-10 bg-emerald-600 text-black hover:bg-emerald-500"
                    >
                      <Wand2 size={16} className="mr-2" /> Illustrate this creature
                    </Button>
                  )}
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-5 right-5 flex items-end justify-between gap-3">
                <div>
                  <span className={`text-[11px] uppercase tracking-widest font-rune ${status === "monster" ? "text-emerald-300" : "text-amber-300"}`}>
                    {status === "monster" ? "Rogue Monster Word" : "Transmutation Complete"}
                  </span>
                  <h2 data-testid="vignette-word-title" className="font-serif text-3xl md:text-4xl font-extrabold text-amber-50 drop-shadow-lg">
                    {word.word}
                  </h2>
                </div>
                <button
                  data-testid="narrate-button"
                  onClick={toggleNarrate}
                  title={narrating ? "Stop narration" : "Read aloud"}
                  className="shrink-0 w-11 h-11 rounded-full bg-black/60 border border-amber-500/50 flex items-center justify-center text-amber-200 hover:bg-amber-950/70 transition"
                >
                  {narrating ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
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

              {word.vignette && <p className="text-sm text-emerald-200/90">{word.vignette}</p>}

              {status === "monster" && genImage && (
                <p className="text-xs text-emerald-300/80 flex items-center gap-1">
                  <Wand2 size={12} /> Freshly illustrated for you by the alchemical engine.
                </p>
              )}

              <div className="flex flex-wrap gap-3 pt-2">
                <Button onClick={handleClose} data-testid="vignette-continue-button" className="bg-gradient-to-b from-amber-400 to-amber-600 text-black hover:from-amber-300 hover:to-amber-500">
                  <Sparkles size={16} className="mr-2" /> Continue
                </Button>
                {status === "success" && onOpenTree && (
                  <Button variant="outline" onClick={() => { stopSpeech(); onOpenTree(); }} className="border-amber-600/40 text-amber-200 hover:bg-amber-950/40">
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
