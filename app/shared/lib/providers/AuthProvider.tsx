import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useState } from 'react';

import { save } from '../utils/asyncMethods';

import type { FC, ReactNode } from 'react';

interface AuthContextType {
  token: string;
  isAuthenticated: boolean;
  authenticate: (arg0: string) => void;
  logout: () => void;
}

const defaultAuthContext: AuthContextType = {
  token: '',
  isAuthenticated: false,
  authenticate: () => {},
  logout: () => {},
};

interface AuthContextProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

const AuthContextProvider: FC<AuthContextProviderProps> = ({ children }) => {
  const [authToken, setAuthToken] = useState();

  const authenticate = (token) => {
    setAuthToken(token);
    void save('token', token);
  };

  const logout = () => {
    setAuthToken(null);
    void AsyncStorage.removeItem('token');
  };

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContextProvider, AuthContext };
