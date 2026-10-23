# ♟ CHESS ARENA - Plateforme d'Échecs Compétitive

Une plateforme de jeu d'échecs moderne avec système de classement compétitif, basée sur React et Vite.

## 🎮 Fonctionnalités

- **25 Rangs Compétitifs** : De Bronze à Radiant, chaque rang = 100 ELO
- **Système d'ELO** : Progression jusqu'à 3000 ELO
- **4 Titres d'Échecs** : CM, FM, IM, GM (inspiré des vrais titres d'échecs)
- **Parties avec Timer 10 Minutes** : Simulations de parties rapides
- **Classement Mondial** : Voir votre position parmi tous les joueurs
- **Gestion d'Amis** : Code d'invitation pour ajouter des amis
- **Galerie Complète des Rangs** : Voir tous les 25 rangs + titres professionnels
- **Design Moderne** : Interface épurée, pas de style "IA"

## 🚀 Démarrage Rapide

### Installation

```bash
git clone <your-repo-url>
cd chess-world
npm install
```

### Développement

```bash
npm run dev
```

Ouvrez http://localhost:5173 dans votre navigateur

### Build

```bash
npm run build
```

## 📊 Système de Rangs

| Tier | Rangs | ELO | Symbole |
|------|-------|-----|---------|
| Bronze | III, II, I | 0-300 | 🥉 |
| Silver | III, II, I | 300-600 | ⚪ |
| Gold | III, II, I | 600-900 | 🥇 |
| Platinum | III, II, I | 900-1200 | 💎 |
| Elite | III, II, I | 1200-1500 | ⭐ |
| Master | III, II, I | 1500-1800 | 👑 |
| Ascendant | III, II, I | 1800-2100 | 🚀 |
| Immortal | III, II, I | 2100-2400 | 🔥 |
| Radiant | - | 2400-3000 | ✨ |

## 🏆 Titres Professionnels

À partir de certains ELO, débloquez les titres d'échecs reconnus mondialement :

- **CM** (Candidate Master) : 2000 ELO
- **FM** (FIDE Master) : 2200 ELO
- **IM** (International Master) : 2300 ELO
- **GM** (Grandmaster) : 2500 ELO

## 🎯 Pages Principales

### Dashboard
- Affichage du rang actuel avec progression
- Position mondiale
- Statistiques (V/D, ratio)
- Parties avec timer 10 minutes
- Historique des dernières parties

### Leaderboard
- Top 200 joueurs mondiaux
- Filtrage par tier
- Affichage de votre position
- Médailles pour top 3

### Rangs (Galerie)
- Tous les 25 rangs avec symboles
- Titres d'échecs professionnels
- Guide de progression
- Descriptions de chaque tier

### Amis
- Code d'invitation personnel
- Ajout d'amis via code
- Liste des amis avec stats

### Profil
- Changement d'avatar
- Affichage des stats
- Progression vers le rang suivant

## 🎮 Comptes de Démo

Login: `Magnus_Carlsen` | Password: `password`
- ELO: 2850, Grandmaster

Autres comptes disponibles:
- `Ding_Liren` (2780)
- `Alireza_Firouzja` (2760)
- `Fabiano_Caruana` (2740)
- Et 6 autres...

## 💾 Données

Les données sont stockées en localStorage pour la persistance. Cela signifie que :
- Les données restent après fermeture du navigateur
- Chaque utilisateur a ses propres données
- Clear Cache = réinitialise tout

## 🏗️ Structure du Projet

```
chess-world/
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx
│   │   ├── Leaderboard.jsx
│   │   ├── RanksGallery.jsx
│   │   ├── Friends.jsx
│   │   ├── Profile.jsx
│   │   └── Login.jsx
│   ├── data/
│   │   ├── ranks.js (système de rangs)
│   │   └── userService.js (gestion utilisateurs)
│   ├── styles/
│   │   ├── global.css
│   │   ├── app.css
│   │   ├── dashboard.css
│   │   ├── leaderboard.css
│   │   ├── ranks.css
│   │   ├── friends.css
│   │   ├── profile.css
│   │   └── login.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js
└── package.json
```

## 🎨 Design

- **Thème sombre** : Fond bleu-noir professionnel
- **Couleurs primaires** : Cyan (#00d4ff), Bleu (#0055ff)
- **Typographie** : Police moderne avec letter-spacing
- **Animations** : Transitions fluides, glow effects
- **Responsive** : Mobile-friendly

## 📦 Dépendances

- React 18
- Vite 4
- axios (optionnel pour API future)
- qrcode.react (optionnel pour partage)

## 🚀 Déploiement

### Netlify

1. Push sur GitHub
2. Connectez Netlify à votre repo
3. Build command: `npm run build`
4. Publish: `dist`

```bash
npm run deploy
```

### Vercel

```bash
npm install -g vercel
vercel
```

## 📝 Notes

- Authentification: Simple (btoa encode, démo seulement, non-production)
- Timer: Implémentation côté client, 10 minutes par partie
- ELO: Simulation aléatoire (+15 à +35 en victoire, -5 à -20 en défaite)

## 🔄 Mises à Jour Futures

- [ ] Backend avec base de données réelle
- [ ] Authentification sécurisée (JWT)
- [ ] Parties en ligne multiplayer
- [ ] Chat et messages
- [ ] Tournois
- [ ] Replay des parties

## 📄 Licence

MIT

---

Crée avec ❤️ pour les amateurs d'échecs compétitifs
