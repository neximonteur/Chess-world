import React, { useState, useEffect } from 'react';
import { getGlobalLeaderboard, getUserById } from '../data/userService';
import { getRankByElo } from '../data/ranks';
import '../styles/leaderboard.css';

export default function Leaderboard({ user }) {
  const [leaderboard, setLeaderboard] = useState([]);
  const [filter, setFilter] = useState('all');
  const [userPositions, setUserPositions] = useState({});

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = () => {
    const lb = getGlobalLeaderboard(200);
    setLeaderboard(lb);
    const positions = {};
    lb.forEach((u, index) => {
      positions[u.id] = index + 1;
    });
    setUserPositions(positions);
  };

  const tiers = [...new Set(leaderboard.map(u => getRankByElo(u.elo).tier))].sort();

  return (
    <div className="leaderboard">
      <div className="leaderboard-header">
        <h1>Classement Mondial</h1>
        <p>Les meilleurs joueurs de Chess Arena</p>
      </div>

      <div className="leaderboard-filters">
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="filter-select">
          <option value="all">Tous les Rangs</option>
          {tiers.map((tier) => (
            <option key={tier} value={tier}>{tier}</option>
          ))}
        </select>
      </div>

      <div className="leaderboard-info">
        <p>Position: <strong>#{userPositions[user.id]}</strong> / {leaderboard.length}</p>
      </div>

      <div className="leaderboard-table-container">
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Joueur</th>
              <th>Rang</th>
              <th>ELO</th>
              <th>V-D</th>
              <th>Ratio</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((player, index) => {
              const rank = getRankByElo(player.elo);
              const ratio = player.wins + player.losses > 0 ? ((player.wins / (player.wins + player.losses)) * 100).toFixed(0) : 0;
              const isCurrentUser = player.id === user.id;

              if (filter !== 'all' && rank.tier !== filter) return null;

              return (
                <tr key={player.id} className={isCurrentUser ? 'current-user' : index < 3 ? 'top-' + (index + 1) : ''}>
                  <td className="rank-column">{index === 0 && '🥇'} {index === 1 && '🥈'} {index === 2 && '🥉'} {index > 2 && `#${userPositions[player.id]}`}</td>
                  <td className="player-column">
                    <div className="player-info">
                      <span className="player-avatar">{player.avatar}</span>
                      <div>
                        <div className="player-name">{player.username} {isCurrentUser && <span className="badge">MOI</span>}</div>
                      </div>
                    </div>
                  </td>
                  <td><span style={{color: rank.symbol === '✨' ? 'gold' : 'inherit'}}>{rank.symbol} {rank.name}</span></td>
                  <td><strong>{player.elo}</strong></td>
                  <td>{player.wins}-{player.losses}</td>
                  <td><span className="ratio">{ratio}%</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
