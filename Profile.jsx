import React, { useState } from 'react';
import { getRankByElo, RANKS } from '../data/ranks';
import { updateUserProfile } from '../data/userService';
import '../styles/profile.css';

const AVATARS = ["♔", "♕", "♖", "♗", "♘", "♙", "♚", "♛", "♜", "♝", "♞", "♟"];

export default function Profile({ user, onUserUpdate }) {
  const [editMode, setEditMode] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(user.avatar);
  const [success, setSuccess] = useState('');

  const currentRank = getRankByElo(user.elo);
  const nextRankIndex = currentRank.id + 1;
  const nextRank = nextRankIndex < RANKS.length ? RANKS[nextRankIndex] : null;

  const handleSaveProfile = () => {
    const updatedUser = updateUserProfile(user.id, { avatar: selectedAvatar });
    onUserUpdate(updatedUser);
    setSuccess('✓ Profil mis à jour');
    setEditMode(false);
    setTimeout(() => setSuccess(''), 2000);
  };

  return (
    <div className="profile">
      <div className="profile-header">
        <h1>Profil</h1>
        <p>{user.username}</p>
      </div>

      <div className="profile-grid">
        <div className="card profile-main">
          <div className="profile-avatar-large">{user.avatar}</div>
          <h2>{user.username}</h2>
          <p className="profile-email">{user.email}</p>
          <p className="profile-joined">Inscrit depuis {new Date(user.joinDate).toLocaleDateString()}</p>
          
          {!editMode ? (
            <button className="btn btn-primary" onClick={() => setEditMode(true)} style={{marginTop: '20px'}}>
              Changer Avatar
            </button>
          ) : (
            <>
              <div className="avatar-selector">
                <div className="avatar-grid">
                  {AVATARS.map((avatar) => (
                    <button
                      key={avatar}
                      className={`avatar-btn ${selectedAvatar === avatar ? 'selected' : ''}`}
                      onClick={() => setSelectedAvatar(avatar)}
                    >
                      {avatar}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{display: 'flex', gap: '10px', marginTop: '15px'}}>
                <button className="btn btn-primary" onClick={handleSaveProfile} style={{flex: 1}}>
                  Sauvegarder
                </button>
                <button className="btn btn-secondary" onClick={() => setEditMode(false)} style={{flex: 1}}>
                  Annuler
                </button>
              </div>
            </>
          )}

          {success && <div className="success" style={{marginTop: '15px'}}>{success}</div>}
        </div>

        <div className="card rank-info">
          <h3>Rang Actuel</h3>
          <div className="rank-box">
            <div className="rank-symbol-profile">{currentRank.symbol}</div>
            <div>
              <p className="rank-name-profile">{currentRank.name}</p>
              <p className="rank-elo-profile">ELO: {user.elo}</p>
            </div>
          </div>

          {nextRank && (
            <>
              <h3 style={{marginTop: '20px'}}>Prochain Rang</h3>
              <div className="next-rank-box">
                <p className="next-text">{nextRank.name}</p>
                <p className="elo-needed">{Math.max(0, nextRank.minElo - user.elo)} ELO requis</p>
              </div>
            </>
          )}
        </div>

        <div className="card stats-profile">
          <h3>Statistiques</h3>
          <div className="stats-row">
            <span>Victoires</span>
            <span className="stat-value">{user.wins}</span>
          </div>
          <div className="stats-row">
            <span>Défaites</span>
            <span className="stat-value">{user.losses}</span>
          </div>
          <div className="stats-row">
            <span>Ratio</span>
            <span className="stat-value">{user.wins + user.losses > 0 ? ((user.wins / (user.wins + user.losses)) * 100).toFixed(1) : 0}%</span>
          </div>
          <div className="stats-row">
            <span>Parties</span>
            <span className="stat-value">{user.wins + user.losses}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
