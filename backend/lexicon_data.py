"""The Alchemical Lexicon — curated morpheme reagents, word recipes, trials.

All vignette artwork is pre-generated and referenced by URL.
"""

IMG = "https://static.prod-images.emergentagent.com/jobs/dd8090bc-b2b2-4f7b-9695-5e715c421e40/images/"

VIGNETTE_IMAGES = {
    "autocrat": IMG + "5379227dab5152eba02e86cfc6919c00a44618378dbc63f7ee137b42811c94fc.jpeg",
    "plutocrat": IMG + "3fb373cd74b0053526a8f2960804c00139a8d0192289626e92550db06bce2b27.jpeg",
    "technocrat": IMG + "71669a7fc30281bb9533e5f73b8fc36bb0ba8d00ac380a1aa403126af4e11ea3.jpeg",
    "aristocrat": IMG + "80dbe26415806078daf897cdd89bc5257ab402d5c5b779656f00dbfbfbe0d3e0.jpeg",
    "democrat": IMG + "d35c12e6ad194c84f2a5998a9a4f05af3e674b390876daf41eb0a5b5bf3a3ce9.jpeg",
    "theocrat": IMG + "d691c215db39ea2a51f507228da47b024820e1c6f06d0489919da61c3efc5e45.jpeg",
    "econocrat": IMG + "4908927a4f763cda997ae2c61c98614b25ea0c4a1d4e14eba6bb6e3490e69a2b.jpeg",
    "bureaucrat": IMG + "e1166f5721ca4bfcd76db019207cc0c52380385272faad4b17eb28ac0c2005f0.jpeg",
    "bioluminescent": IMG + "6e04d450379297b492201ea2dff330de735272d60e0a194e014e12e477540455.jpeg",
    "kaleidoscope": IMG + "9d04cadbe5b19e78fc478d89eb5e17418017418870c58106b47973bb736bf7cb.jpeg",
    "telephoto": IMG + "f52d576a5842f1f166bdf25471d44c833dc97bca0dfca6a1b74bd6cbb348cb2f.jpeg",
    "microscopic": IMG + "bf9ffcddc04c0d8cfc61b225ce7b7a91818fbef0723d30a71fd6018291253e5c.jpeg",
    "lucid": IMG + "1805450d1e2555adbf8d11268cd955b7d3b5fe4f3bb34d14b50e1842c61d97c2.jpeg",
    "metamorphosis": IMG + "dfe7deeb4e68dfeeadfe04839fcd2ff419a4c3b0feae86d5d7fab5ca49042373.jpeg",
    "amorphous": IMG + "10e6cb86451f3ab9e68c8cff1e5fdae58962d2a697b697db41490c1c9841f75a.jpeg",
    "synchronous": IMG + "cf79c85f1406ff6d9382c2cb091ca603dea9f65e690aaf59ff3ed6322acf2c00.jpeg",
    "anachronism": IMG + "e05c7d02725bab879efc1af5c06c8f280ccb6c7080309accdbae1ea264cab868.jpeg",
    "pseudonym": IMG + "a34396c61b763e095b7fbbfff8f651db673b02e7c6e7d8ac02ec792edb0f3e43.jpeg",
}

# Crisis outcome scenes for the "soot vents" trial
CRISIS_IMAGES = {
    "technocrat_win": IMG + "ed9ad363d8b7962869901f3e13e86f4e1de0122db65248efa3c0282c65dd3c65.jpeg",
    "plutocrat_fail": IMG + "a7fb6e0cf01fd4f55bbea579a040afa536422aeb18dcec4bb132fa1517f89b15.jpeg",
    "autocrat_fail": IMG + "69ae5e9a794c866f35806d71ae2b6cd76da5a4a28fd2090018e2b35ca270b5f4.jpeg",
}

# Reward badge shown when all Alchemist's Trials are mastered
TRIAL_BADGE = IMG + "4389afb8f59563d5debf8086814c6fa8e711def42c4932c396047d1b51ede0d5.jpeg"

