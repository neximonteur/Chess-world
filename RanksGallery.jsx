import React from 'react';
import { RANKS, CHESS_TITLES } from '../data/ranks';
import '../styles/ranks.css';

export default function RanksGallery({ user }) {
  const tiers = {};
  
  RANKS.forEach(rank => {
    if (!tiers[rank.tier]) {
      tiers[rank.tier] = [];
    }
    tiers[rank.tier].push(rank);
  });

  const tierOrder = ['Bronze', 'Silver', 'Gold', 'Platinum', 'Elite', 'Master', 'Ascendant', 'Immortal', 'Radiant'];

  const getTierColor = (tier) => {
    const colors = {
      Bronze: '#CD7F32',
      Silver: '#E8E8E8',
      Gold: '#FFD700',
      Platinum: '#E5E4E2',
      Elite: '#00CED1',
      Master: '#9932CC',
      Ascendant: '#FF69B4',
      Immortal: '#FF0000',
      Radiant: '#FFD700',
    };
    return colors[tier] || '#00d4ff';
  };

  return (
    <div className="ranks-gallery">
      <div className="gallery-header">
        <h1>Les Rangs</h1>
        <p>25 rangs compétitifs de Bronze jusqu'à Radiant</p>
      </div>

      {/* Tiers */}
      <div className="tiers-container">
        {tierOrder.map(tierName => (
          <div key={tierName} className="tier-section">
            <div className="tier-title" style={{ color: getTierColor(tierName) }}>
              <span className="tier-name">{tierName}</span>
              <span className="tier-range">
                {tiers[tierName][0].minElo} - {tiers[tierName][tiers[tierName].length - 1].maxElo} ELO
              </span>
            </div>

            <div className="ranks-grid">
              {tiers[tierName].map(rank => (
                <div key={rank.id} className="rank-card-gallery">
                  <div className="rank-symbol-large">{rank.symbol}</div>
                  <div className="rank-name">{rank.name}</div>
                  <div className="rank-range-small">
                    {rank.minElo}-{rank.maxElo}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Titres d'Échecs */}
      <div className="chess-titles-section">
        <h2>Titres Professionnels d'Échecs</h2>
        <p className="chess-titles-desc">Déblocquez des titres d'échecs reconnus mondialement</p>

        <div className="titles-grid">
          {CHESS_TITLES.map((title, idx) => (
            <div key={idx} className="title-card">
              <div className="title-symbol">{title.symbol}</div>
              <div className="title-name">{title.title}</div>
              <div className="title-abbr">{title.abbr}</div>
              <div className="title-elo">À partir de {title.minElo} ELO</div>
            </div>
          ))}
        </div>
      </div>

      {/* Système de Progression */}
      <div className="progression-section">
        <h2>Système de Progression</h2>
        <div className="progression-info">
          <div className="info-card">
            <div className="info-icon">100</div>
            <h3>ELO par Rang</h3>
            <p>Chaque rang augmente votre ELO de 100 points</p>
          </div>
          <div className="info-card">
            <div className="info-icon">25</div>
            <h3>Total de Rangs</h3>
            <p>Progressez de Bronze I jusqu'à Radiant</p>
          </div>
          <div className="info-card">
            <div className="info-icon">3000</div>
            <h3>Maximum ELO</h3>
            <p>Atteignez le sommet avec Radiant</p>
          </div>
          <div className="info-card">
            <div className="info-icon">4</div>
            <h3>Titres Maîtres</h3>
            <p>CM, FM, IM, et Grandmaster</p>
          </div>
        </div>
      </div>

      {/* Légende des Tiers */}
      <div className="legend-section">
        <h2>Guide des Tiers</h2>
        <div className="legend-grid">
          <div className="legend-item">
            <div className="legend-symbol">🥉</div>
            <div className="legend-content">
              <h4>Bronze (0-300 ELO)</h4>
              <p>Les débutants commencent leur parcours aux échecs</p>
            </div>
          </div>

          <div className="legend-item">
            <div className="legend-symbol">⚪</div>
            <div className="legend-content">
              <h4>Silver (300-600 ELO)</h4>
              <p>Joueurs novices avec les bases maîtrisées</p>
            </div>
          </div>

          <div className="legend-item">
            <div className="legend-symbol">🥇</div>
            <div className="legend-content">
              <h4>Gold (600-900 ELO)</h4>
              <p>Joueurs intermédiaires avec une bonne compréhension</p>
            </div>
          </div>

          <div className="legend-item">
            <div className="legend-symbol">💎</div>
            <div className="legend-content">
              <h4>Platinum (900-1200 ELO)</h4>
              <p>Joueurs avancés avec une solide stratégie</p>
            </div>
          </div>

          <div className="legend-item">
            <div className="legend-symbol">⭐</div>
            <div className="legend-content">
              <h4>Elite (1200-1500 ELO)</h4>
              <p>Joueurs compétents et redoutables</p>
            </div>
          </div>

          <div className="legend-item">
            <div className="legend-symbol">👑</div>
            <div className="legend-content">
              <h4>Master (1500-1800 ELO)</h4>
              <p>Les vrais maîtres du jeu d'échecs</p>
            </div>
          </div>

          <div className="legend-item">
            <div className="legend-symbol">🚀</div>
            <div className="legend-content">
              <h4>Ascendant (1800-2100 ELO)</h4>
              <p>Joueurs d'élite en montée vers les sommets</p>
            </div>
          </div>

          <div className="legend-item">
            <div className="legend-symbol">🔥</div>
            <div className="legend-content">
              <h4>Immortal (2100-2400 ELO)</h4>
              <p>Légendes du jeu d'échecs</p>
            </div>
          </div>

          <div className="legend-item">
            <div className="legend-symbol">✨</div>
            <div className="legend-content">
              <h4>Radiant (2400-3000 ELO)</h4>
              <p>Les plus grands champions mondiaux</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
