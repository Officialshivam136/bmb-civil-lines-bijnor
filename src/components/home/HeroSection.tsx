'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  shopName: string;
}

export default function HeroSection({ shopName }: HeroSectionProps) {
  return (
    <section className="relative min-h-[520px] md:min-h-[580px] flex items-center justify-center bg-gradient-to-br from-[#7a121d] via-[#8c1824] to-[#5a0c14] text-white py-20 px-4 text-center overflow-hidden">
      {/* Decorative Warm Glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#d97706]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#b45309]/20 rounded-full blur-3xl pointer-events-none" />

      {/* Subtle Pattern Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 bg-[#f59e0b]/20 border border-[#f59e0b]/40 text-[#fef3c7] px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold tracking-wide uppercase shadow-sm backdrop-blur-sm"
        >
          <Sparkles className="w-4 h-4 text-[#f59e0b]" />
          <span>Authentic Desi Ghee Mithai Since Generations</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.15]"
        >
          Fresh Mithai & Snacks, <br className="hidden sm:inline" />
          <span className="text-[#fcd34d] underline decoration-[#f59e0b]/50 decoration-wavy decoration-2">
            Delivered in Bijnor
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-light leading-relaxed"
        >
          Order authentic Kaju Katli, Desi Ghee Jalebi, Motichoor Laddus & crispy hot samosas from{' '}
          <strong className="font-semibold text-white">{shopName}</strong>, Civil Lines, Bijnor.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-4"
        >
          <Link
            href="#menu"
            className="group flex items-center gap-2 bg-[#d97706] hover:bg-[#b45309] text-white font-bold px-8 py-4 rounded-full transition-all shadow-xl hover:shadow-amber-900/30 transform hover:-translate-y-0.5"
          >
            <span>ORDER ONLINE NOW</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/menu"
            className="bg-white/10 hover:bg-white/20 backdrop-blur-md font-semibold px-8 py-4 rounded-full transition-all border border-white/25 text-white"
          >
            VIEW COMPLETE MENU
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
