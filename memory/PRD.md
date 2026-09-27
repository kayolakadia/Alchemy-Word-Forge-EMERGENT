# PRD — The Alchemical Lexicon: Transmutations of the Living Word

## Original Problem Statement
An educational word-morphology game for a precocious 7-year-old, set in a vintage steampunk alchemical laboratory. Words are treated as physical formulas: prefixes are Catalysts, roots are Elements, suffixes are Transmutation Seals. Players combine color-coded morpheme tiles in a Crucible (drag/drop + voice) to transmute them into living words, each shown as an illustrated vignette with etymology. Successful transmutations branch a radial Philosopher's Tree; a Bestiary grimoire collects discovered words; Alchemist's Trials test semantic nuance.

## User Choices
- Voice: browser Web Speech API (no keys)
- Vignettes: pre-generated illustrated images (Gemini Nano Banana) for a curated word set (18 words)
- Scope: all 3 constellations (Rule & Order, Light & Vision, Form & Change)
- Narration: text only
- Persistence: single local session, no login (localStorage UUID + MongoDB)

## Architecture
- **Backend** FastAPI + MongoDB. `/api/lexicon`, `/api/trials`, `/api/transmute`, `/api/progress`. Game data in `backend/lexicon_data.py` (33 reagents, 18 word recipes, 5 trials, 18 vignette image URLs).
- **Frontend** React 19 + Tailwind + shadcn/ui + framer motion feel via CSS. Components: Workbench, Crucible, MorphemeTile, VoiceIncantation, SparkVignette, PhilosophersTree, Trials, Bestiary. Steampunk theme in `App.css` with generated lab background.
- **Transmute engine**: exact ordered-sequence recipe match → success; any root-bearing non-recipe combo → witty "monster word"; otherwise inert.

## User Persona
- 7-year-old high-fluency reader; pattern-seeking systems thinker; treated as a serious young inventor.

## Core Requirements (static)
1. Tile assembly (click + HTML5 drag) into Crucible
2. Voice incantation (Web Speech API)
3. Illustrated vignette + etymology per word
4. Radial Philosopher's Tree per constellation
5. Alchemist's Trials (nuance dilemmas)
6. Grand Bestiary collection with persistence

## Implemented (2026-09-27)
- Full transmutation loop (assemble → spark → vignette) across all 3 constellations
- 18 curated words with pre-generated art, definitions, etymology
- Monster-word rogue transmutations + inert fallback
- Philosopher's Tree radial map with locked/discovered star nodes
- 5 Alchemist's Trials with per-choice feedback
- Bestiary grimoire grid with locked/unlocked entries
- Progress persistence (localStorage session UUID + MongoDB), header counter
- Web Speech API voice incantation (whole-word + phoneme assembly matching)
- **Living Monster Art** — on-demand "Illustrate this creature" button generates a unique image per rogue combo via Gemini Nano Banana (`/api/monster-art`)
- **Crisis Vignettes** — the soot-vents Trial reveals an animated outcome scene per ruler chosen (win/fail)
- **Root Archaeology** — new tab: 'oikos' root morphs across frames into Economy & Ecology with narration
- **Spoken Etymology** — browser speech synthesis auto-narrates each transmutation + replay/stop button
- Verified: 15/15 backend tests, 100% frontend flows (iterations 1 & 2)

## Implemented (2026-09-27 — iteration 3)
- **Monster Bestiary**: illustrated rogue monster words can be saved to a "Rogue Creatures" page in the grimoire (`/api/monsters` save/list), persisted per session
- **More Root Journeys**: Root Archaeology now covers 4 roots — oikos, morph, chron, graph — each a 3-frame time-travel trail
- **Trial Rewards**: mastering all 5 trials reveals a shiny brass "Master Alchemist" badge with a spoken fanfare
- Verified: 18/18 backend tests, 100% frontend flows (iteration 3)

## Backlog
- **P1**: TTS spoken etymology narration (OpenAI TTS)
- **P1**: AI-generated art for arbitrary monster words
- **P2**: Semantic Diagnostic animated crisis scenes (interactive dilemma vignettes)
- **P2**: Root Archaeology timeline (oikos → economy/ecology morphing)
- **P2**: More constellations & reagents; badges/achievements
- **P2**: Multi-profile support / per-child login
