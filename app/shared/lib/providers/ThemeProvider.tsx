/* eslint-disable no-unused-vars */
import React, { createContext, useState, useEffect, useCallback } from 'react';

import { save, get } from '../utils/asyncMethods';

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

  const saveTheme = useCallback(async (themeValue: string) => {
    await save('Theme', themeValue);
  }, []);

  const saveThemeIndex = useCallback(async (index: number) => {
    await save('ThemeIndex', String(index));
  }, []);

  const getTheme = useCallback(async () => {
    const savedTheme = await get<string>('Theme');
    const savedThemeIndex = await get<string>('ThemeIndex');
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
    async (newTheme: string, newIndex: number) => {
      setTheme(newTheme);
      setThemeIndex(newIndex);
      await saveTheme(newTheme);
      await saveThemeIndex(newIndex);
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
