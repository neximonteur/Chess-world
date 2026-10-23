import { RANKS } from './ranks.js';

const USERS_KEY = 'chess_users';
const CURRENT_USER_KEY = 'chess_current_user';

export function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

export function generateInviteCode() {
  return Math.random().toString(36).substr(2, 6).toUpperCase();
}

function initializeDemoData() {
  const demoUsers = [
    { 
      id: generateId(), username: "Magnus_Carlsen", email: "magnus@chess.com", elo: 2850, 
      wins: 245, losses: 12, inviteCode: generateInviteCode(), 
      joinDate: new Date(2023, 0, 15).toISOString(), avatar: "♔"
    },
    { 
      id: generateId(), username: "Ding_Liren", email: "ding@chess.com", elo: 2780, 
      wins: 187, losses: 41, inviteCode: generateInviteCode(), 
      joinDate: new Date(2023, 2, 5).toISOString(), avatar: "♕"
    },
    { 
      id: generateId(), username: "Alireza_Firouzja", email: "alireza@chess.com", elo: 2760, 
      wins: 156, losses: 29, inviteCode: generateInviteCode(), 
      joinDate: new Date(2023, 3, 20).toISOString(), avatar: "♖"
    },
    { 
      id: generateId(), username: "Fabiano_Caruana", email: "fabiano@chess.com", elo: 2740, 
      wins: 143, losses: 38, inviteCode: generateInviteCode(), 
      joinDate: new Date(2023, 4, 12).toISOString(), avatar: "♗"
    },
    { 
      id: generateId(), username: "Giri_Anish", email: "giri@chess.com", elo: 2720, 
      wins: 132, losses: 44, inviteCode: generateInviteCode(), 
      joinDate: new Date(2023, 5, 8).toISOString(), avatar: "♘"
    },
    { 
      id: generateId(), username: "Wesley_So", email: "wesley@chess.com", elo: 2690, 
      wins: 118, losses: 52, inviteCode: generateInviteCode(), 
      joinDate: new Date(2023, 6, 15).toISOString(), avatar: "♙"
    },
    { 
      id: generateId(), username: "Quentin_Fournier", email: "quentin@chess.com", elo: 1850, 
      wins: 87, losses: 23, inviteCode: generateInviteCode(), 
      joinDate: new Date(2023, 7, 3).toISOString(), avatar: "♚"
    },
    { 
      id: generateId(), username: "Sarah_Williams", email: "sarah@chess.com", elo: 1650, 
      wins: 76, losses: 28, inviteCode: generateInviteCode(), 
      joinDate: new Date(2023, 8, 18).toISOString(), avatar: "♛"
    },
    { 
      id: generateId(), username: "Jean_Dubois", email: "jean@chess.com", elo: 1420, 
      wins: 64, losses: 32, inviteCode: generateInviteCode(), 
      joinDate: new Date(2023, 9, 22).toISOString(), avatar: "♜"
    },
    { 
      id: generateId(), username: "Alex_Petrov", email: "alex@chess.com", elo: 1150, 
      wins: 52, losses: 41, inviteCode: generateInviteCode(), 
      joinDate: new Date(2023, 10, 15).toISOString(), avatar: "♝"
    },
  ];
  
  localStorage.setItem(USERS_KEY, JSON.stringify(demoUsers));
}

export function getAllUsers() {
  const data = localStorage.getItem(USERS_KEY);
  if (!data) {
    initializeDemoData();
    return getAllUsers();
  }
  
  const users = JSON.parse(data);
  return users.sort((a, b) => b.elo - a.elo);
}

export function createUser(username, email, password) {
  const users = getAllUsers();
  
  if (users.find(u => u.username === username || u.email === email)) {
    throw new Error("Nom d'utilisateur ou email déjà utilisé");
  }
  
  const newUser = {
    id: generateId(),
    username,
    email,
    password: btoa(password),
    elo: 800,
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

export function loginUser(username, password) {
  const users = getAllUsers();
  const user = users.find(u => u.username === username && u.password === btoa(password));
  
  if (!user) {
    throw new Error("Nom d'utilisateur ou mot de passe incorrect");
  }
  
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  return user;
}

export function getCurrentUser() {
  const data = localStorage.getItem(CURRENT_USER_KEY);
  return data ? JSON.parse(data) : null;
}

export function logoutUser() {
  localStorage.removeItem(CURRENT_USER_KEY);
}

export function updateUserProfile(userId, updates) {
  const users = getAllUsers();
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) throw new Error("Utilisateur introuvable");
  
  users[userIndex] = { ...users[userIndex], ...updates };
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  
  const currentUser = getCurrentUser();
  if (currentUser && currentUser.id === userId) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(users[userIndex]));
  }
  
  return users[userIndex];
}

export function addFriendByCode(currentUserId, inviteCode) {
  const users = getAllUsers();
  const friend = users.find(u => u.inviteCode === inviteCode);
  
  if (!friend) {
    throw new Error("Code d'invitation invalide");
  }
  
  if (friend.id === currentUserId) {
    throw new Error("Vous ne pouvez pas vous ajouter vous-même");
  }
  
  const currentUserIndex = users.findIndex(u => u.id === currentUserId);
  
  if (!users[currentUserIndex].friends) {
    users[currentUserIndex].friends = [];
  }
  
  if (users[currentUserIndex].friends.includes(friend.id)) {
    throw new Error("Vous êtes déjà amis");
  }
  
  users[currentUserIndex].friends.push(friend.id);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  
  return friend;
}

export function getUserFriends(userId) {
  const users = getAllUsers();
  const user = users.find(u => u.id === userId);
  
  if (!user || !user.friends) return [];
  
  return user.friends.map(friendId => users.find(u => u.id === friendId)).filter(Boolean);
}

export function getUserById(userId) {
  const users = getAllUsers();
  return users.find(u => u.id === userId);
}

export function getGlobalLeaderboard(limit = 100) {
  return getAllUsers().slice(0, limit);
}

export function recordGame(userId, opponent, isWin, eloGain) {
  const user = getUserById(userId);
  if (!user) throw new Error("Utilisateur introuvable");
  
  const newElo = Math.max(0, user.elo + eloGain);
  const updates = {
    elo: newElo,
    wins: isWin ? user.wins + 1 : user.wins,
    losses: !isWin ? user.losses + 1 : user.losses,
  };
  
  return updateUserProfile(userId, updates);
}

const AVATARS = ["♔", "♕", "♖", "♗", "♘", "♙", "♚", "♛", "♜", "♝", "♞", "♟"];

function getRandomAvatar() {
  return AVATARS[Math.floor(Math.random() * AVATARS.length)];
}

export function getInviteLinkData(userId) {
  const user = getUserById(userId);
  if (!user) throw new Error("Utilisateur introuvable");
  
  return {
    username: user.username,
    inviteCode: user.inviteCode,
    inviteLink: `${window.location.origin}?invite=${user.inviteCode}`,
  };
}
