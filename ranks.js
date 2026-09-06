export const RANKS = [
  { id: 0, name: "Novice", icon: "🌱", minElo: 0, maxElo: 400, color: "#95a5a6", badge: "gray" },
  { id: 1, name: "Apprentice", icon: "📚", minElo: 400, maxElo: 600, color: "#3498db", badge: "blue" },
  { id: 2, name: "Knight Errant", icon: "🗡️", minElo: 600, maxElo: 800, color: "#9b59b6", badge: "purple" },
  { id: 3, name: "Master Knight", icon: "⚔️", minElo: 800, maxElo: 1000, color: "#e74c3c", badge: "red" },
  { id: 4, name: "Warlord", icon: "👑", minElo: 1000, maxElo: 1200, color: "#f39c12", badge: "orange" },
  { id: 5, name: "Dragon Slayer", icon: "🐉", minElo: 1200, maxElo: 1400, color: "#e67e22", badge: "darkorange" },
  { id: 6, name: "Legendary Warrior", icon: "⚡", minElo: 1400, maxElo: 1600, color: "#f1c40f", badge: "gold" },
  { id: 7, name: "Mythic Champion", icon: "🌟", minElo: 1600, maxElo: 1800, color: "#2ecc71", badge: "green" },
  { id: 8, name: "Eternal Guardian", icon: "🛡️", minElo: 1800, maxElo: 2000, color: "#1abc9c", badge: "teal" },
  { id: 9, name: "Supreme Master", icon: "👾", minElo: 2000, maxElo: 2200, color: "#34495e", badge: "darkgray" },
  { id: 10, name: "Cosmic Sage", icon: "🌌", minElo: 2200, maxElo: 2400, color: "#8e44ad", badge: "violet" },
  { id: 11, name: "Titan of Minds", icon: "🗿", minElo: 2400, maxElo: 2600, color: "#c0392b", badge: "darkred" },
  { id: 12, name: "Dimensional Keeper", icon: "🌀", minElo: 2600, maxElo: 2800, color: "#16a085", badge: "darkgreen" },
  { id: 13, name: "Universal Scholar", icon: "📖", minElo: 2800, maxElo: 3000, color: "#2980b9", badge: "darkblue" },
  { id: 14, name: "Omniscient Oracle", icon: "🔮", minElo: 3000, maxElo: 3200, color: "#d35400", badge: "brown" },
  { id: 15, name: "Celestial Monarch", icon: "✨", minElo: 3200, maxElo: 3400, color: "#27ae60", badge: "lime" },
  { id: 16, name: "Reality Bender", icon: "🌈", minElo: 3400, maxElo: 3600, color: "#e91e63", badge: "pink" },
  { id: 17, name: "Transcendent Entity", icon: "🎆", minElo: 3600, maxElo: 3800, color: "#9c27b0", badge: "purple" },
  { id: 18, name: "Universe Architect", icon: "🏛️", minElo: 3800, maxElo: 4000, color: "#00bcd4", badge: "cyan" },
  { id: 19, name: "Eternal Infinity", icon: "♾️", minElo: 4000, maxElo: 5000, color: "#ff6f00", badge: "darkorange" },
];

export function getRankByElo(elo) {
  return RANKS.find(rank => elo >= rank.minElo && elo <= rank.maxElo) || RANKS[0];
}

export function getNextRankProgress(elo) {
  const currentRank = getRankByElo(elo);
  if (currentRank.id === RANKS.length - 1) return 100;
  
  const progress = ((elo - currentRank.minElo) / (currentRank.maxElo - currentRank.minElo)) * 100;
  return Math.min(Math.max(progress, 0), 100);
}
