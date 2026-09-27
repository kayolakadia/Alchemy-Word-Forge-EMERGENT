import { useEffect, useState, useCallback, useMemo } from "react";
import "@/App.css";
import axios from "axios";
import { Workbench } from "./components/Workbench";
import { PhilosophersTree } from "./components/PhilosophersTree";
import { Trials } from "./components/Trials";
import { Bestiary } from "./components/Bestiary";
import { RootArchaeology } from "./components/RootArchaeology";
import { SparkVignette } from "./components/SparkVignette";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";
import { FlaskConical, Stars, ScrollText, BookOpen, Beaker, Cog, History } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

function getSessionId() {
  let s = localStorage.getItem("alchemy_session");
  if (!s) {
    s = (crypto.randomUUID && crypto.randomUUID()) || String(Date.now());
    localStorage.setItem("alchemy_session", s);
  }
  return s;
}

const TABS = [
  { id: "workbench", label: "Crucible", icon: Beaker },
  { id: "tree", label: "Philosopher's Tree", icon: Stars },
  { id: "roots", label: "Root Archaeology", icon: History },
  { id: "trials", label: "Trials", icon: ScrollText },
  { id: "bestiary", label: "Bestiary", icon: BookOpen },
];

function App() {
  const [data, setData] = useState(null);
  const [trials, setTrials] = useState([]);
  const [sessionId] = useState(getSessionId);
  const [discovered, setDiscovered] = useState([]);
  const [solvedTrials, setSolvedTrials] = useState([]);
  const [tab, setTab] = useState("workbench");
  const [activeConstellation, setActiveConstellation] = useState("rule-order");
  const [assembled, setAssembled] = useState([]);
  const [spark, setSpark] = useState(null);
  const [entered, setEntered] = useState(false);
  const [busy, setBusy] = useState(false);

  const reagentIndex = useMemo(() => {
    const idx = {};
    (data?.reagents || []).forEach((r) => { idx[r.id] = r; });
    return idx;
  }, [data]);

  useEffect(() => {
    async function boot() {
      try {
        const [lex, tr, prog] = await Promise.all([
          axios.get(`${API}/lexicon`),
          axios.get(`${API}/trials`),
          axios.get(`${API}/progress/${sessionId}`),
        ]);
        setData(lex.data);
        setTrials(tr.data.trials);
        setDiscovered(prog.data.discovered_words || []);
        setSolvedTrials(prog.data.solved_trials || []);
        document.documentElement.style.setProperty("--lab-bg", `url(${lex.data.background})`);
      } catch (e) {
        console.error("boot failed", e);
        toast.error("The laboratory failed to awaken. Please refresh.");
      }
    }
    boot();
  }, [sessionId]);

  const saveProgress = useCallback(async (words, solved) => {
    try {
      await axios.post(`${API}/progress`, {
        session_id: sessionId,
        discovered_words: words,
        solved_trials: solved,
      });
    } catch (e) { console.error("save failed", e); }
  }, [sessionId]);

  const addReagent = (id) => setAssembled((a) => [...a, id]);
  const removeAt = (i) => setAssembled((a) => a.filter((_, idx) => idx !== i));
  const clearCrucible = () => setAssembled([]);

  const runTransmute = useCallback(async (ids) => {
    const seq = ids || assembled;
    if (!seq.length) return;
    setBusy(true);
    try {
      const res = await axios.post(`${API}/transmute`, { reagent_ids: seq });
      const payload = res.data;
      setSpark(payload);
      if (payload.status === "success") {
        const wid = payload.word.id;
        if (!discovered.includes(wid)) {
          const next = [...discovered, wid];
          setDiscovered(next);
          saveProgress(next, solvedTrials);
          toast.success(`New word charted: ${payload.word.word}!`, { icon: "✨" });
        }
      } else if (payload.status === "monster") {
        toast("A rogue monster word emerges!", { icon: "🧪" });
      }
    } catch (e) {
      console.error(e);
      toast.error("The crucible cracked. Try again.");
    } finally {
      setBusy(false);
    }
  }, [assembled, discovered, solvedTrials, saveProgress]);

  const handleVoice = useCallback((transcript) => {
    if (!data) return;
    const t = transcript.toLowerCase().replace(/[^a-z]/g, "");
    const list = data.words.filter((w) => w.constellation === activeConstellation);

    // 1) whole-word match
    let match = list.find((w) => {
      const wn = w.word.toLowerCase();
      return t.includes(wn) || (wn.length > 4 && wn.includes(t) && t.length > 4);
    });
    // fallback: any constellation
    if (!match) {
      match = data.words.find((w) => t.includes(w.word.toLowerCase()));
    }
    if (match) {
      setActiveConstellation(match.constellation);
      setAssembled(match.sequence);
      toast(`Heard: "${match.word}"`, { icon: "🔊" });
      setTimeout(() => runTransmute(match.sequence), 400);
      return;
    }

    // 2) phoneme assembly across the active constellation's reagents
    const reagents = list.length
      ? (data.constellations.find((c) => c.id === activeConstellation)?.reagent_ids || []).map((id) => reagentIndex[id])
      : data.reagents;
    const hits = [];
    reagents.filter(Boolean).forEach((r) => {
      let best = -1;
      r.phonemes.forEach((p) => {
        const idx = t.indexOf(p.replace(/[^a-z]/g, ""));
        if (idx !== -1 && (best === -1 || idx < best)) best = idx;
      });
      if (best !== -1) hits.push({ id: r.id, at: best });
    });
    if (hits.length >= 2) {
      hits.sort((a, b) => a.at - b.at);
      const seq = hits.map((h) => h.id);
      setAssembled(seq);
      toast("Reagents summoned from your incantation!", { icon: "🪄" });
      setTimeout(() => runTransmute(seq), 400);
    } else {
      toast.error(`Couldn't quite catch that. Heard: "${transcript}"`);
    }
  }, [data, activeConstellation, reagentIndex, runTransmute]);

  const solveTrial = (trialId) => {
    if (solvedTrials.includes(trialId)) return;
    const next = [...solvedTrials, trialId];
    setSolvedTrials(next);
    saveProgress(discovered, next);
    toast.success("Trial mastered!", { icon: "📜" });
  };

  const openWord = (w) => setSpark({ status: "success", word: w });

  const assembledReagents = assembled.map((id) => reagentIndex[id]).filter(Boolean);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B0D12] text-amber-200">
        <div className="text-center">
          <Cog className="gear-spin mx-auto mb-3 text-amber-600" size={48} />
          <p className="font-serif text-lg">Kindling the alembic…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <Toaster position="top-center" theme="dark" richColors />
      <div className="lab-stage">
        {/* Intro overlay */}
        {!entered && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-6">
            <div className="brass-frame rounded-3xl max-w-xl w-full p-8 md:p-10 text-center relative overflow-hidden">
              <Cog className="gear-spin absolute -left-10 -bottom-10 text-amber-700/10" size={160} />
              <Cog className="gear-spin-rev absolute -right-12 -top-12 text-amber-700/10" size={180} />
              <p className="font-rune text-xs uppercase tracking-[0.3em] text-amber-400 mb-3 relative z-10">The Alchemical Lexicon</p>
              <h1 className="font-serif text-4xl md:text-5xl font-extrabold gilded-text mb-3 relative z-10">
                Transmutations of the Living Word
              </h1>
              <p className="text-slate-300 mb-6 relative z-10">
                Words are not dusty definitions — they are volatile reagents. Combine
                <span className="text-blue-300"> Catalysts</span>,
                <span className="text-amber-300"> Elements</span> and
                <span className="text-emerald-300"> Seals</span> in the Crucible and watch language come alive.
              </p>
              <button
                data-testid="enter-lab-button"
                onClick={() => setEntered(true)}
                className="relative z-10 font-serif text-lg px-8 py-3 rounded-full bg-gradient-to-b from-amber-400 to-amber-600 text-black hover:from-amber-300 hover:to-amber-500 shadow-[0_0_30px_rgba(212,175,55,0.5)] transition"
              >
                Enter the Laboratory
              </button>
            </div>
          </div>
        )}

        {/* Header */}
        <header className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-4 md:px-8 pt-6">
          <div className="flex items-center gap-3">
            <FlaskConical className="text-amber-400" size={30} />
            <div>
              <h1 className="font-serif text-xl md:text-2xl font-bold gilded-text leading-none">The Alchemical Lexicon</h1>
              <p className="text-[11px] text-muted-foreground font-rune tracking-wider">Transmutations of the Living Word</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="brass-frame rounded-full px-4 py-1.5 text-sm font-rune text-amber-200">
              {discovered.length} / {data.words.length} words charted
            </div>
          </div>
        </header>

        {/* Tab nav */}
        <nav className="relative z-10 flex flex-wrap gap-2 px-4 md:px-8 mt-5">
          {TABS.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                data-testid={`nav-tab-${t.id}`}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-t-xl border-b-2 transition font-serif text-sm md:text-base
                  ${tab === t.id
                    ? "border-amber-400 text-amber-100 bg-amber-950/30"
                    : "border-transparent text-amber-300/60 hover:text-amber-200"}`}
              >
                <Icon size={16} /> {t.label}
              </button>
            );
          })}
        </nav>

        {/* Content */}
        <main className="relative z-10 px-4 md:px-8 py-6 pb-16 max-w-6xl mx-auto w-full">
          {tab === "workbench" && (
            <Workbench
              constellations={data.constellations}
              reagentIndex={reagentIndex}
              activeId={activeConstellation}
              setActiveId={setActiveConstellation}
              assembledReagents={assembledReagents}
              onAddReagent={addReagent}
              onRemove={removeAt}
              onClear={clearCrucible}
              onTransmute={() => runTransmute()}
              onVoice={handleVoice}
              busy={busy}
            />
          )}
          {tab === "tree" && (
            <PhilosophersTree
              constellations={data.constellations}
              words={data.words}
              discovered={discovered}
              reagentIndex={reagentIndex}
              onOpenWord={openWord}
            />
          )}
          {tab === "roots" && (
            <RootArchaeology journeys={data.root_journeys} />
          )}
          {tab === "trials" && (
            <Trials trials={trials} solvedTrials={solvedTrials} onSolve={solveTrial} />
          )}
          {tab === "bestiary" && (
            <Bestiary
              constellations={data.constellations}
              words={data.words}
              discovered={discovered}
              onOpenWord={openWord}
            />
          )}
        </main>
      </div>

      <SparkVignette
        spark={spark}
        reagentIndex={reagentIndex}
        onClose={() => { setSpark(null); clearCrucible(); }}
        onOpenTree={() => { setSpark(null); clearCrucible(); setTab("tree"); }}
      />
    </div>
  );
}

export default App;
