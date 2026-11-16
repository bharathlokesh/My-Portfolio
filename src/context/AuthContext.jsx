import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const AUTH_STORAGE_KEY = 'bharath_admin_session_v1';
const CREDS_STORAGE_KEY = 'bharath_admin_creds_v1';

const DEFAULT_CREDENTIALS = {
  email: 'bharathlokesh07@gmail.com',
  password: 'bharath2026'
};

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return sessionStorage.getItem(AUTH_STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [credentials, setCredentials] = useState(() => {
    try {
      const saved = localStorage.getItem(CREDS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          email: parsed.email || (parsed.username && parsed.username.includes('@') ? parsed.username : DEFAULT_CREDENTIALS.email),
          password: parsed.password || DEFAULT_CREDENTIALS.password
        };
      }
      return DEFAULT_CREDENTIALS;
    } catch {
      return DEFAULT_CREDENTIALS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CREDS_STORAGE_KEY, JSON.stringify(credentials));
    } catch (e) {
      console.warn('Failed to save admin credentials', e);
    }
  }, [credentials]);

  const login = (inputEmail, inputPass) => {
    const trimmedInput = (inputEmail || '').trim().toLowerCase();
    const trimmedPass = (inputPass || '').trim();
    const registeredEmail = (credentials.email || DEFAULT_CREDENTIALS.email).toLowerCase();

    // Valid if matches registered email, or 'admin' fallback alias
    const matchesEmail = trimmedInput === registeredEmail || trimmedInput === 'admin';
    const matchesPass = trimmedPass === credentials.password;

    if (matchesEmail && matchesPass) {
      setIsAuthenticated(true);
      try {
        sessionStorage.setItem(AUTH_STORAGE_KEY, 'true');
      } catch (e) {
        console.warn('Session storage error', e);
      }
      return { success: true };
    }

    return {
      success: false,
      message: 'Invalid registered Gmail or password. Please verify your credentials.'
    };
  };

  const logout = () => {
    setIsAuthenticated(false);
    try {
      sessionStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (e) {
      console.warn('Session storage error', e);
    }
  };

  const updateCredentials = ({ currentPassword, newEmail, newPassword }) => {
    if (currentPassword !== credentials.password) {
      return { success: false, message: 'Current password does not match.' };
    }

    const updates = {};

    if (newEmail && newEmail.trim()) {
      const trimmedEmail = newEmail.trim().toLowerCase();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmedEmail)) {
        return { success: false, message: 'Please enter a valid Gmail / email address.' };
      }
      updates.email = trimmedEmail;
    }

    if (newPassword && newPassword.trim()) {
      if (newPassword.length < 6) {
        return { success: false, message: 'New password must be at least 6 characters long.' };
      }
      updates.password = newPassword.trim();
    }

    if (Object.keys(updates).length === 0) {
      return { success: false, message: 'Please provide a new email or password to update.' };
    }

    setCredentials(prev => ({
      ...prev,
      ...updates
    }));

    return { success: true, message: 'Admin credentials successfully updated!' };
  };

  const changePassword = (currentPass, newPass) => {
    return updateCredentials({ currentPassword: currentPass, newPassword: newPass });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        changePassword,
        updateCredentials,
        adminEmail: credentials.email || DEFAULT_CREDENTIALS.email
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
