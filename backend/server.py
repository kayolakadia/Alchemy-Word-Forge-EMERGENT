from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel
from typing import List
from datetime import datetime, timezone

from lexicon_data import (
    REAGENTS, REAGENT_INDEX, CONSTELLATIONS, WORDS, RECIPE_INDEX, TRIALS,
    VIGNETTE_IMAGES,
)

# Attach pre-generated vignette artwork to each word (shared objects).
for _w in WORDS:
    _w["image"] = VIGNETTE_IMAGES.get(_w["id"])

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

LAB_BACKGROUND = "https://static.prod-images.emergentagent.com/jobs/dd8090bc-b2b2-4f7b-9695-5e715c421e40/images/ef532027542b55be75b2e79498022bc3261892e30f6022d017f7c9dd43505463.jpeg"

app = FastAPI()
api_router = APIRouter(prefix="/api")


class TransmuteRequest(BaseModel):
    reagent_ids: List[str]


class ProgressPayload(BaseModel):
    session_id: str
    discovered_words: List[str] = []
    solved_trials: List[str] = []


def _build_monster(reagents):
    """Rule-based 'rogue transmutation' — a witty non-standard compound word."""
    name = "".join(r["glyph"].replace("-", "") for r in reagents)
    name = name[:1].upper() + name[1:]
    prefixes = [r for r in reagents if r["type"] == "prefix"]
    roots = [r for r in reagents if r["type"] == "root"]
    suffixes = [r for r in reagents if r["type"] == "suffix"]

    core_bits = [r["meaning"] for r in prefixes + roots]
    core = " ".join(core_bits) if core_bits else "the unknown"

    suffix_id = suffixes[-1]["id"] if suffixes else None
    if suffix_id == "phobia":
        meaning = f"An irrational fear of {core}."
    elif suffix_id == "ology":
        meaning = f"The peculiar study of {core}."
    elif suffix_id == "ism":
        meaning = f"The strange practice or condition of {core}."
    elif suffix_id in ("ous", "id", "ic", "escent"):
        meaning = f"Something utterly full of {core}."
    elif suffix_id == "osis":
        meaning = f"A slow, unnatural process involving {core}."
    else:
        meaning = "A meaning nobody has ever dared to define: " + " + ".join(
            f"{r['glyph']} ({r['meaning']})" for r in reagents
        ) + "."

    breakdown = " + ".join(f"{r['glyph']} ({r['meaning']})" for r in reagents)
    return {
        "id": "monster-" + name.lower(),
        "word": name,
        "is_monster": True,
        "definition": meaning,
        "etymology": breakdown,
        "vignette": f"A puff of unstable smoke coughs out a wobbly creature that embodies '{meaning.rstrip('.')}' — the laboratory chuckles nervously.",
        "sequence": [r["id"] for r in reagents],
    }


@api_router.get("/")
async def root():
    return {"message": "The Alchemical Lexicon is awake."}


@api_router.get("/lexicon")
async def get_lexicon():
    return {
        "reagents": REAGENTS,
        "constellations": CONSTELLATIONS,
        "words": WORDS,
        "background": LAB_BACKGROUND,
    }


@api_router.get("/trials")
async def get_trials():
    return {"trials": TRIALS}


@api_router.post("/transmute")
async def transmute(req: TransmuteRequest):
    ids = req.reagent_ids
    if not ids:
        return {"status": "inert", "message": "The crucible is empty. Add some reagents first."}

    unknown = [i for i in ids if i not in REAGENT_INDEX]
    if unknown:
        return {"status": "inert", "message": "Unknown reagent detected. The mixture fizzles out."}

    reagents = [REAGENT_INDEX[i] for i in ids]

    seq = tuple(ids)
    if seq in RECIPE_INDEX:
        w = RECIPE_INDEX[seq]
        return {"status": "success", "word": {**w, "is_monster": False}}

    has_root = any(r["type"] == "root" for r in reagents)
    if len(reagents) >= 2 and has_root:
        return {"status": "monster", "word": _build_monster(reagents)}

    return {
        "status": "inert",
        "message": "The reagents refuse to bind. Every true formula needs a Core Element (gold root).",
    }


@api_router.get("/progress/{session_id}")
async def get_progress(session_id: str):
    doc = await db.progress.find_one({"session_id": session_id}, {"_id": 0})
    if not doc:
        return {"session_id": session_id, "discovered_words": [], "solved_trials": []}
    return doc


@api_router.post("/progress")
async def save_progress(payload: ProgressPayload):
    doc = {
        "session_id": payload.session_id,
        "discovered_words": payload.discovered_words,
        "solved_trials": payload.solved_trials,
        "updated_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.progress.update_one(
        {"session_id": payload.session_id}, {"$set": doc}, upsert=True
    )
    return {"ok": True, **doc}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
