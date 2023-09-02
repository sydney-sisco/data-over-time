import React, { useState, useEffect, useContext } from 'react';

// Create Context
const AuthContext = React.createContext();

// AuthProvider Component that wraps your app in App.js
const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const isLoggedIn = !!token;

  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, token, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
