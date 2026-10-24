'use client';

import { useState } from 'react';
import { Palette, Check, Sun, Moon, Sparkles, Monitor, Eye } from 'lucide-react';
import { useAdminTheme, AdminThemeMode } from '@/context/AdminThemeContext';

export default function AdminThemePage() {
  const { theme, setTheme } = useAdminTheme();
  const [activePalette, setActivePalette] = useState('ruby');
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const palettes = [
    {
      id: 'ruby',
      name: 'Royal Ruby Velvet (BMB Signature)',
      desc: 'Deep crimson maroon (#5c0f19) paired with rich imperial gold accents, matching the traditional sweetshop aesthetics of Bikaner Misthan Bhandar.',
      colors: ['bg-[#5c0f19]', 'bg-[#8c1824]', 'bg-[#E5C158]', 'bg-[#18181b]']
    },
    {
      id: 'charcoal',
      name: 'Midnight Velvet & Amber',
      desc: 'High-contrast dark obsidian black (#111113) with neon amber and emerald indicators for kitchen and night operations.',
      colors: ['bg-[#111113]', 'bg-[#242429]', 'bg-[#f59e0b]', 'bg-[#10b981]']
    },
    {
      id: 'gold',
      name: 'Imperial Rajasthan Gold',
      desc: 'Warm metallic brass gold and deep brown palette inspired by classic Bikaner heritage royal courts.',
      colors: ['bg-[#78350f]', 'bg-[#b45309]', 'bg-[#fbbf24]', 'bg-[#1c1917]']
    }
  ];

  const handleModeChange = (mode: AdminThemeMode) => {
    setTheme(mode);
    showToast(`Admin theme set to ${mode === 'dark' ? 'Dark Obsidian' : 'Royal Ivory Light'} Mode`);
  };

  return (
    <div className="space-y-8 max-w-[1200px] mx-auto pb-12">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-amber-300 border border-amber-500/40 px-5 py-3 rounded-2xl shadow-2xl text-xs font-bold animate-in slide-in-from-bottom">
          {toast}
        </div>
      )}

      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold flex items-center gap-2">
          <Palette className="w-6 h-6 text-amber-500" />
          <span>Theme & Appearance Settings</span>
        </h1>
        <p className="text-xs text-neutral-400 mt-1">
          Customize the appearance of your Admin Portal workspace, contrast themes, and visual presets.
        </p>
      </div>

      {/* SECTION 1: DARK / LIGHT MODE SWITCHER */}
      <div className="space-y-4">
        <div>
          <h2 className="text-sm font-extrabold tracking-wide uppercase flex items-center gap-2">
            <Eye className="w-4 h-4 text-amber-500" />
            <span>Appearance Mode</span>
          </h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Choose between dark mode for low-light sweetshop counters or clean high-contrast light mode for daytime billing.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* DARK MODE CARD */}
          <div
            onClick={() => handleModeChange('dark')}
            className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
              theme === 'dark'
                ? 'bg-[#18181b] border-amber-500 shadow-xl shadow-amber-950/20'
                : 'bg-white/5 border-neutral-700/50 hover:border-neutral-500'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-700 flex items-center justify-center text-amber-400">
                  <Moon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm">Obsidian Dark Mode</h3>
                  <span className="text-[11px] text-neutral-400">Standard for night shifts & low glare</span>
                </div>
              </div>
              {theme === 'dark' && (
                <span className="w-6 h-6 rounded-full bg-amber-500 text-neutral-950 flex items-center justify-center font-black">
                  <Check className="w-3.5 h-3.5" />
                </span>
              )}
            </div>

            {/* Dark Mode Mini Canvas Preview */}
            <div className="rounded-xl bg-[#111113] p-3 border border-neutral-800 space-y-2">
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-neutral-400 font-bold">Preview UI</span>
                <span className="text-emerald-400 font-bold">● Live Sync</span>
              </div>
              <div className="flex gap-2">
                <div className="flex-1 bg-[#18181b] p-2 rounded-lg border border-neutral-800">
                  <div className="w-8 h-2 bg-amber-500/80 rounded-sm mb-1" />
                  <div className="w-12 h-3 bg-neutral-700 rounded-sm" />
                </div>
                <div className="flex-1 bg-[#18181b] p-2 rounded-lg border border-neutral-800">
                  <div className="w-8 h-2 bg-emerald-500/80 rounded-sm mb-1" />
                  <div className="w-12 h-3 bg-neutral-700 rounded-sm" />
                </div>
              </div>
            </div>
          </div>

          {/* LIGHT MODE CARD */}
          <div
            onClick={() => handleModeChange('light')}
            className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
              theme === 'light'
                ? 'bg-amber-50/10 border-amber-600 shadow-xl shadow-amber-600/10'
                : 'bg-white/5 border-neutral-700/50 hover:border-neutral-500'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700">
                  <Sun className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm">Royal Ivory Light Mode</h3>
                  <span className="text-[11px] text-neutral-400">Crisp high daylight readability & print</span>
                </div>
              </div>
              {theme === 'light' && (
                <span className="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center font-black">
                  <Check className="w-3.5 h-3.5" />
                </span>
              )}
            </div>

            {/* Light Mode Mini Canvas Preview */}
            <div className="rounded-xl bg-[#f8f6f0] p-3 border border-stone-300 space-y-2">
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-stone-600 font-bold">Preview UI</span>
                <span className="text-emerald-700 font-bold">● Live Sync</span>
              </div>
              <div className="flex gap-2">
                <div className="flex-1 bg-white p-2 rounded-lg border border-stone-200">
                  <div className="w-8 h-2 bg-amber-600/80 rounded-sm mb-1" />
                  <div className="w-12 h-3 bg-stone-300 rounded-sm" />
                </div>
                <div className="flex-1 bg-white p-2 rounded-lg border border-stone-200">
                  <div className="w-8 h-2 bg-emerald-600/80 rounded-sm mb-1" />
                  <div className="w-12 h-3 bg-stone-300 rounded-sm" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: BRANDING PALETTES */}
      <div className="space-y-4 pt-4 border-t border-neutral-800">
        <div>
          <h2 className="text-sm font-extrabold tracking-wide uppercase flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Heritage Brand Palettes</span>
          </h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Fine-tune the brand accents for Bikaner Misthan Bhandar sidebar, badges, and headers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {palettes.map(p => (
            <div
              key={p.id}
              onClick={() => {
                setActivePalette(p.id);
                showToast(`Applied ${p.name}`);
              }}
              className={`border-2 rounded-3xl p-6 flex flex-col justify-between cursor-pointer transition-all ${
                activePalette === p.id
                  ? 'border-amber-500 shadow-xl shadow-amber-950/20'
                  : 'border-neutral-800 hover:border-neutral-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-extrabold text-sm">{p.name}</span>
                  {activePalette === p.id && (
                    <span className="w-6 h-6 rounded-full bg-amber-500 text-neutral-950 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed mb-4">{p.desc}</p>
              </div>

              <div className="flex gap-2 pt-4 border-t border-neutral-800">
                {p.colors.map((c, i) => (
                  <div key={i} className={`h-8 flex-1 rounded-xl ${c} border border-white/10`} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