# Root Archaeology — one root morphing across centuries into modern words
ROOT_JOURNEYS = [
    {
        "id": "oikos",
        "root": "oikos",
        "meaning": "the household / home",
        "intro": "One tiny ancient root — 'oikos', meaning the household — grew across the centuries into two very different modern words. Watch it transmute.",
        "frames": [
            {
                "id": "oikos", "title": "οἶκος · oikos", "era": "Ancient Greece",
                "image": IMG + "68081895b6a87997c13c024327a276ca09387972ca6de353732192fa6a2db2f3.jpeg",
                "text": "In ancient Greece, 'oikos' meant the household — the home, its family, and everything needed to keep it running.",
            },
            {
                "id": "economy", "title": "Economy", "era": "The Ledger",
                "image": IMG + "c620bf1fccb7e0054a5d1aaeec491584e037b00f3f40149d7e2bdd108bac1d4f.jpeg",
                "text": "'oikos' (household) + 'nomos' (managing) became ECONOMY — the careful managing of a household's, and later a whole nation's, resources.",
            },
            {
                "id": "ecology", "title": "Ecology", "era": "The Living Home",
                "image": IMG + "37081f3c9fcfb9394d68e64991209ead5b44c51255e57432a4dcb0f41b1714f5.jpeg",
                "text": "'oikos' (household) + 'logos' (study) became ECOLOGY — the study of nature's living household and how its creatures share one home.",
            },
        ],
    },
    {
        "id": "morph",
        "root": "morph",
        "meaning": "form / shape",
        "intro": "The Greek root 'morphe' means form or shape. From it flow words about changing form — and lacking it.",
        "frames": [
            {
                "id": "morphe", "title": "μορφή · morphe", "era": "Ancient Greece",
                "image": IMG + "bebeb2a5d0625295f091c502a279c8c16d57d8983a2c0b13a92a0be194bd130e.jpeg",
                "text": "In ancient Greece, 'morphe' meant form or shape — the very outline that makes a thing what it is.",
            },
            {
                "id": "metamorphosis", "title": "Metamorphosis", "era": "The Great Change",
                "image": IMG + "dfe7deeb4e68dfeeadfe04839fcd2ff419a4c3b0feae86d5d7fab5ca49042373.jpeg",
                "text": "'meta' (change) + 'morphe' (form) became METAMORPHOSIS — a complete change of form, like a caterpillar into a butterfly.",
            },
            {
                "id": "amorphous", "title": "Amorphous", "era": "The Formless",
                "image": IMG + "10e6cb86451f3ab9e68c8cff1e5fdae58962d2a697b697db41490c1c9841f75a.jpeg",
                "text": "'a' (without) + 'morphe' (form) became AMORPHOUS — having no fixed shape at all.",
            },
        ],
    },
    {
        "id": "chron",
        "root": "chron",
        "meaning": "time",
        "intro": "The Greek root 'khronos' means time. It ticks quietly inside many words about when things happen.",
        "frames": [
            {
                "id": "khronos", "title": "χρόνος · khronos", "era": "The Dawn of Time",
                "image": IMG + "12a192ed725c55179e8110f6179bc92b698f326e4fb94ea19db304571e6c2ffd.jpeg",
                "text": "'khronos' was the ancient Greek word for time itself — measured, flowing, and unstoppable.",
            },
            {
                "id": "synchronous", "title": "Synchronous", "era": "Together in Time",
                "image": IMG + "cf79c85f1406ff6d9382c2cb091ca603dea9f65e690aaf59ff3ed6322acf2c00.jpeg",
                "text": "'syn' (together) + 'khronos' (time) became SYNCHRONOUS — happening at exactly the same moment, in perfect step.",
            },
            {
                "id": "anachronism", "title": "Anachronism", "era": "Out of Time",
                "image": IMG + "e05c7d02725bab879efc1af5c06c8f280ccb6c7080309accdbae1ea264cab868.jpeg",
                "text": "'ana' (against) + 'khronos' (time) became ANACHRONISM — something in the wrong time, like a knight holding a phone.",
            },
        ],
    },
    {
        "id": "graph",
        "root": "graph",
        "meaning": "to write / draw",
        "intro": "The Greek root 'graphein' means to write or draw. It leaves its mark on every word about recording things.",
        "frames": [
            {
                "id": "graphein", "title": "γράφειν · graphein", "era": "The First Marks",
                "image": IMG + "39fae08d325e029c0661e7a10e5398999b1d53c1a0cf1fbb75452a2f69050ef6.jpeg",
                "text": "'graphein' meant to scratch, write, or draw — the very first act of recording a thought.",
            },
            {
                "id": "photograph", "title": "Photograph", "era": "Writing with Light",
                "image": IMG + "2ff93a8432ba43d0c5e051d2bb0765d369645b4896080a6571a55ffd976ea68c.jpeg",
                "text": "'phos' (light) + 'graphein' (to write) became PHOTOGRAPH — a picture written by light itself.",
            },
            {
                "id": "autograph", "title": "Autograph", "era": "Writing the Self",
                "image": IMG + "ecbcda646507bf6fa751e79d7b8964e17a8eb74fc54374b88cb715eb00f13a9d.jpeg",
                "text": "'autos' (self) + 'graphein' (to write) became AUTOGRAPH — your own name written in your own hand.",
            },
        ],
    },
]

