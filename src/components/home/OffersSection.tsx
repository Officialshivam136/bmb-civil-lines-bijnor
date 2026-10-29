'use client';

import { useState } from 'react';
import { Tag, Check, Copy, Sparkles, Percent } from 'lucide-react';

const offers = [
  {
    code: 'BIJNOR10',
    discount: '10% OFF',
    description: 'Flat 10% discount on all authentic Mithai & Snacks for our patrons.',
    minOrder: 'No minimum order',
    highlight: true
  },
  {
    code: 'SWEET50',
    discount: '₹50 OFF',
    description: 'Instant ₹50 savings on any festive sweets or snack box orders.',
    minOrder: 'Min order ₹200',
    highlight: false
  },
  {
    code: 'PREMIUM10',
    discount: '10% VIP',
    description: 'Exclusive 10% discount on Pure Silver Vark Kaju Katli & 5-Star Laddus.',
    minOrder: 'Min order ₹400',
    highlight: false
  }
];

export default function OffersSection() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <section className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#f59e0b]/20 flex items-center justify-center text-[#d97706]">
            <Tag className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-foreground">
              Promotional Offers & Festive Coupons
            </h2>
            <p className="text-xs text-foreground/60">
              Apply at checkout or enjoy automatic 10% savings as a returning patron
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {offers.map((offer) => (
          <div
            key={offer.code}
            className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
              offer.highlight
                ? 'bg-gradient-to-br from-[#8c1824]/10 via-amber-500/5 to-surface dark:from-[#8c1824]/25 dark:via-amber-500/10 dark:to-surface border-[#8c1824]/30 shadow-sm'
                : 'bg-surface border-border shadow-sm'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-extrabold text-lg text-primary flex items-center gap-1">
                  <Percent className="w-4 h-4" /> {offer.discount}
                </span>
                <span className="text-[11px] font-semibold text-foreground/60 bg-border/40 px-2 py-0.5 rounded-full">
                  {offer.minOrder}
                </span>
              </div>
              <p className="text-xs text-foreground/75 leading-relaxed mb-4">
                {offer.description}
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-border/50">
              <span className="font-mono text-xs font-bold bg-[#8c1824]/10 dark:bg-[#8c1824]/30 text-[#8c1824] dark:text-[#fca5a5] px-2.5 py-1 rounded-md border border-dashed border-[#8c1824]/30 dark:border-[#8c1824]/50">
                {offer.code}
              </span>
              <button
                onClick={() => handleCopy(offer.code)}
                className="flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                {copiedCode === offer.code ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-600" />
                    <span className="text-green-600">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
