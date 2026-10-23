import React, { useState } from 'react';
import { getUserFriends, addFriendByCode, getInviteLinkData } from '../data/userService';
import '../styles/friends.css';

export default function Friends({ user, onUserUpdate }) {
  const [friends, setFriends] = useState(getUserFriends(user.id));
  const [inviteCode, setInviteCode] = useState('');
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const handleAddFriend = (e) => {
    e.preventDefault();
    setMessage('');
    try {
      addFriendByCode(user.id, inviteCode.toUpperCase());
      setFriends(getUserFriends(user.id));
      setInviteCode('');
      setMessage('✓ Ami ajouté avec succès!');
      setTimeout(() => setMessage(''), 2000);
    } catch (err) {
      setMessage(err.message);
    }
  };

  const handleCopyCode = () => {
    const { inviteCode: code } = getInviteLinkData(user.id);
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const { inviteCode: userInviteCode } = getInviteLinkData(user.id);

  return (
    <div className="friends">
      <div className="friends-header">
        <h1>Amis</h1>
        <p>Gérez vos amis et partagez votre code</p>
      </div>

      <div className="friends-grid">
        <div className="card invite-card">
          <h3>Mon Code d'Invitation</h3>
          <div className="invite-code-box">
            <div className="code">{userInviteCode}</div>
            <button className="btn btn-primary btn-small" onClick={handleCopyCode}>
              {copied ? '✓ Copié!' : 'Copier'}
            </button>
          </div>
          <p className="invite-hint">Partage ce code pour que d'autres joueurs t'ajoutent!</p>
        </div>

        <div className="card add-friend-card">
          <h3>Ajouter un Ami</h3>
          <form onSubmit={handleAddFriend}>
            <input
              type="text"
              placeholder="Code d'invitation (6 caractères)"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
              maxLength="6"
            />
            <button type="submit" className="btn btn-primary">Ajouter</button>
          </form>
          {message && (
            <div className={message.includes('✓') ? 'success' : 'error'}>
              {message}
            </div>
          )}
        </div>
      </div>

      <div className="friends-list-section">
        <h2>Mes Amis ({friends.length})</h2>
        {friends.length === 0 ? (
          <div className="card no-friends">
            <p>Aucun ami pour l'instant. Ajoute-en un avec son code!</p>
          </div>
        ) : (
          <div className="friends-list">
            {friends.map((friend) => (
              <div key={friend.id} className="card friend-card">
                <div className="friend-avatar">{friend.avatar}</div>
                <div className="friend-info">
                  <h4>{friend.username}</h4>
                  <p className="friend-elo">ELO: {friend.elo}</p>
                  <p className="friend-record">{friend.wins}W - {friend.losses}L</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
