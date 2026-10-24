'use client';

import { useState } from 'react';
import { Palette, Check, Sparkles } from 'lucide-react';

export default function AdminThemePage() {
  const [activeTheme, setActiveTheme] = useState('ruby');
  const [toast, setToast] = useState<string | null>(null);

  const themes = [
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

  const handleSelect = (id: string, name: string) => {
    setActiveTheme(id);
    setToast(`Theme applied: ${name}`);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto pb-12">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-amber-300 border border-amber-500/40 px-5 py-3 rounded-2xl shadow-2xl text-xs font-bold">
          {toast}
        </div>
      )}

      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <Palette className="w-6 h-6 text-amber-400" />
          <span>Theme & Visual Styling</span>
        </h1>
        <p className="text-xs text-neutral-400 mt-1">
          Customize the color scheme and visual appearance of your Admin Portal and TV Display screens.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {themes.map(t => (
          <div
            key={t.id}
            onClick={() => handleSelect(t.id, t.name)}
            className={`bg-[#18181b] border-2 rounded-3xl p-6 flex flex-col justify-between cursor-pointer transition-all ${
              activeTheme === t.id
                ? 'border-amber-500 shadow-xl shadow-amber-950/30'
                : 'border-neutral-800 hover:border-neutral-700'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-extrabold text-sm text-white">{t.name}</span>
                {activeTheme === t.id && (
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-neutral-950 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed mb-4">{t.desc}</p>
            </div>

            <div className="flex gap-2 pt-4 border-t border-neutral-800">
              {t.colors.map((c, i) => (
                <div key={i} className={`h-8 flex-1 rounded-xl ${c} border border-white/10`} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
