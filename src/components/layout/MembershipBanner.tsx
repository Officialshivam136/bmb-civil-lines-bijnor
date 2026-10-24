'use client';

import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { Crown, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function MembershipBanner() {
  const { isReturningCustomer, isClubMember, joinClubMembership } = useCart();
  const [joinedToast, setJoinedToast] = useState(false);

  const handleJoin = () => {
    joinClubMembership();
    setJoinedToast(true);
    setTimeout(() => setJoinedToast(false), 3500);
  };

  return (
    <div className="w-full bg-gradient-to-r from-[#2a080c] via-[#5c131a] to-[#2a080c] text-white py-2.5 px-4 text-xs md:text-sm border-b border-[#f59e0b]/30">
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#f59e0b] text-[#7a121d] flex items-center justify-center font-bold shrink-0">
            <Crown className="w-3.5 h-3.5" />
          </div>
          <div>
            {isReturningCustomer || isClubMember ? (
              <span className="font-medium text-white/95">
                <strong className="text-[#fcd34d] font-bold">Welcome Back, Esteemed Patron!</strong>{' '}
                Your <span className="underline decoration-[#f59e0b]">10% Privilege Discount</span> is active on all orders today.
              </span>
            ) : (
              <span className="font-medium text-white/95">
                <strong className="text-[#fcd34d] font-bold">Bikaner Elite Club:</strong>{' '}
                Returning patrons & members get flat <span className="text-[#fcd34d] font-bold">10% OFF</span> on every order!
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {!(isReturningCustomer || isClubMember) ? (
            <button
              onClick={handleJoin}
              className="bg-[#f59e0b] hover:bg-[#d97706] text-[#7a121d] font-bold px-3 py-1 rounded-full text-xs transition-transform transform active:scale-95 shadow-sm"
            >
              Claim 10% Discount
            </button>
          ) : (
            <span className="inline-flex items-center gap-1 bg-[#f59e0b]/20 border border-[#f59e0b]/40 text-[#fcd34d] px-2.5 py-0.5 rounded-full text-[11px] font-semibold">
              <CheckCircle2 className="w-3 h-3 text-[#f59e0b]" /> 10% Active VIP Member
            </span>
          )}

          {joinedToast && (
            <motion.span
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-[#fcd34d] font-bold"
            >
              🎉 VIP Membership Activated!
            </motion.span>
          )}
        </div>
      </div>
    </div>
  );
}
