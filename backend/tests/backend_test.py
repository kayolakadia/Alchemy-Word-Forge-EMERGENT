"""Backend tests for The Alchemical Lexicon."""
import os
import uuid
import pytest
import requests

BASE_URL = os.environ["REACT_APP_BACKEND_URL"].rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---- Lexicon ----
class TestLexicon:
    def test_lexicon_shape(self, client):
        r = client.get(f"{API}/lexicon", timeout=30)
        assert r.status_code == 200
        data = r.json()
        assert len(data["reagents"]) == 33, f"expected 33 reagents, got {len(data['reagents'])}"
        assert len(data["constellations"]) == 3
        assert len(data["words"]) == 18, f"expected 18 words, got {len(data['words'])}"
        assert data["background"].startswith("http")
        for w in data["words"]:
            assert w.get("image", "").startswith("http"), f"word {w['id']} missing image"
            assert w["definition"]
            assert w["etymology"]
            assert isinstance(w["sequence"], list) and len(w["sequence"]) >= 1


# ---- Root Journeys (new in iteration 2) ----
class TestRootJourneys:
    def test_root_journeys_in_lexicon(self, client):
        r = client.get(f"{API}/lexicon", timeout=30)
        assert r.status_code == 200
        data = r.json()
        assert "root_journeys" in data
        rj = data["root_journeys"]
        assert isinstance(rj, list) and len(rj) >= 1
        first = rj[0]
        assert first["id"] == "oikos"
        assert len(first["frames"]) == 3
        for f in first["frames"]:
            assert f.get("image", "").startswith("http")
            assert f["title"]
            assert f["era"]
            assert f["text"]


# ---- Trials outcome image (new in iteration 2) ----
class TestTrialsOutcomeImage:
    def test_t_vents_outcome_images(self, client):
        r = client.get(f"{API}/trials", timeout=30)
        trials = r.json()["trials"]
        t = next(x for x in trials if x["id"] == "t-vents")
        for o in t["options"]:
            assert o.get("outcome_image", "").startswith("http"), f"missing outcome_image on {o['id']}"


# ---- Monster art endpoint (new, real Gemini call, slow) ----
class TestMonsterArt:
    def test_monster_art_needs_two_reagents(self, client):
        r = client.post(f"{API}/monster-art", json={"reagent_ids": ["auto"]}, timeout=30)
        assert r.status_code == 400

    def test_monster_art_generates_image(self, client):
        r = client.post(
            f"{API}/monster-art",
            json={"reagent_ids": ["chron", "bio", "phobia"]},
            timeout=120,
        )
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["image"].startswith("data:image/")
        assert ";base64," in data["image"]
        assert data["word"]["word"] == "Chronbiophobia"



# ---- Trials ----
class TestTrials:
    def test_trials(self, client):
        r = client.get(f"{API}/trials", timeout=30)
        assert r.status_code == 200
        trials = r.json()["trials"]
        assert len(trials) == 5
        for t in trials:
            assert t["scenario"]
            assert len(t["options"]) >= 2
            assert sum(1 for o in t["options"] if o["correct"]) == 1


# ---- Transmute ----
class TestTransmute:
    @pytest.mark.parametrize("ids,word", [
        (["auto", "crat"], "Autocrat"),
        (["econo", "crat"], "Econocrat"),
        (["bio", "lumin", "escent"], "Bioluminescent"),
        (["meta", "morph", "osis"], "Metamorphosis"),
    ])
    def test_success_recipes(self, client, ids, word):
        r = client.post(f"{API}/transmute", json={"reagent_ids": ids})
        assert r.status_code == 200
        data = r.json()
        assert data["status"] == "success", data
        assert data["word"]["word"] == word
        assert data["word"]["image"].startswith("http")
        assert data["word"]["is_monster"] is False

    def test_monster(self, client):
        r = client.post(f"{API}/transmute", json={"reagent_ids": ["chron", "bio", "phobia"]})
        assert r.status_code == 200
        data = r.json()
        assert data["status"] == "monster"
        assert data["word"]["is_monster"] is True
        assert data["word"]["definition"]

    def test_inert_single_prefix(self, client):
        r = client.post(f"{API}/transmute", json={"reagent_ids": ["auto"]})
        assert r.status_code == 200
        data = r.json()
        assert data["status"] == "inert"
        assert "message" in data

    def test_inert_empty(self, client):
        r = client.post(f"{API}/transmute", json={"reagent_ids": []})
        assert r.json()["status"] == "inert"


# ---- Progress ----
class TestProgress:
    def test_progress_upsert_and_get(self, client):
        sid = f"TEST_{uuid.uuid4()}"
        payload = {"session_id": sid, "discovered_words": ["autocrat", "econocrat"], "solved_trials": ["t-vents"]}
        r = client.post(f"{API}/progress", json=payload)
        assert r.status_code == 200
        assert r.json()["ok"] is True

        r2 = client.get(f"{API}/progress/{sid}")
        assert r2.status_code == 200
        d = r2.json()
        assert d["discovered_words"] == ["autocrat", "econocrat"]
        assert d["solved_trials"] == ["t-vents"]

        # update
        payload2 = {"session_id": sid, "discovered_words": ["autocrat", "econocrat", "lucid"], "solved_trials": ["t-vents", "t-far"]}
        client.post(f"{API}/progress", json=payload2)
        d2 = client.get(f"{API}/progress/{sid}").json()
        assert "lucid" in d2["discovered_words"]
        assert "t-far" in d2["solved_trials"]

    def test_progress_get_missing(self, client):
        sid = f"TEST_missing_{uuid.uuid4()}"
        r = client.get(f"{API}/progress/{sid}")
        assert r.status_code == 200
        d = r.json()
        assert d["discovered_words"] == []
        assert d["solved_trials"] == []