# ---------------------------------------------------------------------------
# REAGENTS  (type: prefix=Catalyst/blue, root=Element/gold, suffix=Seal/green)
# phonemes = spoken fragments the Web Speech API may return for voice matching
# ---------------------------------------------------------------------------
REAGENTS = [
    # --- Constellation 1: Rule & Order ---
    {"id": "auto", "glyph": "auto-", "type": "prefix", "meaning": "self / one", "origin": "Greek 'autos' — self", "phonemes": ["auto", "otto", "oto"]},
    {"id": "pluto", "glyph": "pluto-", "type": "prefix", "meaning": "wealth", "origin": "Greek 'ploutos' — riches", "phonemes": ["pluto", "plutoh", "ploo"]},
    {"id": "techno", "glyph": "techno-", "type": "prefix", "meaning": "skill / craft", "origin": "Greek 'tekhne' — art, craft", "phonemes": ["techno", "tekno", "tech"]},
    {"id": "aristo", "glyph": "aristo-", "type": "prefix", "meaning": "best / noble", "origin": "Greek 'aristos' — best", "phonemes": ["aristo", "aris"]},
    {"id": "demo", "glyph": "demo-", "type": "prefix", "meaning": "the people", "origin": "Greek 'demos' — common people", "phonemes": ["demo", "democ", "dem"]},
    {"id": "theo", "glyph": "theo-", "type": "prefix", "meaning": "god", "origin": "Greek 'theos' — god", "phonemes": ["theo", "thee"]},
    {"id": "bureau", "glyph": "bureau-", "type": "prefix", "meaning": "desk / office", "origin": "French 'bureau' — writing desk", "phonemes": ["bureau", "byuro", "bureo"]},
    {"id": "econo", "glyph": "econo-", "type": "prefix", "meaning": "household / resources", "origin": "Greek 'oikos' — house", "phonemes": ["econo", "ekono", "econ"]},
    {"id": "crat", "glyph": "-crat", "type": "root", "meaning": "power / rule", "origin": "Greek 'kratos' — strength, rule", "phonemes": ["crat", "krat", "cratt"]},

    # --- Constellation 2: Light & Vision ---
    {"id": "bio", "glyph": "bio-", "type": "prefix", "meaning": "life", "origin": "Greek 'bios' — life", "phonemes": ["bio", "byo"]},
    {"id": "tele", "glyph": "tele-", "type": "prefix", "meaning": "far / distant", "origin": "Greek 'tele' — far off", "phonemes": ["tele", "telly", "tel"]},
    {"id": "micro", "glyph": "micro-", "type": "prefix", "meaning": "small / tiny", "origin": "Greek 'mikros' — small", "phonemes": ["micro", "mikro", "mike"]},
    {"id": "kaleido", "glyph": "kaleido-", "type": "prefix", "meaning": "beautiful form", "origin": "Greek 'kalos'+'eidos' — beautiful shape", "phonemes": ["kaleido", "collide", "kalei"]},
    {"id": "lumin", "glyph": "lumin", "type": "root", "meaning": "light", "origin": "Latin 'lumen' — light", "phonemes": ["lumin", "loomin", "lumen"]},
    {"id": "scop", "glyph": "scop", "type": "root", "meaning": "to see / watch", "origin": "Greek 'skopein' — to look", "phonemes": ["scope", "scop", "skope"]},
    {"id": "photo", "glyph": "photo", "type": "root", "meaning": "light", "origin": "Greek 'phos' — light", "phonemes": ["photo", "foto", "photoh"]},
    {"id": "luc", "glyph": "luc", "type": "root", "meaning": "clear light", "origin": "Latin 'lucere' — to shine", "phonemes": ["luce", "loose", "luc"]},

    # --- Constellation 3: Form & Change ---
    {"id": "meta", "glyph": "meta-", "type": "prefix", "meaning": "change / beyond", "origin": "Greek 'meta' — change, after", "phonemes": ["meta", "metta"]},
    {"id": "a", "glyph": "a-", "type": "prefix", "meaning": "without / not", "origin": "Greek 'a-' — not, without", "phonemes": ["ay", "a", "uh"]},
    {"id": "syn", "glyph": "syn-", "type": "prefix", "meaning": "together", "origin": "Greek 'syn' — with, together", "phonemes": ["syn", "sin", "sing"]},
    {"id": "ana", "glyph": "ana-", "type": "prefix", "meaning": "back / against", "origin": "Greek 'ana' — up, back", "phonemes": ["ana", "anna", "an"]},
    {"id": "pseudo", "glyph": "pseudo-", "type": "prefix", "meaning": "false / fake", "origin": "Greek 'pseudes' — false", "phonemes": ["pseudo", "sudo", "soodo"]},
    {"id": "morph", "glyph": "morph", "type": "root", "meaning": "form / shape", "origin": "Greek 'morphe' — form", "phonemes": ["morph", "morf"]},
    {"id": "chron", "glyph": "chron", "type": "root", "meaning": "time", "origin": "Greek 'khronos' — time", "phonemes": ["chron", "kron", "chrono"]},
    {"id": "onym", "glyph": "onym", "type": "root", "meaning": "name", "origin": "Greek 'onoma' — name", "phonemes": ["onym", "onim", "nym"]},

    # --- Shared / bonus seals used across monster words & recipes ---
    {"id": "escent", "glyph": "-escent", "type": "suffix", "meaning": "becoming / glowing", "origin": "Latin '-escentem' — beginning to be", "phonemes": ["escent", "essent", "esent"]},
    {"id": "ic", "glyph": "-ic", "type": "suffix", "meaning": "relating to", "origin": "Greek '-ikos' — pertaining to", "phonemes": ["ic", "ick", "ik"]},
    {"id": "id", "glyph": "-id", "type": "suffix", "meaning": "in a state of", "origin": "Latin '-idus' — state of", "phonemes": ["id", "idd", "eed"]},
    {"id": "osis", "glyph": "-osis", "type": "suffix", "meaning": "process / condition", "origin": "Greek '-osis' — process", "phonemes": ["osis", "ohsis", "osus"]},
    {"id": "ous", "glyph": "-ous", "type": "suffix", "meaning": "full of", "origin": "Latin '-osus' — full of", "phonemes": ["ous", "us", "ouss"]},
    {"id": "ism", "glyph": "-ism", "type": "suffix", "meaning": "a state / practice", "origin": "Greek '-ismos' — condition", "phonemes": ["ism", "izm", "izum"]},
    {"id": "phobia", "glyph": "-phobia", "type": "suffix", "meaning": "irrational fear", "origin": "Greek 'phobos' — fear", "phonemes": ["phobia", "fobia", "phobiah"]},
    {"id": "ology", "glyph": "-ology", "type": "suffix", "meaning": "the study of", "origin": "Greek 'logos' — word, study", "phonemes": ["ology", "ollogy", "olagy"]},
]

