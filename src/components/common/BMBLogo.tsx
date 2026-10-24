import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export default function BMBLogo({ className = '', size = 'md', showSubtitle = true }: LogoProps) {
  const sizeMap = {
    sm: { box: 'w-8 h-8 text-xs', title: 'text-base', sub: 'text-[9px]' },
    md: { box: 'w-10 h-10 text-sm', title: 'text-lg', sub: 'text-[10px]' },
    lg: { box: 'w-14 h-14 text-lg', title: 'text-2xl', sub: 'text-xs' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`flex items-center gap-2.5 group select-none ${className}`}>
      {/* Royal Crest Monogram Icon */}
      <div
        className={`${currentSize.box} rounded-xl bg-gradient-to-br from-[#8c1824] via-[#700f19] to-[#450a0f] border border-[#f59e0b]/50 shadow-md flex items-center justify-center font-extrabold text-[#fcd34d] tracking-wider relative overflow-hidden transition-transform group-hover:scale-105 duration-200`}
      >
        {/* Subtle royal geometric accent */}
        <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:6px_6px] opacity-20 pointer-events-none" />
        <span className="relative z-10 font-serif drop-shadow-sm">BMB</span>
      </div>

      {/* Brand Name Typography */}
      {showSubtitle && (
        <div className="flex flex-col text-left leading-tight">
          <span className={`${currentSize.title} font-extrabold tracking-tight text-[#8c1824] group-hover:text-[#a01c2a] transition-colors`}>
            Bikaner Misthan Bhandar
          </span>
          <span className={`${currentSize.sub} font-semibold uppercase tracking-widest text-[#d97706]`}>
            Civil Lines, Bijnor • Estd.
          </span>
        </div>
      )}
    </div>
  );
}
