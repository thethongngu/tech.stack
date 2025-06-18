'use client';

import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggleButton: React.FC = () => {
  const { theme, setTheme } = useTheme();

  // If the theme is not yet determined (e.g. during initial client render before useEffect in ThemeProvider runs),
  // we can choose to render nothing or a placeholder.
  // useTheme() will throw an error if context is undefined, but ThemeProvider itself returns null until theme is set,
  // so this component should not render until theme is available.
  // However, an explicit check can be added if needed, though it might be redundant.
  // if (!theme) return null; // Or a placeholder button

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      className="p-2 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors duration-200"
    >
      {theme === 'light' ? (
        <Moon className="h-5 w-5 text-zinc-800 dark:text-zinc-200" />
      ) : (
        <Sun className="h-5 w-5 text-zinc-800 dark:text-zinc-200" />
      )}
    </button>
  );
};
