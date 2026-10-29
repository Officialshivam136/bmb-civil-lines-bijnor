'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: ThemeMode;
  resolvedTheme: 'light' | 'dark';
  setTheme: (mode: ThemeMode) => void;
  toggleTheme: () => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'system',
  resolvedTheme: 'light',
  setTheme: () => {},
  toggleTheme: () => {},
  mounted: false,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  // Initialize theme from localStorage or system on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('bmb_theme') as ThemeMode;
      if (saved === 'light' || saved === 'dark' || saved === 'system') {
        setThemeState(saved);
      }
    } catch (e) {
      console.warn('Could not read theme from localStorage:', e);
    }
    setMounted(true);
  }, []);

  // Update resolvedTheme and document classes whenever theme changes or system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const computeResolvedTheme = (mode: ThemeMode): 'light' | 'dark' => {
      if (mode === 'dark') return 'dark';
      if (mode === 'light') return 'light';
      return mediaQuery.matches ? 'dark' : 'light';
    };

    const resolved = computeResolvedTheme(theme);
    setResolvedTheme(resolved);

    const root = document.documentElement;
    if (resolved === 'dark') {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
      root.style.colorScheme = 'light';
    }

    const handleChange = () => {
      if (theme === 'system') {
        const nextResolved = mediaQuery.matches ? 'dark' : 'light';
        setResolvedTheme(nextResolved);
        if (nextResolved === 'dark') {
          root.classList.add('dark');
          root.setAttribute('data-theme', 'dark');
          root.style.colorScheme = 'dark';
        } else {
          root.classList.remove('dark');
          root.setAttribute('data-theme', 'light');
          root.style.colorScheme = 'light';
        }
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  const setTheme = (mode: ThemeMode) => {
    setThemeState(mode);
    try {
      localStorage.setItem('bmb_theme', mode);
    } catch (e) {
      console.warn('Could not save theme to localStorage:', e);
    }
  };

  const toggleTheme = () => {
    // If currently dark (either explicitly or via system), switch to light. Otherwise dark.
    const next = resolvedTheme === 'dark' ? 'light' : 'dark';
    setTheme(next);
  };

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
