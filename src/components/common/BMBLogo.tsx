'use client';

import React, { useState, useRef } from 'react';
import { Crown, Sparkles } from 'lucide-react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  forceLight?: boolean;
}

export default function BMBLogo({
  className = '',
  size = 'md',
  showSubtitle = true,
  forceLight = false
}: LogoProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle interactive 3D mouse tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 28; // max tilt degrees
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -28;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: 0, y: 0 });
  };

  const sizeMap = {
    sm: {
      box: 'w-9 h-9',
      crown: 'w-2.5 h-2.5',
      bmbText: 'text-xs',
      title: 'text-sm sm:text-base font-extrabold',
      sub: 'text-[9px]',
      sparkle: 'w-2.5 h-2.5'
    },
    md: {
      box: 'w-11 h-11',
      crown: 'w-3.5 h-3.5',
      bmbText: 'text-sm font-black',
      title: 'text-base sm:text-lg font-black',
      sub: 'text-[10px]',
      sparkle: 'w-3 h-3'
    },
    lg: {
      box: 'w-16 h-16',
      crown: 'w-5 h-5',
      bmbText: 'text-xl font-black',
      title: 'text-xl sm:text-2xl font-black',
      sub: 'text-xs',
      sparkle: 'w-4 h-4'
    },
  };

  const currentSize = sizeMap[size];

  // Dynamic 3D transform style
  const tiltTransform = isHovered
    ? `rotateY(${mousePos.x}deg) rotateX(${mousePos.y}deg) scale3d(1.08, 1.08, 1.08)`
    : undefined;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`inline-flex items-center gap-3 group select-none cursor-pointer ${className}`}
      style={{ perspective: '1000px' }}
    >
      {/* 3D Animated Royal Medallion */}
      <div
        className={`relative ${currentSize.box} shrink-0 transition-transform duration-200 ease-out`}
        style={{
          transformStyle: 'preserve-3d',
          transform: tiltTransform,
        }}
      >
        {/* Floating Ambient Glow */}
        <div
          className={`absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 opacity-40 blur-md transition-opacity duration-300 ${
            isHovered ? 'opacity-80 scale-110' : 'animate-pulse'
          }`}
        />

        {/* Outer 3D Beveled Golden Rim */}
        <div
          className="relative w-full h-full rounded-2xl p-[2.5px] shadow-2xl transition-all duration-300 overflow-hidden bg-[#B78103]"
          style={{
            backgroundColor: '#B78103',
            background: 'linear-gradient(135deg, #FFE082 0%, #FFB300 30%, #B78103 60%, #FFF9C4 85%, #6D4C41 100%)',
            boxShadow: isHovered
              ? '0 12px 28px -4px rgba(183, 129, 3, 0.6), 0 4px 10px rgba(0,0,0,0.3), inset 0 2px 2px rgba(255,255,255,0.9), inset 0 -2px 3px rgba(0,0,0,0.5)'
              : '0 8px 18px -3px rgba(183, 129, 3, 0.45), 0 3px 6px rgba(0,0,0,0.25), inset 0 1.5px 1.5px rgba(255,255,255,0.8), inset 0 -1.5px 2px rgba(0,0,0,0.4)',
          }}
        >
          {/* Inner Deep Royal Ruby Core */}
          <div
            className="w-full h-full rounded-[13px] flex flex-col items-center justify-center relative overflow-hidden bg-[#700f19]"
            style={{
              backgroundColor: '#700f19',
              background: 'radial-gradient(circle at 35% 30%, #9b1c28 0%, #700f19 50%, #3e070c 100%)',
              border: '1px solid rgba(255, 224, 130, 0.4)',
            }}
          >
            {/* Traditional Indian Sacred Mandala Radial Watermark */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(#FFE082 1px, transparent 1px)',
                backgroundSize: '5px 5px',
              }}
            />

            {/* Continuous Specular Light Reflection Sweep (3D Sheen) */}
            <div
              className="absolute inset-0 pointer-events-none opacity-40 z-20"
              style={{
                background: 'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.8) 50%, transparent 80%)',
                animation: 'bmb-specular-sweep 3.6s infinite ease-in-out',
                transform: 'translateX(-120%) skewX(-20deg)',
              }}
            />

            {/* 3D Elevated Golden Crown */}
            <div
              className="relative z-10 -mb-0.5 transform transition-transform duration-300 drop-shadow-md"
              style={{
                transform: 'translateZ(14px)',
              }}
            >
              <Crown className={`${currentSize.crown} text-[#FFE082] fill-[#FFD54F]/70 animate-bounce`} style={{ animationDuration: '3s' }} />
            </div>

            {/* 3D Embossed Gold "BMB" Typography */}
            <span
              className={`relative z-10 font-serif ${currentSize.bmbText} tracking-wider font-black select-none text-[#FFF8E1]`}
              style={{
                transform: 'translateZ(20px)',
                textShadow: `
                  0 1px 0 #FFE082,
                  0 2px 0 #FFB300,
                  0 3px 0 #B78103,
                  0 4px 6px rgba(0, 0, 0, 0.6)
                `,
              }}
            >
              BMB
            </span>

            {/* Floating Sparkle Micro-Star */}
            <div
              className={`absolute top-1 right-1 z-25 text-amber-300 transition-opacity duration-300 ${
                isHovered ? 'opacity-100 scale-125' : 'opacity-70'
              }`}
            >
              <Sparkles className={`${currentSize.sparkle} animate-spin`} style={{ animationDuration: '8s' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Brand Name & Heritage Typography */}
      {showSubtitle && (
        <div className="flex flex-col text-left leading-tight">
          <div className="flex items-center gap-1.5">
            <span
              className={`${currentSize.title} tracking-tight font-serif transition-colors font-black ${
                forceLight
                  ? 'text-[#700f19] hover:text-[#8c1824]'
                  : 'text-[#700f19] dark:text-[#F59E0B] hover:text-[#8c1824] dark:hover:text-[#FBBF24]'
              }`}
              style={forceLight ? { color: '#700f19', WebkitTextFillColor: '#700f19' } : undefined}
            >
              Bikaner Misthan Bhandar
            </span>
            <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
          </div>

          <div className="flex items-center gap-1.5 mt-0.5">
            <span
              className={`${currentSize.sub} font-bold uppercase tracking-widest transition-colors flex items-center gap-1 ${
                forceLight
                  ? 'text-[#B78103] hover:text-amber-700'
                  : 'text-[#B78103] dark:text-amber-300 hover:text-amber-700 dark:hover:text-amber-200'
              }`}
              style={forceLight ? { color: '#B78103', WebkitTextFillColor: '#B78103' } : undefined}
            >
              <span>Civil Lines, Bijnor</span>
              <span>•</span>
              <span
                className={`font-black ${
                  forceLight
                    ? 'text-[#700f19]'
                    : 'text-[#700f19] dark:text-amber-400'
                }`}
                style={forceLight ? { color: '#700f19', WebkitTextFillColor: '#700f19' } : undefined}
              >
                Established 1995
              </span>
            </span>
          </div>
        </div>
      )}

      {/* Embedded CSS Keyframes for Specular Sweep and Breathing Float */}
      <style jsx>{`
        @keyframes bmb-specular-sweep {
          0% {
            transform: translateX(-150%) skewX(-25deg);
          }
          35%, 100% {
            transform: translateX(180%) skewX(-25deg);
          }
        }
      `}</style>
    </div>
  );
}
