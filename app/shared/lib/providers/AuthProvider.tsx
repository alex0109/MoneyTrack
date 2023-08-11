import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useState } from 'react';

import { save } from '../utils/asyncMethods';

import type { FC, ReactNode } from 'react';

interface AuthContextType {
  token: string;
  uid: string;
  isAuthenticated: boolean;
  authenticate: (arg0: string, arg1: string) => void;
  logout: () => void;
}

const defaultAuthContext: AuthContextType = {
  token: '',
  uid: '',
  isAuthenticated: false,
  authenticate: () => {},
  logout: () => {},
};

interface AuthContextProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

const AuthContextProvider: FC<AuthContextProviderProps> = ({ children }) => {
  const [authToken, setAuthToken] = useState('');
  const [userID, setUserID] = useState('');

  const authenticate = useCallback((token: string, uid: string) => {
    setAuthToken(token);
    setUserID(uid);
    void save('token', token);
    void save('uid', uid);
  }, []);

  const logout = useCallback(() => {
    setAuthToken(null);
    setUserID(null);
    void AsyncStorage.removeItem('token');
    void AsyncStorage.removeItem('uid');
  }, []);

  const value = {
    token: authToken,
    uid: userID,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContextProvider, AuthContext };
