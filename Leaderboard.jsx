import React, { useState, useEffect } from 'react';
import { getGlobalLeaderboard, getUserById } from '../data/userService';
import { getRankByElo } from '../data/ranks';
import '../styles/leaderboard.css';

export default function Leaderboard({ user }) {
  const [leaderboard, setLeaderboard] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [userPositions, setUserPositions] = useState({});

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = () => {
    const lb = getGlobalLeaderboard(200);
    setLeaderboard(lb);

    // Créer un map de positions
    const positions = {};
    lb.forEach((u, index) => {
      positions[u.id] = index + 1;
    });
    setUserPositions(positions);
  };

  const getFilteredLeaderboard = () => {
    let filtered = leaderboard;

    if (searchTerm) {
      filtered = filtered.filter(u =>
        u.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filter !== 'all') {
      filtered = filtered.filter(u => {
        const rank = getRankByElo(u.elo);
        return rank.name === filter;
      });
    }

    return filtered;
  };

  const getUniqueRanks = () => {
    const ranks = new Set(leaderboard.map(u => getRankByElo(u.elo).name));
    return Array.from(ranks).sort();
  };

  const filteredLeaderboard = getFilteredLeaderboard();
  const currentUserRank = getRankByElo(user.elo);

  return (
    <div className="leaderboard">
      <div className="leaderboard-header">
        <h1>🏆 Classement Mondial</h1>
        <p>Les meilleurs joueurs d'échecs de la plateforme</p>
      </div>

      <div className="leaderboard-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Rechercher un joueur..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-box">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">Tous les rangs</option>
            {getUniqueRanks().map((rank) => (
              <option key={rank} value={rank}>
                {rank}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="leaderboard-info">
        <p>Affichage: {filteredLeaderboard.length} joueurs</p>
        <p>Votre position: <strong>#{userPositions[user.id]}</strong></p>
      </div>

      <div className="leaderboard-container">
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th className="rank-col">Rang</th>
              <th className="player-col">Joueur</th>
              <th className="level-col">Niveau</th>
              <th className="elo-col">ELO</th>
              <th className="stats-col">Victoires</th>
              <th className="stats-col">Défaites</th>
              <th className="ratio-col">Ratio</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeaderboard.map((player, index) => {
              const rank = getRankByElo(player.elo);
              const ratio = player.wins + player.losses > 0
                ? ((player.wins / (player.wins + player.losses)) * 100).toFixed(1)
                : '0.0';
              const isCurrentUser = player.id === user.id;

              return (
                <tr
                  key={player.id}
                  className={`leaderboard-row ${isCurrentUser ? 'current-user' : ''} ${
                    index === 0 ? 'top-1' : index === 1 ? 'top-2' : index === 2 ? 'top-3' : ''
                  }`}
                >
                  <td className="rank-col">
                    <div className="rank-badge">
                      {index === 0 && '🥇'}
                      {index === 1 && '🥈'}
                      {index === 2 && '🥉'}
                      {index > 2 && `#${userPositions[player.id]}`}
                    </div>
                  </td>
                  <td className="player-col">
                    <div className="player-info">
                      <span className="player-avatar">{player.avatar}</span>
                      <div>
                        <div className="player-name">
                          {player.username}
                          {isCurrentUser && <span className="current-badge">MOI</span>}
                        </div>
                        <div className="player-join-date">
                          Depuis {new Date(player.joinDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="level-col">
                    <div className="rank-badge-full">
                      <span className="rank-icon">{rank.icon}</span>
                      <span className="rank-name">{rank.name}</span>
                    </div>
                  </td>
                  <td className="elo-col">
                    <span className="elo-value">{player.elo}</span>
                  </td>
                  <td className="stats-col">
                    <span className="wins-value">{player.wins}</span>
                  </td>
                  <td className="stats-col">
                    <span className="losses-value">{player.losses}</span>
                  </td>
                  <td className="ratio-col">
                    <span className="ratio-value">{ratio}%</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {filteredLeaderboard.length === 0 && (
        <div className="empty-state">
          <p>Aucun joueur ne correspond à votre recherche</p>
        </div>
      )}
    </div>
  );
}
