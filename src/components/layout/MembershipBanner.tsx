'use client';

import { useCart } from '@/context/CartContext';
import { usePathname } from 'next/navigation';
import { Crown, Sparkles, CheckCircle2, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function MembershipBanner() {
  const pathname = usePathname();
  const { isVipUser, monthlyOrderCount, vipThreshold } = useCart();

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <div className="w-full bg-linear-to-r from-[#2a080c] via-[#5c131a] to-[#2a080c] text-white py-2 px-4 text-xs md:text-sm border-b border-[#C5A059]/30">
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-full bg-[#f59e0b] text-[#7a121d] flex items-center justify-center font-bold shrink-0 shadow-xs">
            <Crown className="w-3.5 h-3.5" />
          </div>
          <div>
            {isVipUser ? (
              <span className="font-medium text-white/95">
                <strong className="text-[#fcd34d] font-bold">👑 BMB VIP Patron:</strong>{' '}
                You have ordered <strong className="text-white underline">{monthlyOrderCount} times</strong> in the past month! Automatic <span className="text-[#fcd34d] font-bold underline decoration-[#f59e0b]">10% VIP Discount</span> is active.
              </span>
            ) : monthlyOrderCount === 1 ? (
              <span className="font-medium text-white/95">
                <strong className="text-[#fcd34d] font-bold">⭐ 1/2 Orders This Month:</strong>{' '}
                Order just 1 more time this month to achieve <span className="text-[#fcd34d] font-bold">VIP Patron</span> status with flat 10% OFF!
              </span>
            ) : (
              <span className="font-medium text-white/95">
                <strong className="text-[#fcd34d] font-bold">BMB Patron Rewards:</strong>{' '}
                Order twice or thrice in a month to unlock <span className="text-[#fcd34d] font-bold">VIP Patron</span> status with flat 10% OFF on all sweets!
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {isVipUser ? (
            <div className="inline-flex items-center gap-1.5 bg-[#f59e0b]/20 text-[#fcd34d] px-3 py-0.5 rounded-full text-[11px] font-bold border border-[#f59e0b]/40">
              <Sparkles className="w-3 h-3 text-[#fcd34d]" />
              <span>VIP Privilege Active</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-0.5 rounded-full text-[11px] font-medium text-white/80">
              <TrendingUp className="w-3 h-3 text-amber-400" />
              <span>{monthlyOrderCount}/{vipThreshold} Monthly Orders</span>
              <Link href="/#menu" className="text-amber-300 font-bold hover:underline ml-1">
                Browse Menu →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
