'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type AdminThemeMode = 'dark' | 'light';

interface AdminThemeContextType {
  theme: AdminThemeMode;
  toggleTheme: () => void;
  setTheme: (mode: AdminThemeMode) => void;
}

const AdminThemeContext = createContext<AdminThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
  setTheme: () => {}
});

export function AdminThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<AdminThemeMode>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('bmb_admin_theme') as AdminThemeMode;
      if (saved === 'light' || saved === 'dark') {
        setThemeState(saved);
      }
    } catch (e) {
      console.warn('Could not read admin theme from localStorage:', e);
    }
    setMounted(true);
  }, []);

  const setTheme = (mode: AdminThemeMode) => {
    setThemeState(mode);
    try {
      localStorage.setItem('bmb_admin_theme', mode);
    } catch (e) {
      console.warn('Could not save admin theme to localStorage:', e);
    }
  };

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
  };

  return (
    <AdminThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      <div 
        className={`min-h-screen transition-colors duration-200 ${
          theme === 'dark' ? 'admin-theme-dark bg-[#111113] text-neutral-100' : 'admin-theme-light bg-[#f8f6f0] text-stone-900'
        }`}
      >
        {children}
      </div>
    </AdminThemeContext.Provider>
  );
}

export function useAdminTheme() {
  return useContext(AdminThemeContext);
}
