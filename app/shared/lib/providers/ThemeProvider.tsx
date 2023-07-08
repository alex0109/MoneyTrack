/* eslint-disable no-unused-vars */
import React, { createContext, useState, useEffect, useCallback } from 'react';

import { save, get } from '../utils/asyncMethods';

import type { ReactNode } from 'react';

interface ThemeContextType {
  theme: string;
  themeIndex: number;
  changeTheme: (newTheme: string, newIndex: number) => void;
}

const defaultThemeContext: ThemeContextType = {
  theme: 'default',
  themeIndex: 3,
  changeTheme: () => {},
};

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeContext = createContext<ThemeContextType>(defaultThemeContext);

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<string>('default');
  const [themeIndex, setThemeIndex] = useState<number>(3);

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
