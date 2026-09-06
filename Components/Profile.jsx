import React, { useState } from 'react';
import { getRankByElo, RANKS } from '../data/ranks';
import { updateUserProfile } from '../data/userService';
import '../styles/profile.css';

const AVATARS = ["👑", "🦅", "🐉", "⚡", "🎯", "🌟", "🎨", "♀️", "🇫🇷", "🇷🇺", "🎭", "🎪", "🎸", "🎬", "🎲", "🏆"];

export default function Profile({ user, onUserUpdate }) {
  const [editMode, setEditMode] = useState(false);
  const [displayName, setDisplayName] = useState(user.username);
  const [selectedAvatar, setSelectedAvatar] = useState(user.avatar);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const currentRank = getRankByElo(user.elo);
  const nextRankIndex = currentRank.id + 1;
  const nextRank = nextRankIndex < RANKS.length ? RANKS[nextRankIndex] : null;

  const handleSaveProfile = () => {
    setError('');
    setSuccess('');

    if (!displayName.trim()) {
      setError('Le nom d\'affichage ne peut pas être vide');
      return;
    }

    try {
      const updatedUser = updateUserProfile(user.id, {
        avatar: selectedAvatar,
      });
      onUserUpdate(updatedUser);
      setSuccess('Profil mis à jour avec succès!');
      setEditMode(false);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="profile">
      <div className="profile-header">
        <h1>👤 Mon Profil</h1>
        <p>Gérez votre profil et vos paramètres</p>
      </div>

      <div className="profile-grid">
        {/* Profil Principal */}
        <div className="card profile-card">
          <div className="profile-top">
            {!editMode ? (
              <div className="profile-view">
                <div className="profile-avatar-large">{user.avatar}</div>
                <div className="profile-info-main">
                  <h2>{user.username}</h2>
                  <p className="profile-email">{user.email}</p>
                  <div className="profile-dates">
                    <span>Inscrit depuis: {new Date(user.joinDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="profile-edit">
                <div className="avatar-selector">
                  <p>Choisir un avatar:</p>
                  <div className="avatar-grid">
                    {AVATARS.map((avatar) => (
                      <button
                        key={avatar}
                        className={`avatar-option ${selectedAvatar === avatar ? 'selected' : ''}`}
                        onClick={() => setSelectedAvatar(avatar)}
                      >
                        {avatar}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="profile-actions">
            {!editMode ? (
              <button
                className="btn btn-primary"
                onClick={() => setEditMode(true)}
              >
                ✏️ Modifier le Profil
              </button>
            ) : (
              <div className="edit-buttons">
                <button
                  className="btn btn-primary"
                  onClick={handleSaveProfile}
                >
                  💾 Sauvegarder
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setEditMode(false);
                    setSelectedAvatar(user.avatar);
                    setError('');
                  }}
                >
                  ❌ Annuler
                </button>
              </div>
            )}
          </div>

          {error && <div className="error">{error}</div>}
          {success && <div className="success">{success}</div>}
        </div>

        {/* Rang et Progression */}
        <div className="card rank-card">
          <h2>🎖️ Rang Actuel</h2>
          <div className="rank-display-profile">
            <div className="rank-icon-large">{currentRank.icon}</div>
            <div className="rank-details">
              <h3>{currentRank.name}</h3>
              <p className="rank-elo">ELO: {user.elo}</p>
              <div className="rank-range">
                {currentRank.minElo} - {currentRank.maxElo}
              </div>
            </div>
          </div>

          {nextRank && (
            <div className="next-rank-preview">
              <h3>Prochain Rang</h3>
              <div className="next-rank-info">
                <span className="next-rank-icon">{nextRank.icon}</span>
                <span className="next-rank-name">{nextRank.name}</span>
              </div>
              <p className="elo-needed">
                {Math.max(0, nextRank.minElo - user.elo)} ELO requis
              </p>
            </div>
          )}
        </div>

        {/* Statistiques */}
        <div className="card stats-card">
          <h2>📊 Statistiques Globales</h2>
          <div className="stats-detail">
            <div className="stat-detail-item">
              <span className="stat-label">Victoires</span>
              <span className="stat-value">{user.wins}</span>
            </div>
            <div className="stat-detail-item">
              <span className="stat-label">Défaites</span>
              <span className="stat-value">{user.losses}</span>
            </div>
            <div className="stat-detail-item">
              <span className="stat-label">Ratio V/D</span>
              <span className="stat-value">
                {user.wins + user.losses > 0
                  ? (user.wins / (user.wins + user.losses) * 100).toFixed(1)
                  : 0}%
              </span>
            </div>
            <div className="stat-detail-item">
              <span className="stat-label">Parties Jouées</span>
              <span className="stat-value">{user.wins + user.losses}</span>
            </div>
          </div>
        </div>

        {/* Rangs Disponibles */}
        <div className="card ranks-list-card">
          <h2>🏆 Tous les Rangs Disponibles</h2>
          <div className="ranks-list">
            {RANKS.map((rank) => {
              const isCurrentRank = rank.id === currentRank.id;
              return (
                <div
                  key={rank.id}
                  className={`rank-item ${isCurrentRank ? 'current' : ''}`}
                >
                  <span className="rank-number">#{rank.id + 1}</span>
                  <span className="rank-icon">{rank.icon}</span>
                  <span className="rank-name">{rank.name}</span>
                  <span className="rank-elo-range">{rank.minElo}-{rank.maxElo}</span>
                  {isCurrentRank && <span className="current-badge">Actuellement</span>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Conseils */}
        <div className="card tips-card">
          <h2>💡 Conseils pour Progresser</h2>
          <ul className="tips-list">
            <li>Jouez régulièrement pour maintenir votre niveau</li>
            <li>Analysez vos parties pour identifier vos erreurs</li>
            <li>Étudiez les ouvertures classiques</li>
            <li>Participez à des tournois pour tester vos compétences</li>
            <li>Connectez-vous avec d'autres joueurs de votre niveau</li>
            <li>Pratiquez le calcul tactique quotidiennement</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
