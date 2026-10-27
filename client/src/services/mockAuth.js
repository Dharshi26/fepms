/**
 * Frontend-only authentication service for development.
 * This is a temporary solution until backend authentication is ready.
 * 
 * IMPORTANT: This is development-only authentication.
 * Replace with real backend authentication when MongoDB/API is ready.
 */

const STORAGE_KEYS = {
  USERS: 'fepms_mock_users',
  SESSION: 'fepms_mock_session'
};

// Initialize mock users storage if empty
const initializeMockUsers = () => {
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify([]));
  }
};

// Get all mock users
const getMockUsers = () => {
  initializeMockUsers();
  const usersJson = localStorage.getItem(STORAGE_KEYS.USERS);
  return JSON.parse(usersJson || '[]');
};

// Save mock users
const saveMockUsers = (users) => {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
};

// Get current session
const getSession = () => {
  const sessionJson = localStorage.getItem(STORAGE_KEYS.SESSION);
  return JSON.parse(sessionJson || 'null');
};

// Save session
const saveSession = (user) => {
  if (user) {
    localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEYS.SESSION);
  }
};

// Generate unique ID for mock users
const generateId = () => {
  return 'mock_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
};

// Email validation
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password validation
const isValidPassword = (password) => {
  return password && password.length >= 6;
};

// Mock registration
const mockRegister = async (userData) => {
  const { name, email, password, phone = '' } = userData;
  
  // Validation
  if (!name || name.trim() === '') {
    return { success: false, error: 'Name is required' };
  }
  
  if (!email || !isValidEmail(email)) {
    return { success: false, error: 'Please enter a valid email address' };
  }
  
  if (!password || !isValidPassword(password)) {
    return { success: false, error: 'Password must be at least 6 characters' };
  }
  
  // Check for duplicate email
  const users = getMockUsers();
  const existingUser = users.find(u => u.email === email.toLowerCase());
  if (existingUser) {
    return { success: false, error: 'An account with this email already exists' };
  }
  
  // Create mock user
  const mockUser = {
    id: generateId(),
    name: name.trim(),
    email: email.toLowerCase(),
    phone: phone.trim(),
    role: 'technician', // Default role for public registration
    isActive: true,
    createdAt: new Date().toISOString()
  };
  
  // Save user (in real implementation, password would be hashed)
  const newUsers = [...users, mockUser];
  saveMockUsers(newUsers);
  
  // Create session
  const sessionUser = {
    _id: mockUser.id,
    id: mockUser.id,
    name: mockUser.name,
    email: mockUser.email,
    phone: mockUser.phone,
    role: mockUser.role,
    isActive: mockUser.isActive,
    assignedFranchises: [],
    assignedOutlets: []
  };
  
  saveSession(sessionUser);
  
  return {
    success: true,
    user: sessionUser,
    token: 'mock_jwt_token_for_development_only'
  };
};

// Mock login
const mockLogin = async (email, password) => {
  // Validation
  if (!email || !isValidEmail(email)) {
    return { success: false, error: 'Please enter a valid email address' };
  }
  
  if (!password) {
    return { success: false, error: 'Password is required' };
  }
  
  // Find user
  const users = getMockUsers();
  const user = users.find(u => u.email === email.toLowerCase());
  
  if (!user) {
    return { success: false, error: 'Invalid email or password' };
  }
  
  // In mock mode, check if password matches (simple comparison)
  // In real implementation, this would be password hash comparison
  const usersWithPasswords = getMockUsers();
  const userWithPassword = usersWithPasswords.find(u => u.email === email.toLowerCase());
  
  // For mock purposes, accept any password for existing users
  // In a real implementation, we would verify password hash
  
  // Create session
  const sessionUser = {
    _id: user.id,
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    isActive: user.isActive,
    assignedFranchises: [],
    assignedOutlets: []
  };
  
  saveSession(sessionUser);
  
  return {
    success: true,
    user: sessionUser,
    token: 'mock_jwt_token_for_development_only'
  };
};

// Mock logout
const mockLogout = async () => {
  saveSession(null);
  return { success: true };
};

// Mock get current user
const mockGetCurrentUser = async () => {
  const session = getSession();
  if (!session) {
    return { success: false, error: 'Not authenticated' };
  }
  
  return {
    success: true,
    user: session
  };
};

// Clear all mock data (for testing)
const clearMockData = () => {
  localStorage.removeItem(STORAGE_KEYS.USERS);
  localStorage.removeItem(STORAGE_KEYS.SESSION);
};

export {
  mockRegister,
  mockLogin,
  mockLogout,
  mockGetCurrentUser,
  getSession,
  clearMockData
};