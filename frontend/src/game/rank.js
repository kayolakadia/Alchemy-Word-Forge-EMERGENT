export const RANKS = [
  { id: "apprentice", title: "Cinder Apprentice", min: 0, blurb: "Every master was once a single spark." },
  { id: "journeyman", title: "Journeyman of Runes", min: 4, blurb: "The reagents are beginning to obey you." },
  { id: "adept", title: "Adept of Roots", min: 9, blurb: "You read words by their ancient bones." },
  { id: "savant", title: "Savant of the Lexicon", min: 15, blurb: "Few command language so deftly." },
  { id: "master", title: "Master Alchemist", min: 22, blurb: "The living word itself bends to your will." },
];

export function getRankIndex(score) {
  let idx = 0;
  RANKS.forEach((r, i) => { if (score >= r.min) idx = i; });
  return idx;
}

export function getRank(score) {
  return RANKS[getRankIndex(score)];
}

export function getNextRank(score) {
  return RANKS.find((r) => r.min > score) || null;
}
