import { RANKS } from './ranks.js';

const USERS_KEY = 'chess_users';
const CURRENT_USER_KEY = 'chess_current_user';

// Générer un ID unique
export function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

// Générer un code d'invitation unique
export function generateInviteCode() {
  return Math.random().toString(36).substr(2, 6).toUpperCase();
}

// Initialiser les données avec des utilisateurs de démonstration
function initializeDemoData() {
  const demoUsers = [
    { id: generateId(), username: "Magnus_Carlsen", email: "magnus@chess.com", elo: 2850, wins: 245, losses: 12, inviteCode: generateInviteCode(), joinDate: new Date(2023, 0, 15).toISOString(), avatar: "👑" },
    { id: generateId(), username: "Fabiano_Caruana", email: "fabiano@chess.com", elo: 2790, wins: 198, losses: 34, inviteCode: generateInviteCode(), joinDate: new Date(2023, 1, 10).toISOString(), avatar: "🦅" },
    { id: generateId(), username: "Ding_Liren", email: "ding@chess.com", elo: 2780, wins: 187, losses: 41, inviteCode: generateInviteCode(), joinDate: new Date(2023, 2, 5).toISOString(), avatar: "🐲" },
    { id: generateId(), username: "Alireza_Firouzja", email: "alireza@chess.com", elo: 2760, wins: 156, losses: 29, inviteCode: generateInviteCode(), joinDate: new Date(2023, 3, 20).toISOString(), avatar: "⚡" },
    { id: generateId(), username: "Giri_Anish", email: "giri@chess.com", elo: 2740, wins: 143, losses: 38, inviteCode: generateInviteCode(), joinDate: new Date(2023, 4, 12).toISOString(), avatar: "🎯" },
    { id: generateId(), username: "Wesley_So", email: "wesley@chess.com", elo: 2720, wins: 132, losses: 44, inviteCode: generateInviteCode(), joinDate: new Date(2023, 5, 8).toISOString(), avatar: "🌟" },
    { id: generateId(), username: "Quentin_Fournier", email: "quentin@chess.com", elo: 2100, wins: 87, losses: 23, inviteCode: generateInviteCode(), joinDate: new Date(2023, 6, 15).toISOString(), avatar: "🎨" },
    { id: generateId(), username: "Sarah_Williams", email: "sarah@chess.com", elo: 1950, wins: 76, losses: 28, inviteCode: generateInviteCode(), joinDate: new Date(2023, 7, 3).toISOString(), avatar: "♀️" },
    { id: generateId(), username: "Jean_Dubois", email: "jean@chess.com", elo: 1850, wins: 64, losses: 32, inviteCode: generateInviteCode(), joinDate: new Date(2023, 8, 18).toISOString(), avatar: "🇫🇷" },
    { id: generateId(), username: "Alex_Petrov", email: "alex@chess.com", elo: 1750, wins: 52, losses: 41, inviteCode: generateInviteCode(), joinDate: new Date(2023, 9, 22).toISOString(), avatar: "🇷🇺" },
  ];
  
  localStorage.setItem(USERS_KEY, JSON.stringify(demoUsers));
}

// Récupérer tous les utilisateurs
export function getAllUsers() {
  const data = localStorage.getItem(USERS_KEY);
  if (!data) {
    initializeDemoData();
    return getAllUsers();
  }
  
  const users = JSON.parse(data);
  return users.sort((a, b) => b.elo - a.elo);
}

// Créer un nouvel utilisateur
export function createUser(username, email, password) {
  const users = getAllUsers();
  
  if (users.find(u => u.username === username || u.email === email)) {
    throw new Error("Username or email already exists");
  }
  
  const newUser = {
    id: generateId(),
    username,
    email,
    password: btoa(password), // Simple encoding (pour démo seulement!)
    elo: 1200,
    wins: 0,
    losses: 0,
    inviteCode: generateInviteCode(),
    joinDate: new Date().toISOString(),
    avatar: getRandomAvatar(),
    friends: [],
  };
  
  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  
  return newUser;
}

// Connexion utilisateur
export function loginUser(username, password) {
  const users = getAllUsers();
  const user = users.find(u => u.username === username && u.password === btoa(password));
  
  if (!user) {
    throw new Error("Invalid username or password");
  }
  
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  return user;
}

// Récupérer l'utilisateur actuel
export function getCurrentUser() {
  const data = localStorage.getItem(CURRENT_USER_KEY);
  return data ? JSON.parse(data) : null;
}

// Déconnexion
export function logoutUser() {
  localStorage.removeItem(CURRENT_USER_KEY);
}

// Mettre à jour le profil utilisateur
export function updateUserProfile(userId, updates) {
  const users = getAllUsers();
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) throw new Error("User not found");
  
  users[userIndex] = { ...users[userIndex], ...updates };
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  
  // Mettre à jour l'utilisateur actuel si c'est le même
  const currentUser = getCurrentUser();
  if (currentUser && currentUser.id === userId) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(users[userIndex]));
  }
  
  return users[userIndex];
}

// Ajouter un ami via code d'invitation
export function addFriendByCode(currentUserId, inviteCode) {
  const users = getAllUsers();
  const friend = users.find(u => u.inviteCode === inviteCode);
  
  if (!friend) {
    throw new Error("Invalid invite code");
  }
  
  if (friend.id === currentUserId) {
    throw new Error("You cannot add yourself");
  }
  
  const currentUserIndex = users.findIndex(u => u.id === currentUserId);
  
  if (!users[currentUserIndex].friends) {
    users[currentUserIndex].friends = [];
  }
  
  if (users[currentUserIndex].friends.includes(friend.id)) {
    throw new Error("Already friends");
  }
  
  users[currentUserIndex].friends.push(friend.id);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  
  return friend;
}

// Récupérer les amis d'un utilisateur
export function getUserFriends(userId) {
  const users = getAllUsers();
  const user = users.find(u => u.id === userId);
  
  if (!user || !user.friends) return [];
  
  return user.friends.map(friendId => users.find(u => u.id === friendId)).filter(Boolean);
}

// Récupérer un utilisateur par ID
export function getUserById(userId) {
  const users = getAllUsers();
  return users.find(u => u.id === userId);
}

// Récupérer le classement mondial (triés par ELO)
export function getGlobalLeaderboard(limit = 100) {
  return getAllUsers().slice(0, limit);
}

// Enregistrer une partie
export function recordGame(userId, opponent, isWin, eloGain) {
  const user = getUserById(userId);
  if (!user) throw new Error("User not found");
  
  const newElo = Math.max(0, user.elo + eloGain);
  const updates = {
    elo: newElo,
    wins: isWin ? user.wins + 1 : user.wins,
    losses: !isWin ? user.losses + 1 : user.losses,
  };
  
  return updateUserProfile(userId, updates);
}

// Avatars aléatoires
const AVATARS = ["👑", "🦅", "🐉", "⚡", "🎯", "🌟", "🎨", "♀️", "🇫🇷", "🇷🇺", "🎭", "🎪", "🎸", "🎬", "🎲", "🏆"];

function getRandomAvatar() {
  return AVATARS[Math.floor(Math.random() * AVATARS.length)];
}

// Vérifier si on peut inviter des amis
export function getInviteLinkData(userId) {
  const user = getUserById(userId);
  if (!user) throw new Error("User not found");
  
  return {
    username: user.username,
    inviteCode: user.inviteCode,
    inviteLink: `${window.location.origin}?invite=${user.inviteCode}`,
  };
}
