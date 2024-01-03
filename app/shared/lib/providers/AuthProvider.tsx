import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useState } from 'react';

import { save } from '../utils/asyncMethods';

import type { FC, ReactNode } from 'react';

interface AuthContextType {
  token: string;
  uid: string;
  isGuest: boolean;
  isAuthenticated: boolean;
  authenticate: (arg0: string, arg1: string, arg2: boolean) => void;
  logout: () => void;
}

const defaultAuthContext: AuthContextType = {
  token: '',
  uid: '',
  isGuest: false,
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
  const [isGuest, setIsGuest] = useState(false);

  const authenticate = useCallback((token: string, uid: string, isGuest: boolean) => {
    setAuthToken(token);
    setUserID(uid);
    setIsGuest(isGuest);
    void save('isGuest', isGuest);
    void save('token', token);
    void save('uid', uid);
  }, []);

  const logout = useCallback(() => {
    setAuthToken(null);
    setUserID(null);
    setIsGuest(false);
    void AsyncStorage.removeItem('isGuest');
    void AsyncStorage.removeItem('token');
    void AsyncStorage.removeItem('uid');
  }, []);

  const value = {
    token: authToken,
    uid: userID,
    isGuest,
    isAuthenticated: !!authToken,
    authenticate,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContextProvider, AuthContext };
