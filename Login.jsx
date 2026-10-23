import React, { useState } from 'react';
import { loginUser, createUser } from '../data/userService';
import '../styles/login.css';

export default function Login({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    try {
      const user = loginUser(username, password);
      onLoginSuccess(user);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }
    if (password.length < 6) {
      setError('Min 6 caractères');
      return;
    }
    try {
      const user = createUser(username, email, password);
      loginUser(username, password);
      onLoginSuccess(user);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDemoLogin = () => {
    try {
      const user = loginUser('Magnus_Carlsen', 'password');
      onLoginSuccess(user);
    } catch (err) {
      setError('Erreur de connexion démo');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">♟ CHESS ARENA</h1>
        <p className="login-subtitle">Plateforme d'Échecs Compétitive</p>

        {error && <div className="error">{error}</div>}

        <form onSubmit={isLogin ? handleLogin : handleSignup} className="login-form">
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          {!isLogin && (
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          )}
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {!isLogin && (
            <input
              type="password"
              placeholder="Confirmer"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          )}
          <button type="submit" className="btn btn-primary">{isLogin ? 'Connexion' : 'S\'inscrire'}</button>
        </form>

        <button className="btn btn-secondary" onClick={handleDemoLogin} style={{width: '100%', marginTop: '10px'}}>
          Démo: Magnus_Carlsen
        </button>

        <div className="login-footer">
          {isLogin ? "Pas de compte? " : "Déjà inscrit? "}
          <button type="button" className="toggle-btn" onClick={() => { setIsLogin(!isLogin); setError(''); }}>
            {isLogin ? 'S\'inscrire' : 'Se connecter'}
          </button>
        </div>
      </div>
    </div>
  );
}
