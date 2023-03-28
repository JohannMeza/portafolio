import React, { createContext, useCallback, useMemo, useState } from 'react';
import { useEffect } from 'react';
import { useAlert } from 'react-alert';
import { SendRequestData } from '../helpers/helpRequestBackend';
import useLoaderContext from '../hooks/useLoaderContext';
import EnvConstants from '../util/EnvConstants';

export const AuthContext = createContext()

export default function AuthContextProvider ({children}) {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem(EnvConstants.APP_TOKEN) ? true : false)
  const [user, setUser] = useState(null);
  const {setLoader} = useLoaderContext()
  const alert = useAlert();

  const access = () => { 
    SendRequestData({
      path: EnvConstants.APP_URL_ACCESS,
      queryId: 33,
      success: (resp) => {
        setLoader(false)
        setIsAuthenticated(true)
        setUser(resp.dataObject)
      }, 
      error: (err) => {
        setLoader(false)
        const { message, status } = err;
        (status < 500) && alert.error(message)
      }
    })
  }

  const logout = () => {
    localStorage.removeItem(EnvConstants.APP_TOKEN)
    setUser(null)
    window.location.reload()
  }

  const login = useCallback((token) => {
    localStorage.setItem(EnvConstants.APP_TOKEN, token)
    setIsAuthenticated(true)
  }, [])

  const value = useMemo(() => ({
    login,
    logout,
    isAuthenticated,
    user,
    setUser,
    access
  }), [isAuthenticated, login, user])

  useEffect(() => { 
    if (isAuthenticated) access()
  }, [])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}