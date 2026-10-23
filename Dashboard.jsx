import React, { useState, useEffect } from 'react';
import { getRankByElo, getNextRankProgress, getChessTitle, RANKS } from '../data/ranks';
import { getGlobalLeaderboard, recordGame } from '../data/userService';
import '../styles/dashboard.css';

export default function Dashboard({ user, onUserUpdate }) {
  const [userRank, setUserRank] = useState(null);
  const [rankProgress, setRankProgress] = useState(0);
  const [userPosition, setUserPosition] = useState(0);
  const [recentGames, setRecentGames] = useState([]);
  const [gameActive, setGameActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(600); // 10 minutes en secondes
  const [gameResult, setGameResult] = useState(null);
  const chessTitle = getChessTitle(user.elo);

  useEffect(() => {
    updateDashboard();
  }, [user]);

  // Timer pour les parties
  useEffect(() => {
    let interval;
    if (gameActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(t => t - 1);
      }, 1000);
    } else if (timeRemaining === 0 && gameActive) {
      finishGame('timeout');
    }
    return () => clearInterval(interval);
  }, [gameActive, timeRemaining]);

  const updateDashboard = () => {
    const rank = getRankByElo(user.elo);
    const progress = getNextRankProgress(user.elo);
    setUserRank(rank);
    setRankProgress(progress);

    const leaderboard = getGlobalLeaderboard();
    const position = leaderboard.findIndex(u => u.id === user.id) + 1;
    setUserPosition(position);
  };

  const startGame = () => {
    setGameActive(true);
    setTimeRemaining(600);
    setGameResult(null);
  };

  const finishGame = (result) => {
    setGameActive(false);
    let eloGain;
    let isWin = false;

    if (result === 'win') {
      isWin = true;
      eloGain = Math.floor(Math.random() * 20) + 15; // +15 à +35
    } else if (result === 'loss') {
      eloGain = -(Math.floor(Math.random() * 15) + 5); // -5 à -20
    } else {
      eloGain = Math.floor(Math.random() * 10) - 5; // -5 à +5 pour timeout
    }

    const updatedUser = recordGame(user.id, null, isWin, eloGain);
    onUserUpdate(updatedUser);

    setRecentGames([
      {
        id: Math.random(),
        result: result === 'win' ? 'Victoire' : result === 'loss' ? 'Défaite' : 'Timeout',
        eloGain,
        date: new Date().toLocaleTimeString('fr-FR'),
        time: timeRemaining,
      },
      ...recentGames.slice(0, 4),
    ]);

    updateDashboard();
    setGameResult(result);

    setTimeout(() => {
      setGameResult(null);
    }, 3000);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const nextRank = userRank && userRank.id < RANKS.length - 1 ? RANKS[userRank.id + 1] : null;
  const eloToNextRank = nextRank ? nextRank.minElo - user.elo : 0;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Tableau de Bord</h1>
        <p>Bienvenue, {userRank?.name}</p>
      </div>

      <div className="dashboard-grid">
        {/* Rang Actuel */}
        <div className="card rank-card">
          <div className="rank-display">
            <div className="rank-symbol">{userRank?.symbol}</div>
            <div className="rank-info">
              <h2>{userRank?.name}</h2>
              <p className="rank-elo">ELO: {user.elo}</p>
              {chessTitle && <p className="chess-title">{chessTitle.symbol} {chessTitle.title}</p>}
            </div>
          </div>

          <div className="rank-progress">
            <div className="progress-header">
              <span>Progression</span>
              <span>{Math.floor(rankProgress)}%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${rankProgress}%` }} />
            </div>
            {nextRank && (
              <p className="next-rank">
                {eloToNextRank} ELO avant {nextRank.name}
              </p>
            )}
          </div>
        </div>

        {/* Position Mondiale */}
        <div className="card position-card">
          <h3>Classement Mondial</h3>
          <div className="position-content">
            <div className="position-number">#{userPosition}</div>
            <p className="position-total">sur {getGlobalLeaderboard().length} joueurs</p>
            <div className="position-percentage">
              Top {((userPosition / getGlobalLeaderboard().length) * 100).toFixed(1)}%
            </div>
          </div>
        </div>

        {/* Statistiques */}
        <div className="card stats-card">
          <h3>Statistiques</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-label">Victoires</div>
              <div className="stat-value">{user.wins}</div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Défaites</div>
              <div className="stat-value">{user.losses}</div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Ratio</div>
              <div className="stat-value">
                {user.wins + user.losses > 0
                  ? ((user.wins / (user.wins + user.losses)) * 100).toFixed(1)
                  : 0}%
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Parties</div>
              <div className="stat-value">{user.wins + user.losses}</div>
            </div>
          </div>
        </div>

        {/* Partie en cours - Timer 10 min */}
        <div className="card game-card">
          <h3>Jouer une Partie</h3>
          {!gameActive ? (
            <>
              <p className="game-description">Durée: 10 minutes</p>
              <button className="btn btn-primary btn-play" onClick={startGame}>
                ▶ Commencer une Partie
              </button>
            </>
          ) : (
            <>
              <div className="timer-display">
                <div className={`timer ${timeRemaining < 60 ? 'danger' : ''}`}>
                  {formatTime(timeRemaining)}
                </div>
                <p className="timer-label">Temps Restant</p>
              </div>

              <div className="game-actions">
                <button
                  className="btn btn-success"
                  onClick={() => finishGame('win')}
                  disabled={!gameActive}
                >
                  ✓ Victoire
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => finishGame('loss')}
                  disabled={!gameActive}
                >
                  ✗ Défaite
                </button>
              </div>
            </>
          )}

          {gameResult && (
            <div className={`game-result ${gameResult}`}>
              {gameResult === 'win' && '🎉 Victoire!'}
              {gameResult === 'loss' && '😞 Défaite'}
              {gameResult === 'timeout' && '⏰ Temps Écoulé'}
            </div>
          )}
        </div>

        {/* Historique */}
        {recentGames.length > 0 && (
          <div className="card history-card">
            <h3>Dernières Parties</h3>
            <div className="games-list">
              {recentGames.map((game) => (
                <div key={game.id} className={`game-item ${game.result.toLowerCase()}`}>
                  <span className="game-result">{game.result}</span>
                  <span className={`game-elo ${game.eloGain > 0 ? 'gain' : 'loss'}`}>
                    {game.eloGain > 0 ? '+' : ''}{game.eloGain} ELO
                  </span>
                  <span className="game-time">{game.date}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
