import React, { createContext, useCallback, useMemo, useState } from 'react';
import EnvConstants from '../util/EnvConstants';

export const AuthContext = createContext()

export default function AuthContextProvider ({children}) {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem(EnvConstants.TOKEN_AUTH) ? true : false)
  const [user, setUser] = useState(null);
  
  const logout = () => {
    localStorage.removeItem(EnvConstants.TOKEN_AUTH)
    setUser(null)
    window.location.reload()
  }

  const login = useCallback((token) => {
    localStorage.setItem(EnvConstants.TOKEN_AUTH, token)
    setIsAuthenticated(true)
  }, [])

  const value = useMemo(() => ({
    login,
    logout,
    isAuthenticated,
    user,
    setUser
  }), [isAuthenticated, login, user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}