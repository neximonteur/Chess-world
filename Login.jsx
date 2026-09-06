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
      setError('Le mot de passe doit avoir au moins 6 caractères');
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
      const user = loginUser('Magnus_Carlsen', btoa('password').substring(0, 8));
      onLoginSuccess(user);
    } catch (err) {
      // Essayer un autre compte
      const user = loginUser('Magnus_Carlsen', 'password');
      onLoginSuccess(user);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">♟️ CHESS WORLD</h1>
        <p className="login-subtitle">Classement Mondial d'Échecs</p>

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
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
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
              placeholder="Confirmer le mot de passe"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          )}

          <button type="submit" className="btn btn-primary">
            {isLogin ? 'Connexion' : 'Créer un compte'}
          </button>
        </form>

        <div className="demo-section">
          <p className="demo-text">Essayer la plateforme:</p>
          <button className="btn btn-secondary" onClick={handleDemoLogin}>
            Compte Démo (Magnus_Carlsen)
          </button>
        </div>

        <div className="login-footer">
          <p>
            {isLogin ? "Pas encore de compte?" : "Déjà un compte?"}
            <button
              type="button"
              className="toggle-btn"
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
            >
              {isLogin ? 'S\'inscrire' : 'Se connecter'}
            </button>
          </p>
        </div>

        <div className="info-box">
          <h3>ℹ️ Démo Interactive</h3>
          <p>Utilisateurs disponibles: Magnus_Carlsen, Fabiano_Caruana, Ding_Liren</p>
          <p>Mot de passe pour la démo: password</p>
        </div>
      </div>

      <div className="chess-background">
        <div className="chessboard">
          {Array.from({ length: 8 }).map((_, row) =>
            Array.from({ length: 8 }).map((_, col) => (
              <div
                key={`${row}-${col}`}
                className={`square ${(row + col) % 2 === 0 ? 'light' : 'dark'}`}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
