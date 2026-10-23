import React, { useState, useEffect } from 'react';
import './styles/global.css';
import './styles/app.css';
import { getCurrentUser, logoutUser } from './data/userService';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Leaderboard from './components/Leaderboard';
import RanksGallery from './components/RanksGallery';
import Profile from './components/Profile';
import Friends from './components/Friends';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
    setLoading(false);
  }, []);

  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
    setCurrentPage('login');
  };

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setCurrentPage('dashboard');
  };

  const handleUserUpdate = (updatedUser) => {
    setCurrentUser(updatedUser);
  };

  if (loading) {
    return <div className="loading-screen">Chargement...</div>;
  }

  if (!currentUser) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="app">
      <nav className="navbar">
        <div className="navbar-brand">
          <h1>♟ CHESS ARENA</h1>
        </div>
        <div className="navbar-menu">
          <button 
            className={`nav-link ${currentPage === 'dashboard' ? 'active' : ''}`}
            onClick={() => setCurrentPage('dashboard')}
          >
            Dashboard
          </button>
          <button 
            className={`nav-link ${currentPage === 'leaderboard' ? 'active' : ''}`}
            onClick={() => setCurrentPage('leaderboard')}
          >
            Classement
          </button>
          <button 
            className={`nav-link ${currentPage === 'ranks' ? 'active' : ''}`}
            onClick={() => setCurrentPage('ranks')}
          >
            Rangs
          </button>
          <button 
            className={`nav-link ${currentPage === 'friends' ? 'active' : ''}`}
            onClick={() => setCurrentPage('friends')}
          >
            Amis
          </button>
          <button 
            className={`nav-link ${currentPage === 'profile' ? 'active' : ''}`}
            onClick={() => setCurrentPage('profile')}
          >
            Profil
          </button>
        </div>
        <div className="navbar-user">
          <span className="user-avatar">{currentUser.avatar}</span>
          <span className="user-name">{currentUser.username}</span>
          <button className="btn btn-secondary btn-small" onClick={handleLogout}>
            Déconnexion
          </button>
        </div>
      </nav>

      <div className="main-content">
        {currentPage === 'dashboard' && (
          <Dashboard user={currentUser} onUserUpdate={handleUserUpdate} />
        )}
        {currentPage === 'leaderboard' && (
          <Leaderboard user={currentUser} />
        )}
        {currentPage === 'ranks' && (
          <RanksGallery user={currentUser} />
        )}
        {currentPage === 'friends' && (
          <Friends user={currentUser} onUserUpdate={handleUserUpdate} />
        )}
        {currentPage === 'profile' && (
          <Profile user={currentUser} onUserUpdate={handleUserUpdate} />
        )}
      </div>

      <footer className="footer">
        <p>♟ CHESS ARENA - Competitive Chess Platform</p>
        <p>Master Your Skills. Climb the Ranks. Become a Legend.</p>
      </footer>
    </div>
  );
}
