// Système de rangs: 100 ELO par rang jusqu'à 3000
export const RANKS = [
  // Bronze (0-300)
  { id: 0, name: "Bronze III", minElo: 0, maxElo: 100, tier: "Bronze", symbol: "🥉" },
  { id: 1, name: "Bronze II", minElo: 100, maxElo: 200, tier: "Bronze", symbol: "🥉" },
  { id: 2, name: "Bronze I", minElo: 200, maxElo: 300, tier: "Bronze", symbol: "🥉" },
  
  // Silver (300-600)
  { id: 3, name: "Silver III", minElo: 300, maxElo: 400, tier: "Silver", symbol: "⚪" },
  { id: 4, name: "Silver II", minElo: 400, maxElo: 500, tier: "Silver", symbol: "⚪" },
  { id: 5, name: "Silver I", minElo: 500, maxElo: 600, tier: "Silver", symbol: "⚪" },
  
  // Gold (600-900)
  { id: 6, name: "Gold III", minElo: 600, maxElo: 700, tier: "Gold", symbol: "🥇" },
  { id: 7, name: "Gold II", minElo: 700, maxElo: 800, tier: "Gold", symbol: "🥇" },
  { id: 8, name: "Gold I", minElo: 800, maxElo: 900, tier: "Gold", symbol: "🥇" },
  
  // Platinum (900-1200)
  { id: 9, name: "Platinum III", minElo: 900, maxElo: 1000, tier: "Platinum", symbol: "💎" },
  { id: 10, name: "Platinum II", minElo: 1000, maxElo: 1100, tier: "Platinum", symbol: "💎" },
  { id: 11, name: "Platinum I", minElo: 1100, maxElo: 1200, tier: "Platinum", symbol: "💎" },
  
  // Elite (1200-1500)
  { id: 12, name: "Elite III", minElo: 1200, maxElo: 1300, tier: "Elite", symbol: "⭐" },
  { id: 13, name: "Elite II", minElo: 1300, maxElo: 1400, tier: "Elite", symbol: "⭐" },
  { id: 14, name: "Elite I", minElo: 1400, maxElo: 1500, tier: "Elite", symbol: "⭐" },
  
  // Master (1500-1800)
  { id: 15, name: "Master III", minElo: 1500, maxElo: 1600, tier: "Master", symbol: "👑" },
  { id: 16, name: "Master II", minElo: 1600, maxElo: 1700, tier: "Master", symbol: "👑" },
  { id: 17, name: "Master I", minElo: 1700, maxElo: 1800, tier: "Master", symbol: "👑" },
  
  // Ascendant (1800-2100)
  { id: 18, name: "Ascendant III", minElo: 1800, maxElo: 1900, tier: "Ascendant", symbol: "🚀" },
  { id: 19, name: "Ascendant II", minElo: 1900, maxElo: 2000, tier: "Ascendant", symbol: "🚀" },
  { id: 20, name: "Ascendant I", minElo: 2000, maxElo: 2100, tier: "Ascendant", symbol: "🚀" },
  
  // Immortal (2100-2400)
  { id: 21, name: "Immortal III", minElo: 2100, maxElo: 2200, tier: "Immortal", symbol: "🔥" },
  { id: 22, name: "Immortal II", minElo: 2200, maxElo: 2300, tier: "Immortal", symbol: "🔥" },
  { id: 23, name: "Immortal I", minElo: 2300, maxElo: 2400, tier: "Immortal", symbol: "🔥" },
  
  // Radiant (2400-3000)
  { id: 24, name: "Radiant", minElo: 2400, maxElo: 3000, tier: "Radiant", symbol: "✨" },
];

// Titres d'échecs professionels
export const CHESS_TITLES = [
  { minElo: 2000, maxElo: 2200, title: "Candidate Master", abbr: "CM", symbol: "🎓" },
  { minElo: 2200, maxElo: 2300, title: "FIDE Master", abbr: "FM", symbol: "📜" },
  { minElo: 2300, maxElo: 2500, title: "International Master", abbr: "IM", symbol: "🏅" },
  { minElo: 2500, maxElo: 3000, title: "Grandmaster", abbr: "GM", symbol: "♛" },
];

export function getRankByElo(elo) {
  return RANKS.find(rank => elo >= rank.minElo && elo <= rank.maxElo) || RANKS[0];
}

export function getChessTitle(elo) {
  const titles = CHESS_TITLES.filter(t => elo >= t.minElo && elo <= t.maxElo);
  return titles.length > 0 ? titles[titles.length - 1] : null;
}

export function getNextRankProgress(elo) {
  const currentRank = getRankByElo(elo);
  if (currentRank.id === RANKS.length - 1) return 100;
  
  const progress = ((elo - currentRank.minElo) / (currentRank.maxElo - currentRank.minElo)) * 100;
  return Math.min(Math.max(progress, 0), 100);
}

// Couleurs pour chaque tier
export const TIER_COLORS = {
  Bronze: { light: "#CD7F32", dark: "#8B4513", accent: "#A0522D" },
  Silver: { light: "#E8E8E8", dark: "#888888", accent: "#D3D3D3" },
  Gold: { light: "#FFD700", dark: "#DAA520", accent: "#FFA500" },
  Platinum: { light: "#E5E4E2", dark: "#949494", accent: "#F5F5F5" },
  Elite: { light: "#00CED1", dark: "#20B2AA", accent: "#40E0D0" },
  Master: { light: "#9932CC", dark: "#663399", accent: "#BA55D3" },
  Ascendant: { light: "#FF69B4", dark: "#FF1493", accent: "#FFB6C1" },
  Immortal: { light: "#FF0000", dark: "#8B0000", accent: "#DC143C" },
  Radiant: { light: "#FFD700", dark: "#FFA500", accent: "#FFB84D" },
};
