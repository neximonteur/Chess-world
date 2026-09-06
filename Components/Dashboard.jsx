import React, { useState, useEffect } from 'react';
import { getRankByElo, getNextRankProgress, RANKS } from '../data/ranks';
import { getGlobalLeaderboard, recordGame, getUserById } from '../data/userService';
import '../styles/dashboard.css';

export default function Dashboard({ user, onUserUpdate }) {
  const [userRank, setUserRank] = useState(null);
  const [rankProgress, setRankProgress] = useState(0);
  const [userPosition, setUserPosition] = useState(0);
  const [recentGames, setRecentGames] = useState([]);
  const [simulatingGame, setSimulatingGame] = useState(false);

  useEffect(() => {
    updateDashboard();
  }, [user]);

  const updateDashboard = () => {
    const rank = getRankByElo(user.elo);
    const progress = getNextRankProgress(user.elo);
    setUserRank(rank);
    setRankProgress(progress);

    const leaderboard = getGlobalLeaderboard();
    const position = leaderboard.findIndex(u => u.id === user.id) + 1;
    setUserPosition(position);
  };

  const playGame = async (result) => {
    setSimulatingGame(true);
    
    // Simuler une partie avec gain/perte d'Elo aléatoire
    const eloGain = result === 'win' ? Math.floor(Math.random() * 20) + 10 : -Math.floor(Math.random() * 15) - 5;
    
    setTimeout(() => {
      const updatedUser = recordGame(user.id, null, result === 'win', eloGain);
      onUserUpdate(updatedUser);
      
      setRecentGames([
        { id: Math.random(), result, eloGain, date: new Date().toLocaleString() },
        ...recentGames.slice(0, 4)
      ]);
      
      updateDashboard();
      setSimulatingGame(false);
    }, 1000);
  };

  const nextRank = RANKS[userRank?.id + 1] || userRank;
  const eloToNextRank = nextRank.minElo - user.elo;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Bienvenue, {user.avatar} {user.username}!</h1>
        <p>Ton classement mondial et tes statistiques</p>
      </div>

      <div className="dashboard-grid">
        {/* Card Rang */}
        <div className="card rank-card">
          <div className="rank-display">
            <div className="rank-icon">{userRank?.icon}</div>
            <div className="rank-info">
              <h2>{userRank?.name}</h2>
              <p className="rank-elo">ELO: {user.elo}</p>
            </div>
          </div>

          <div className="rank-progress">
            <p>Progression vers: {nextRank.name} {nextRank.icon}</p>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${rankProgress}%` }}>
                <span>{Math.floor(rankProgress)}%</span>
              </div>
            </div>
            <p className="progress-text">
              {eloToNextRank} points ELO restants
            </p>
          </div>
        </div>

        {/* Card Position Mondiale */}
        <div className="card position-card">
          <div className="position-content">
            <h3>Position Mondiale</h3>
            <div className="position-number">#{userPosition}</div>
            <p>sur {getGlobalLeaderboard().length} joueurs</p>
            <div className="position-percentage">
              {((userPosition / getGlobalLeaderboard().length) * 100).toFixed(1)}% des meilleurs
            </div>
          </div>
        </div>

        {/* Card Statistiques */}
        <div className="card stats-card">
          <h3>Statistiques</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-value">{user.wins}</div>
              <div className="stat-label">Victoires</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{user.losses}</div>
              <div className="stat-label">Défaites</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">
                {user.wins + user.losses > 0 
                  ? ((user.wins / (user.wins + user.losses)) * 100).toFixed(1) 
                  : 0}%
              </div>
              <div className="stat-label">Taux Victoire</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{user.wins + user.losses}</div>
              <div className="stat-label">Parties Jouées</div>
            </div>
          </div>
        </div>

        {/* Card Simulation de Partie */}
        <div className="card game-card">
          <h3>Jouer une Partie</h3>
          <p className="game-description">Simule le résultat d'une partie pour tester le système d'Elo</p>
          <div className="game-buttons">
            <button 
              className="btn btn-primary" 
              onClick={() => playGame('win')}
              disabled={simulatingGame}
            >
              ⚔️ Victoire
            </button>
            <button 
              className="btn btn-secondary" 
              onClick={() => playGame('loss')}
              disabled={simulatingGame}
            >
              💔 Défaite
            </button>
          </div>
        </div>

        {/* Historique des Parties */}
        {recentGames.length > 0 && (
          <div className="card history-card">
            <h3>Dernières Parties</h3>
            <div className="games-list">
              {recentGames.map((game) => (
                <div key={game.id} className={`game-item ${game.result}`}>
                  <span className="game-result">
                    {game.result === 'win' ? '✅ Victoire' : '❌ Défaite'}
                  </span>
                  <span className={`game-elo ${game.eloGain > 0 ? 'gain' : 'loss'}`}>
                    {game.eloGain > 0 ? '+' : ''}{game.eloGain}
                  </span>
                  <span className="game-date">{game.date}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
