# ♟️ CHESS WORLD - Global Chess Championship Platform

Une plateforme d'échecs moderne avec un classement mondial, un système de rangs épiques inspiré des jeux vidéo, et un système de code d'invitation pour les amis.

## 🎮 Caractéristiques Principales

### 🏆 Système de Rangs Épiques (20+ Rangs)
- **Novice** 🌱 (0-400 ELO)
- **Apprentice** 📚 (400-600 ELO)
- **Knight Errant** 🗡️ (600-800 ELO)
- **Master Knight** ⚔️ (800-1000 ELO)
- **Warlord** 👑 (1000-1200 ELO)
- **Dragon Slayer** 🐉 (1200-1400 ELO)
- **Legendary Warrior** ⚡ (1400-1600 ELO)
- **Mythic Champion** 🌟 (1600-1800 ELO)
- **Eternal Guardian** 🛡️ (1800-2000 ELO)
- **Supreme Master** 👾 (2000-2200 ELO)
- **Cosmic Sage** 🌌 (2200-2400 ELO)
- **Titan of Minds** 🗿 (2400-2600 ELO)
- **Dimensional Keeper** 🌀 (2600-2800 ELO)
- **Universal Scholar** 📖 (2800-3000 ELO)
- **Omniscient Oracle** 🔮 (3000-3200 ELO)
- **Celestial Monarch** ✨ (3200-3400 ELO)
- **Reality Bender** 🌈 (3400-3600 ELO)
- **Transcendent Entity** 🎆 (3600-3800 ELO)
- **Universe Architect** 🏛️ (3800-4000 ELO)
- **Eternal Infinity** ♾️ (4000+ ELO)

### 📊 Classement Mondial
- Classement en temps réel de tous les joueurs
- Filtrage par rang et recherche de joueurs
- Statistiques complètes (victoires, défaites, ratio)
- Position mondiale visible pour chaque joueur
- Affichage du pourcentage des meilleurs joueurs

### 👤 Système de Compte
- Création de compte sécurisée
- Connexion/Déconnexion
- Profil personnalisable avec avatar
- Historique de parties

### 👥 Système d'Amis
- Code d'invitation unique pour chaque joueur
- Lien d'invitation personnalisé
- Ajout d'amis via code
- Liste d'amis avec statistiques

### 🎯 Dashboard Personnel
- Vue d'ensemble des statistiques
- Rang actuel et progression
- Position mondiale
- Simulation de parties (test du système d'ELO)
- Historique des dernières parties

## 🚀 Installation et Déploiement

### Prérequis
- Node.js 18+ et npm

### Installation Locale

```bash
# 1. Naviguer dans le répertoire du projet
cd chess-world

# 2. Installer les dépendances
npm install

# 3. Démarrer le serveur de développement
npm run dev

# 4. Ouvrir le navigateur
# Le site sera accessible à http://localhost:3000
```

### Build pour la Production

```bash
npm run build
```

### Déploiement sur Netlify

#### Option 1: Via CLI Netlify
```bash
# Installer Netlify CLI
npm install -g netlify-cli

# Construire le projet
npm run build

# Déployer
netlify deploy --prod
```

#### Option 2: Via GitHub + Netlify
1. Créer un repository GitHub
2. Pousser le code vers GitHub
3. Connecter Netlify à votre repository GitHub
4. Netlify déploiera automatiquement à chaque push

```bash
# Initialiser Git
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/votre-username/chess-world.git
git branch -M main
git push -u origin main
```

#### Configuration Netlify
Créez un fichier `netlify.toml` à la racine du projet:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[context.production]
  environment = { NODE_VERSION = "18" }

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## 📱 Utilisation

### Comptes de Démonstration
- **Username:** Magnus_Carlsen
- **Mot de passe:** password

Ou créez votre propre compte!

### Fonctionnalités Principales

#### Dashboard
- Visualisez votre rang actuel avec progression
- Consultez votre position mondiale
- Voyez vos statistiques complètes
- Simulez des parties pour tester le système d'ELO

#### Classement Mondial
- Consultez le classement de tous les joueurs
- Filtrez par rang
- Recherchez des joueurs spécifiques
- Voyez les meilleurs joueurs et les médailles

#### Profil
- Modifiez votre avatar (16 options)
- Consultez tous les rangs disponibles
- Suivez votre progression
- Lisez des conseils pour progresser

#### Amis
- Générez un code d'invitation unique
- Partagez votre lien d'invitation
- Ajoutez des amis via leur code
- Voyez les statistiques de vos amis

## 🏗️ Architecture du Projet

```
chess-world/
├── src/
│   ├── components/        # Composants React
│   │   ├── Login.jsx
│   │   ├── App.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Leaderboard.jsx
│   │   ├── Profile.jsx
│   │   └── Friends.jsx
│   ├── data/              # Logique métier
│   │   ├── ranks.js       # Système de rangs
│   │   └── userService.js # Gestion des utilisateurs
│   ├── styles/            # Fichiers CSS
│   │   ├── global.css
│   │   ├── app.css
│   │   ├── login.css
│   │   ├── dashboard.css
│   │   ├── leaderboard.css
│   │   ├── friends.css
│   │   └── profile.css
│   └── main.jsx           # Point d'entrée React
├── public/                # Fichiers statiques
├── index.html             # HTML principal
├── package.json
├── vite.config.js
└── README.md
```

## 🎨 Design et Thème

- **Thème Sombre:** Dark mode élégant inspiré des jeux vidéo
- **Couleurs Principales:** 
  - Primary: #e94560 (rouge)
  - Secondary: #f39c12 (orange)
  - Background: #1a1a2e et #16213e (bleus foncés)
- **Animations Fluides:** Transitions et animations pour une meilleure UX
- **Responsive Design:** Adapté pour mobile, tablette et desktop

## 💾 Stockage des Données

Le projet utilise **localStorage** pour stocker les données:
- Utilisateurs et profils
- Amis
- Codes d'invitation
- Historique de parties

**Note:** Pour une vraie application en production, vous devriez intégrer une base de données réelle (Firebase, Supabase, ou votre propre backend).

## 🔐 Sécurité

**IMPORTANT:** Ce projet est une démonstration. Pour la production:
- Utilisez une base de données sécurisée
- Implémentez l'authentification JWT
- Hashez les mots de passe avec bcrypt
- Utilisez HTTPS obligatoirement
- Validez toutes les données côté serveur

## 📝 Système d'ELO Simplifié

Le système simule une progression d'ELO:
- Victoire: +10 à +30 ELO
- Défaite: -5 à -20 ELO
- La progression change de rang tous les 200 ELO

## 🚀 Futures Améliorations

- [ ] Système de parties en temps réel
- [ ] Chat avec les amis
- [ ] Tournois et compétitions
- [ ] Intégration avec chess.com API
- [ ] Système de notations pour les parties
- [ ] Notifications en temps réel
- [ ] Mode sombre/clair toggle
- [ ] Système d'achievements/badges

## 📄 Licence

Ce projet est libre d'utilisation à titre personnel et éducatif.

## 💬 Support

Pour des questions ou des suggestions, n'hésitez pas à créer une issue sur GitHub!

---

Fait avec ❤️ pour les passionnés d'échecs et de jeux vidéo! ♟️🎮
