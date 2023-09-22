/* eslint-disable no-unused-vars */
import React, { createContext, useState, useEffect, useCallback } from 'react';

import { storage } from '../store/mmkv';

import type { FC, ReactNode } from 'react';

interface ThemeContextType {
  theme: string;
  themeIndex: number;
  changeTheme: (newTheme: string, newIndex: number) => void;
}

const defaultThemeContext: ThemeContextType = {
  theme: 'light',
  themeIndex: 2,
  changeTheme: () => {},
};

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeContext = createContext<ThemeContextType>(defaultThemeContext);

const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<string>('light');
  const [themeIndex, setThemeIndex] = useState<number>(2);

  const saveTheme = useCallback((themeValue: string) => {
    storage.set('Theme', themeValue);
  }, []);

  const saveThemeIndex = useCallback((index: number) => {
    storage.set('ThemeIndex', String(index));
  }, []);

  const getTheme = useCallback(() => {
    const savedTheme = storage.getString('Theme');
    const savedThemeIndex = storage.getString('ThemeIndex');
    if (savedTheme) {
      setTheme(savedTheme);
    }
    if (savedThemeIndex) {
      setThemeIndex(Number(savedThemeIndex));
    }
  }, []);

  useEffect(() => {
    void getTheme();
  }, [getTheme]);

  const changeTheme = useCallback(
    (newTheme: string, newIndex: number) => {
      setTheme(newTheme);
      setThemeIndex(newIndex);
      saveTheme(newTheme);
      saveThemeIndex(newIndex);
    },
    [saveTheme, saveThemeIndex]
  );

  const contextValue = {
    theme,
    themeIndex,
    changeTheme,
  };

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};

export { ThemeContext, ThemeProvider };
