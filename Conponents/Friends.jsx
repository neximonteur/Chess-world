import React, { useState, useEffect } from 'react';
import { getUserFriends, addFriendByCode, getInviteLinkData } from '../data/userService';
import '../styles/friends.css';

export default function Friends({ user, onUserUpdate }) {
  const [friends, setFriends] = useState([]);
  const [inviteCode, setInviteCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [inviteLinkData, setInviteLinkData] = useState(null);
  const [showInviteModal, setShowInviteModal] = useState(false);

  useEffect(() => {
    loadFriends();
    loadInviteLink();
  }, [user]);

  const loadFriends = () => {
    const friendsList = getUserFriends(user.id);
    setFriends(friendsList);
  };

  const loadInviteLink = () => {
    try {
      const data = getInviteLinkData(user.id);
      setInviteLinkData(data);
    } catch (err) {
      console.error('Erreur lors du chargement du lien d\'invitation:', err);
    }
  };

  const handleAddFriend = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!inviteCode.trim()) {
      setError('Veuillez entrer un code d\'invitation');
      return;
    }

    try {
      const newFriend = addFriendByCode(user.id, inviteCode.toUpperCase());
      setSuccess(`${newFriend.username} a été ajouté à vos amis!`);
      setInviteCode('');
      loadFriends();
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setSuccess('Copié dans le presse-papier!');
    setTimeout(() => setSuccess(''), 2000);
  };

  return (
    <div className="friends">
      <div className="friends-header">
        <h1>👥 Mes Amis</h1>
        <p>Connectez-vous avec d'autres joueurs d'échecs</p>
      </div>

      <div className="friends-grid">
        {/* Section Invitation */}
        <div className="card invite-card">
          <h2>📨 Inviter des Amis</h2>
          <p className="invite-description">Partagez votre code d'invitation pour permettre à vos amis de vous rejoindre!</p>

          {inviteLinkData && (
            <div className="invite-display">
              <div className="invite-code-box">
                <p className="code-label">Votre code d'invitation:</p>
                <div className="code-display">
                  <span className="code">{inviteLinkData.inviteCode}</span>
                  <button
                    className="btn btn-secondary btn-small"
                    onClick={() => copyToClipboard(inviteLinkData.inviteCode)}
                  >
                    📋 Copier
                  </button>
                </div>
              </div>

              <div className="invite-link-box">
                <p className="link-label">Lien d'invitation complet:</p>
                <div className="link-display">
                  <input
                    type="text"
                    value={inviteLinkData.inviteLink}
                    readOnly
                    className="link-input"
                  />
                  <button
                    className="btn btn-secondary btn-small"
                    onClick={() => copyToClipboard(inviteLinkData.inviteLink)}
                  >
                    🔗 Copier
                  </button>
                </div>
              </div>

              <p className="invite-tip">
                💡 Partage ce lien ou ce code avec tes amis pour les inviter sur Chess World!
              </p>
            </div>
          )}
        </div>

        {/* Section Ajouter un Ami */}
        <div className="card add-friend-card">
          <h2>➕ Ajouter un Ami</h2>
          
          {error && <div className="error">{error}</div>}
          {success && <div className="success">{success}</div>}

          <form onSubmit={handleAddFriend} className="add-friend-form">
            <input
              type="text"
              placeholder="Code d'invitation (ex: ABC123)"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
              className="invite-input"
              maxLength="6"
            />
            <button type="submit" className="btn btn-primary">
              ✅ Ajouter
            </button>
          </form>

          <p className="add-friend-tip">
            Demande à ton ami de partager son code d'invitation et entre-le ici!
          </p>
        </div>

        {/* Liste des Amis */}
        <div className="card friends-list-card">
          <h2>🎯 Mes Amis ({friends.length})</h2>

          {friends.length === 0 ? (
            <div className="empty-friends">
              <p>Vous n'avez pas encore d'amis</p>
              <p className="empty-tip">Invitez vos amis pour commencer à jouer ensemble!</p>
            </div>
          ) : (
            <div className="friends-list">
              {friends.map((friend) => (
                <div key={friend.id} className="friend-item">
                  <div className="friend-avatar">{friend.avatar}</div>
                  <div className="friend-info">
                    <div className="friend-name">{friend.username}</div>
                    <div className="friend-elo">ELO: {friend.elo}</div>
                  </div>
                  <div className="friend-actions">
                    <span className="friend-status">Actif</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
