'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Laptop, Check, ChevronDown } from 'lucide-react';
import { useTheme, ThemeMode } from '@/context/ThemeContext';

interface ThemeToggleProps {
  variant?: 'compact' | 'dropdown' | 'card';
  className?: string;
}

export default function ThemeToggle({ variant = 'compact', className = '' }: ThemeToggleProps) {
  const { theme, resolvedTheme, setTheme, toggleTheme, mounted } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!mounted) {
    // Avoid hydration mismatch by rendering a stable placeholder
    return (
      <div className={`w-9 h-9 rounded-full bg-foreground/5 animate-pulse ${className}`} />
    );
  }

  // Card Variant: For Account / Settings Page where user can configure preferences in detail
  if (variant === 'card') {
    const options: { id: ThemeMode; label: string; desc: string; icon: typeof Sun }[] = [
      {
        id: 'light',
        label: 'Light Heritage',
        desc: 'Traditional ivory cream with pure desi ghee warmth',
        icon: Sun,
      },
      {
        id: 'dark',
        label: 'Regal Dark',
        desc: 'Royal obsidian velvet with radiant ruby and gold accents',
        icon: Moon,
      },
      {
        id: 'system',
        label: 'System Match',
        desc: 'Automatically synchronizes with your device or OS setting',
        icon: Laptop,
      },
    ];

    return (
      <div className={`space-y-3 ${className}`}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {options.map((opt) => {
            const Icon = opt.icon;
            const isSelected = theme === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setTheme(opt.id)}
                className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer relative ${
                  isSelected
                    ? 'border-primary bg-primary/10 shadow-sm ring-2 ring-primary/20'
                    : 'border-border bg-surface hover:border-primary/40'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    isSelected ? 'bg-primary text-white' : 'bg-foreground/5 text-foreground/80'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  {isSelected && (
                    <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-[10px] font-bold">
                      <Check className="w-3 h-3" />
                    </span>
                  )}
                </div>
                <div>
                  <h4 className={`text-sm font-bold ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                    {opt.label}
                  </h4>
                  <p className="text-[11px] text-foreground/60 mt-1 leading-snug">
                    {opt.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Header Compact / Dropdown Variant
  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <div className="flex items-center">
        <button
          type="button"
          onClick={toggleTheme}
          title={`Switch to ${resolvedTheme === 'dark' ? 'Light' : 'Dark'} mode`}
          aria-label="Toggle theme"
          className="w-9 h-9 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center text-foreground hover:text-primary transition-all cursor-pointer relative"
        >
          {resolvedTheme === 'dark' ? (
            <Moon className="w-4 h-4 text-amber-300 transform transition-transform rotate-0 duration-300" />
          ) : (
            <Sun className="w-4 h-4 text-amber-600 transform transition-transform rotate-0 duration-300" />
          )}
        </button>

        {/* Dropdown open trigger for configuration */}
        <button
          type="button"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          title="Configure Theme (Light / Dark / System)"
          aria-label="Theme options"
          className="p-1 -ml-1 text-foreground/60 hover:text-primary transition-colors cursor-pointer"
        >
          <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-surface border border-border rounded-2xl shadow-xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-foreground/50 border-b border-border/50">
            Appearance
          </div>

          <button
            type="button"
            onClick={() => {
              setTheme('light');
              setDropdownOpen(false);
            }}
            className={`w-full px-3 py-2 text-xs flex items-center justify-between text-left transition-colors cursor-pointer ${
              theme === 'light'
                ? 'bg-primary/10 text-primary font-bold'
                : 'text-foreground hover:bg-foreground/5'
            }`}
          >
            <div className="flex items-center gap-2">
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              <span>Light Mode</span>
            </div>
            {theme === 'light' && <Check className="w-3.5 h-3.5 text-primary" />}
          </button>

          <button
            type="button"
            onClick={() => {
              setTheme('dark');
              setDropdownOpen(false);
            }}
            className={`w-full px-3 py-2 text-xs flex items-center justify-between text-left transition-colors cursor-pointer ${
              theme === 'dark'
                ? 'bg-primary/10 text-primary font-bold'
                : 'text-foreground hover:bg-foreground/5'
            }`}
          >
            <div className="flex items-center gap-2">
              <Moon className="w-3.5 h-3.5 text-amber-300" />
              <span>Dark Mode</span>
            </div>
            {theme === 'dark' && <Check className="w-3.5 h-3.5 text-primary" />}
          </button>

          <button
            type="button"
            onClick={() => {
              setTheme('system');
              setDropdownOpen(false);
            }}
            className={`w-full px-3 py-2 text-xs flex items-center justify-between text-left transition-colors cursor-pointer ${
              theme === 'system'
                ? 'bg-primary/10 text-primary font-bold'
                : 'text-foreground hover:bg-foreground/5'
            }`}
          >
            <div className="flex items-center gap-2">
              <Laptop className="w-3.5 h-3.5 text-foreground/70" />
              <span>Device System</span>
            </div>
            {theme === 'system' && <Check className="w-3.5 h-3.5 text-primary" />}
          </button>
        </div>
      )}
    </div>
  );
}
