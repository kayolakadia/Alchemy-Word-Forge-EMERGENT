import React, { useEffect, useRef, useState } from "react";
import { Mic, MicOff } from "lucide-react";
import { toast } from "sonner";

// Web Speech API brass-horn voice incantation.
export const VoiceIncantation = ({ onResult }) => {
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(true);
  const recRef = useRef(null);

  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { setSupported(false); return; }
    const rec = new SR();
    rec.lang = "en-US";
    rec.interimResults = false;
    rec.maxAlternatives = 3;
    rec.onresult = (e) => {
      const alts = [];
      for (let i = 0; i < e.results[0].length; i++) alts.push(e.results[0][i].transcript);
      onResult(alts.join(" "));
    };
    rec.onerror = (e) => {
      if (e.error === "not-allowed" || e.error === "service-not-allowed") {
        toast.error("The brass horn needs microphone permission to hear your incantation.");
      }
      setListening(false);
    };
    rec.onend = () => setListening(false);
    recRef.current = rec;
    return () => { try { rec.abort(); } catch (_) {} };
  }, [onResult]);

  const toggle = () => {
    if (!supported) {
      toast.error("Voice incantation isn't supported in this browser. Try dragging tiles instead.");
      return;
    }
    if (listening) { recRef.current.stop(); setListening(false); return; }
    try {
      recRef.current.start();
      setListening(true);
      toast("Speak your compound word into the horn…", { icon: "🔊" });
    } catch (_) { /* already started */ }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        data-testid="voice-incantation-button"
        onClick={toggle}
        className={`relative w-16 h-16 rounded-full flex items-center justify-center border-2 transition
          ${listening
            ? "bg-amber-500 border-amber-200 text-black horn-ring"
            : "bg-gradient-to-b from-amber-700 to-amber-900 border-amber-500/60 text-amber-100 hover:from-amber-600 hover:to-amber-800"}`}
        aria-label="voice incantation"
      >
        {listening ? <Mic size={26} /> : (supported ? <Mic size={26} /> : <MicOff size={26} />)}
      </button>
      <span className="text-[11px] uppercase tracking-widest text-amber-300/80 font-rune">
        {listening ? "Listening…" : "Incant"}
      </span>
    </div>
  );
};
