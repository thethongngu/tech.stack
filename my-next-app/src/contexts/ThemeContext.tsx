'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// 1. Define Theme type
export type Theme = 'light' | 'dark';

// 2. Define ThemeContextProps interface
export interface ThemeContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

// 3. Create ThemeContext
const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

// 4. Create ThemeProvider component
interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme | undefined>(undefined);

  useEffect(() => {
    // Determine initial theme only on client-side
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) {
      setThemeState(savedTheme);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setThemeState(prefersDark ? 'dark' : 'light');
    }
  }, []);

  useEffect(() => {
    // Apply theme to <html> element and save to localStorage
    if (theme) {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  // Prevent rendering children until theme is determined to avoid flash of unstyled content (FOUC)
  // or hydration mismatch.
  if (theme === undefined) {
    return null; // Or a loading spinner, or a default non-themed layout shell
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 5. Create useTheme custom hook
export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