REAGENT_INDEX = {r["id"]: r for r in REAGENTS}

# ---------------------------------------------------------------------------
# CONSTELLATIONS + WORD RECIPES
# sequence = ordered reagent ids that transmute into the word
# ---------------------------------------------------------------------------
CONSTELLATIONS = [
    {
        "id": "rule-order",
        "name": "The Crucible of Rule & Order",
        "tagline": "Who holds the power?",
        "core_root": "crat",
        "reagent_ids": ["auto", "pluto", "techno", "aristo", "demo", "theo", "bureau", "econo", "crat"],
    },
    {
        "id": "light-vision",
        "name": "The Crucible of Light & Vision",
        "tagline": "To shine and to see.",
        "core_root": "lumin",
        "reagent_ids": ["bio", "tele", "micro", "kaleido", "lumin", "scop", "photo", "luc", "escent", "ic", "id"],
    },
    {
        "id": "form-change",
        "name": "The Crucible of Form & Change",
        "tagline": "Shape, time, and name.",
        "core_root": "morph",
        "reagent_ids": ["meta", "a", "syn", "ana", "pseudo", "morph", "chron", "onym", "osis", "ous", "ism"],
    },
]

WORDS = [
    # ---- Rule & Order (branch from root 'crat') ----
    {"id": "autocrat", "word": "Autocrat", "constellation": "rule-order", "sequence": ["auto", "crat"], "branch": "crat",
     "definition": "A single supreme ruler who holds absolute power all by themselves.",
     "etymology": "Root: 'autos' (self) + 'kratos' (power, rule). Literally, self-power — one solitary hand ruling everything.",
     "vignette": "A lone crowned clockwork monarch reigns from a towering throne, subjects bowing far below to a single supreme will."},
    {"id": "plutocrat", "word": "Plutocrat", "constellation": "rule-order", "sequence": ["pluto", "crat"], "branch": "crat",
     "definition": "A ruler whose power comes purely from immense private wealth.",
     "etymology": "Root: 'ploutos' (wealth) + 'kratos' (power). Rule by riches — gold is the throne.",
     "vignette": "A coin-encrusted tycoon lounges atop a glittering mountain of treasure, ruling through the weight of gold alone."},
    {"id": "technocrat", "word": "Technocrat", "constellation": "rule-order", "sequence": ["techno", "crat"], "branch": "crat",
     "definition": "An official who governs through scientific and technical expertise.",
     "etymology": "Root: 'tekhne' (skill, craft) + 'kratos' (power). Rule by the skilled and the clever.",
     "vignette": "An engineer-official commands a storm of blueprints, gears and pressure gauges, solving the realm by formula."},
    {"id": "aristocrat", "word": "Aristocrat", "constellation": "rule-order", "sequence": ["aristo", "crat"], "branch": "crat",
     "definition": "A ruler who holds power by inherited noble birth.",
     "etymology": "Root: 'aristos' (best) + 'kratos' (power). Rule by those deemed 'the best' by bloodline.",
     "vignette": "A powdered noble stands before a gallery of gilded ancestors, power passed down like an heirloom."},
    {"id": "democrat", "word": "Democrat", "constellation": "rule-order", "sequence": ["demo", "crat"], "branch": "crat",
     "definition": "One who believes power belongs to all the people together.",
     "etymology": "Root: 'demos' (the people) + 'kratos' (power). Rule by the many, not the one.",
     "vignette": "A joyful crowd raises hands and drops tokens into a great ballot urn — a chorus of shared voice."},
    {"id": "theocrat", "word": "Theocrat", "constellation": "rule-order", "sequence": ["theo", "crat"], "branch": "crat",
     "definition": "A ruler who governs by divine or religious authority.",
     "etymology": "Root: 'theos' (god) + 'kratos' (power). Rule believed to come from the heavens.",
     "vignette": "A robed ruler haloed in celestial rings raises a staff atop temple steps, decreeing by sacred light."},
    {"id": "bureaucrat", "word": "Bureaucrat", "constellation": "rule-order", "sequence": ["bureau", "crat"], "branch": "crat",
     "definition": "An official who rules through desks, forms and administrative rules.",
     "etymology": "Root: 'bureau' (writing desk) + 'kratos' (power). Rule by paperwork and red tape.",
     "vignette": "A weary clerk is buried under towers of paperwork and endless coils of red tape."},
    {"id": "econocrat", "word": "Econocrat", "constellation": "rule-order", "sequence": ["econo", "crat"], "branch": "crat",
     "definition": "An official who governs purely by economic balance sheets and financial models.",
     "etymology": "Root: 'oikos' (the household / resources) + 'kratos' (power, rule). Rule by the ledger.",
     "vignette": "A spectacled official weighs baskets of grain against stacks of gold on a giant balance while clerks await decrees."},

    # ---- Light & Vision ----
    {"id": "bioluminescent", "word": "Bioluminescent", "constellation": "light-vision", "sequence": ["bio", "lumin", "escent"], "branch": "lumin",
     "definition": "Describing a living thing that produces its own glowing light.",
     "etymology": "'bios' (life) + 'lumen' (light) + '-escent' (becoming). Life that begins to glow.",
     "vignette": "A dark grotto blooms with luminous jellyfish and glowing mushrooms, each creature its own tiny lantern."},
    {"id": "kaleidoscope", "word": "Kaleidoscope", "constellation": "light-vision", "sequence": ["kaleido", "scop"], "branch": "scop",
     "definition": "A tube of mirrors that shows ever-changing symmetrical patterns of colour.",
     "etymology": "'kalos'+'eidos' (beautiful form) + 'skopein' (to see). A watcher of beautiful forms.",
     "vignette": "A brass kaleidoscope throws a dazzling wheel of jewel-bright geometric patterns into the air."},
    {"id": "telephoto", "word": "Telephoto", "constellation": "light-vision", "sequence": ["tele", "photo"], "branch": "photo",
     "definition": "A lens that captures the light of faraway things and brings them close.",
     "etymology": "'tele' (far) + 'phos' (light). Far-light — gathering distant glimmers.",
     "vignette": "A long brass lens on a tripod pulls a faraway mountain peak into a glowing circle of clarity."},
    {"id": "microscopic", "word": "Microscopic", "constellation": "light-vision", "sequence": ["micro", "scop", "ic"], "branch": "scop",
     "definition": "So tiny it can only be seen with a magnifying instrument.",
     "etymology": "'mikros' (small) + 'skopein' (to see) + '-ic' (relating to). Of the small-seeing.",
     "vignette": "A grand microscope reveals a glowing world of tiny whimsical creatures too small for the naked eye."},
    {"id": "lucid", "word": "Lucid", "constellation": "light-vision", "sequence": ["luc", "id"], "branch": "luc",
     "definition": "Perfectly clear and easy to understand; shining with clarity.",
     "etymology": "'lucere' (to shine) + '-id' (in a state of). In a state of shining clearness.",
     "vignette": "A crystal-clear orb radiates pure light, turning murky fog into transparent, understandable clarity."},

    # ---- Form & Change ----
    {"id": "metamorphosis", "word": "Metamorphosis", "constellation": "form-change", "sequence": ["meta", "morph", "osis"], "branch": "morph",
     "definition": "A complete change of form, like a caterpillar becoming a butterfly.",
     "etymology": "'meta' (change) + 'morphe' (form) + '-osis' (process). The process of changing form.",
     "vignette": "A caterpillar becomes a glowing chrysalis and emerges as a radiant clockwork-winged butterfly."},
    {"id": "amorphous", "word": "Amorphous", "constellation": "form-change", "sequence": ["a", "morph", "ous"], "branch": "morph",
     "definition": "Having no fixed shape or definite form.",
     "etymology": "'a-' (without) + 'morphe' (form) + '-ous' (full of). Full of no-form.",
     "vignette": "A wobbly translucent blob of alchemical ooze refuses every shape the alchemist tries to give it."},
    {"id": "synchronous", "word": "Synchronous", "constellation": "form-change", "sequence": ["syn", "chron", "ous"], "branch": "chron",
     "definition": "Happening at exactly the same time, in perfect step.",
     "etymology": "'syn' (together) + 'khronos' (time) + '-ous' (full of). Full of together-time.",
     "vignette": "A wall of pendulum clocks swings in flawless unison as little automatons march in perfect lockstep."},
    {"id": "anachronism", "word": "Anachronism", "constellation": "form-change", "sequence": ["ana", "chron", "ism"], "branch": "chron",
     "definition": "Something placed in the wrong time period, out of its proper age.",
     "etymology": "'ana' (against, back) + 'khronos' (time) + '-ism' (condition). A thing against its time.",
     "vignette": "A medieval knight puzzles over a glowing modern gadget while a dinosaur wears a shiny wristwatch."},
    {"id": "pseudonym", "word": "Pseudonym", "constellation": "form-change", "sequence": ["pseudo", "onym"], "branch": "onym",
     "definition": "A false or invented name used in place of one's real name.",
     "etymology": "'pseudes' (false) + 'onoma' (name). A false-name worn like a mask.",
     "vignette": "A masked writer signs a document with a made-up identity, their true face hidden behind a shimmering persona."},
]

WORD_INDEX = {w["id"]: w for w in WORDS}
# recipe lookup keyed by the ordered sequence of reagent ids
RECIPE_INDEX = {tuple(w["sequence"]): w for w in WORDS}

# ---------------------------------------------------------------------------
# ALCHEMIST'S TRIALS
# ---------------------------------------------------------------------------
TRIALS = [
    {
        "id": "t-vents",
        "kind": "Semantic Diagnostic",
        "scenario": "The sky-city's atmospheric filtration conduits are clogging with volcanic soot! Three rulers step forward. Whose approach will actually clear the vents?",
        "options": [
            {"id": "o1", "label": "The Plutocrat", "sub": "offers to buy the clouds with gold", "correct": False,
             "outcome_image": CRISIS_IMAGES["plutocrat_fail"],
             "feedback": "Gold coins clatter uselessly against the soot clouds. Wealth cannot un-clog a pipe."},
            {"id": "o2", "label": "The Autocrat", "sub": "decrees that ash is forbidden to fall", "correct": False,
             "outcome_image": CRISIS_IMAGES["autocrat_fail"],
             "feedback": "The ash ignores the imperial decree entirely. Commands do not bend physics."},
            {"id": "o3", "label": "The Technocrat", "sub": "brings fluid-dynamic pressure & heat-exchange formulas", "correct": True,
             "outcome_image": CRISIS_IMAGES["technocrat_win"],
             "feedback": "Steam turbines roar to life and the vents blow clear! Rule by skill ('tekhne') wins the day."},
        ],
    },
    {
        "id": "t-noble",
        "kind": "Fine Nuance",
        "scenario": "The council seeks the ruler who holds power purely by inherited noble birth. Which seal do you place in the chamber?",
        "options": [
            {"id": "o1", "label": "Aristocrat", "sub": "'aristos' — the best by birth", "correct": True,
             "feedback": "Correct! 'aristos' means best — the aristocrat inherits power by noble bloodline."},
            {"id": "o2", "label": "Democrat", "sub": "'demos' — the people", "correct": False,
             "feedback": "Not quite — 'demos' means the people. A democrat shares power, not inherits it."},
            {"id": "o3", "label": "Theocrat", "sub": "'theos' — god", "correct": False,
             "feedback": "Close in feel, but 'theos' means god. A theocrat rules by divine, not noble, right."},
        ],
    },
    {
        "id": "t-oikos",
        "kind": "Root Archaeology",
        "scenario": "The ancient Greek root 'oikos' means household or home. It grew into two very different words. Which one is the STUDY of the living home and its creatures?",
        "options": [
            {"id": "o1", "label": "Economy", "sub": "oikos + nomos (managing)", "correct": False,
             "feedback": "Economy manages the household's resources — a budget spreadsheet, not a study of creatures."},
            {"id": "o2", "label": "Ecology", "sub": "oikos + logos (study)", "correct": True,
             "feedback": "Yes! 'oikos' (home) + 'logos' (study) = ecology, the study of living things and their home."},
            {"id": "o3", "label": "Autocracy", "sub": "autos + kratos", "correct": False,
             "feedback": "That's from a different root entirely — 'autos' + 'kratos', rule by one."},
        ],
    },
    {
        "id": "t-far",
        "kind": "Fine Nuance",
        "scenario": "You must photograph a mountain peak that is very, very far away. Which catalyst reagent do you reach for?",
        "options": [
            {"id": "o1", "label": "micro-", "sub": "small", "correct": False,
             "feedback": "'micro-' means small — that would help you see tiny things up close, not far away."},
            {"id": "o2", "label": "tele-", "sub": "far / distant", "correct": True,
             "feedback": "Correct! 'tele-' means far. Tele + photo = telephoto, capturing distant light."},
            {"id": "o3", "label": "bio-", "sub": "life", "correct": False,
             "feedback": "'bio-' means life — useful for glowing creatures, not distance."},
        ],
    },
    {
        "id": "t-meta",
        "kind": "Fine Nuance",
        "scenario": "'meta-' means change and 'morph' means form. So what is a METAMORPHOSIS?",
        "options": [
            {"id": "o1", "label": "A complete change of form", "sub": "like caterpillar to butterfly", "correct": True,
             "feedback": "Exactly! meta (change) + morph (form) + -osis (process) = the process of changing form."},
            {"id": "o2", "label": "A fear of forms", "sub": "", "correct": False,
             "feedback": "That would need '-phobia' (fear). Metamorphosis is about change, not fear."},
            {"id": "o3", "label": "The study of forms", "sub": "", "correct": False,
             "feedback": "That would need '-ology' (study). Here '-osis' means a process instead."},
        ],
    },
]
