'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowRight, Sparkles, Star, ShoppingBag, Plus, Minus, 
  Check, Flame, ShieldCheck, Truck, QrCode, Clock 
} from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface HeroSectionProps {
  shopName: string;
}

interface HeroSweet {
  id: string;
  productId: string;
  variantId: string;
  name: string;
  tagline: string;
  description: string;
  weight: string;
  price: number;
  badge: string;
  badgeIcon: string;
  image: string;
  categoryTag: string;
}

const HERO_SWEETS: HeroSweet[] = [
  {
    id: 'samosa_hero',
    productId: 'cmvlvxky10009q005r35ossp2',
    variantId: 'cmvlwqxpy0003pjq5gi2gmfs9',
    name: 'Desi Samosa',
    tagline: 'Crisp, flaky crust stuffed with spicy potato & green peas',
    description: 'Served piping hot with tangy tamarind saunth & refreshing fresh mint chutney.',
    weight: '1 piece',
    price: 22,
    badge: 'Frying Fresh Every 30 Mins',
    badgeIcon: '🔥',
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c4/Samosas%2C_snack_food_at_Wikipedia%27s_16th_Birthday_celebration_in_Chittagong_%2801%29.jpg/960px-Samosas%2C_snack_food_at_Wikipedia%27s_16th_Birthday_celebration_in_Chittagong_%2801%29.jpg',
    categoryTag: 'Snacks & Chaat'
  },
  {
    id: 'kaju_hero',
    productId: 'cmvlwqy32004jpjq5alrhy81s',
    variantId: 'cmvlwqy36004lpjq545nghs2g',
    name: 'Kaju Katli (Pure Silver Vark)',
    tagline: 'Melt-in-mouth diamond cuts made from 100% Goan cashews',
    description: 'Delicately crowned with certified pure edible silver foil. Low sugar, intense cashew aroma.',
    weight: '250g',
    price: 280,
    badge: 'Royal Bijnor Bestseller',
    badgeIcon: '👑',
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ac/Kaju_katli_sweet.jpg/960px-Kaju_katli_sweet.jpg',
    categoryTag: 'Kaju & Dry Fruits'
  },
  {
    id: 'jalebi_hero',
    productId: 'cmvlwqxua001hpjq51i23z4q8',
    variantId: 'cmvlwqxuf001jpjq5trtaujkp',
    name: 'Desi Ghee Jalebi',
    tagline: 'Crispy spiral rings dipped in saffron-infused syrup',
    description: 'Deep-fried in pure desi ghee until blistered golden, soaking warm aromatic kesar chashni.',
    weight: '250g',
    price: 81,
    badge: 'Morning Hot Special',
    badgeIcon: '🍯',
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/96/Basavanagudi_Kadalekai_Parishe_%282025%29_Bangalore_%2886%29.jpg/960px-Basavanagudi_Kadalekai_Parishe_%282025%29_Bangalore_%2886%29.jpg',
    categoryTag: 'Traditional Mithai'
  },
  {
    id: 'laddu_hero',
    productId: 'cmvlwqybb0081pjq50hyh1z1c',
    variantId: 'cmvlwqybg0083pjq5t8e9zivl',
    name: '5 Star Laddu',
    tagline: 'Imperial festive laddu loaded with pistachios, almonds & saffron',
    description: 'Hand-rolled in pure country ghee with premium roasted dry fruits for celebrations & pooja.',
    weight: '250g',
    price: 430,
    badge: 'Celebration Masterpiece',
    badgeIcon: '⭐',
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c1/Laddu_Sweet.JPG/960px-Laddu_Sweet.JPG',
    categoryTag: 'Laddu'
  }
];

export default function HeroSection({ shopName }: HeroSectionProps) {
  const { addToCart } = useCart();
  const [activeIdx, setActiveIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const currentSweet = HERO_SWEETS[activeIdx];

  // Auto-rotate every 5 seconds unless user hovers
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % HERO_SWEETS.length);
      setQuantity(1);
      setIsAdded(false);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handleSelectSweet = (index: number) => {
    setActiveIdx(index);
    setQuantity(1);
    setIsAdded(false);
  };

  const handleAddToCart = () => {
    addToCart({
      id: `${currentSweet.productId}_${currentSweet.variantId}`,
      productId: currentSweet.productId,
      variantId: currentSweet.variantId,
      name: currentSweet.name,
      weight: currentSweet.weight,
      price: currentSweet.price,
      quantity,
      image: currentSweet.image
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2200);
  };

  return (
    <section 
      className="relative min-h-[640px] lg:min-h-[680px] flex items-center bg-gradient-to-br from-[#3b050a] via-[#5c0e16] to-[#2b0307] text-white pt-10 pb-20 px-4 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Decorative Warm Golden Light Spheres */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-amber-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-orange-600/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-red-900/15 rounded-full blur-[160px] pointer-events-none" />

      {/* Traditional Indian Royal Jali Grid Background */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#F59E0B 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      <div className="container mx-auto relative z-10 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: High-Appeal Copy & Interactive Pills */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Live Heritage Badge */}
            <div className="inline-flex items-center gap-2.5 bg-amber-500/15 border border-amber-400/30 text-amber-200 px-3.5 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md shadow-xs animate-in fade-in duration-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
              <span className="font-extrabold text-amber-300">Established 1995</span>
              <span>•</span>
              <span className="text-white/90">Bikaner Misthan Bhandar, Civil Lines</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12]">
              Pure Desi Ghee Mithai &amp;{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-200 drop-shadow-sm font-serif">
                Royal Bijnor Flavours
              </span>
            </h1>

            {/* Sub-paragraph */}
            <p className="text-sm sm:text-base lg:text-lg text-white/85 max-w-xl font-normal leading-relaxed">
              Serving Bijnor since 1995 with authentic, slow-cooked traditional sweets, hot samosas &amp; celebration gift boxes crafted exclusively in 100% pure country ghee.
            </p>

            {/* Interactive Sweet Craving Pills (Switch hero treat directly) */}
            <div className="space-y-2 pt-1">
              <span className="text-[11px] font-bold text-amber-300/90 uppercase tracking-wider block">
                Tap to explore popular cravings:
              </span>
              <div className="flex flex-wrap gap-2">
                {HERO_SWEETS.map((sweet, idx) => (
                  <button
                    key={sweet.id}
                    type="button"
                    onClick={() => handleSelectSweet(idx)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      activeIdx === idx
                        ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30 ring-2 ring-amber-300 scale-105'
                        : 'bg-white/10 hover:bg-white/15 text-white/90 border border-white/15 hover:border-amber-400/40'
                    }`}
                  >
                    <span>{sweet.badgeIcon}</span>
                    <span>{sweet.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link
                href="#menu"
                className="group inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black px-7 py-4 rounded-2xl transition-all shadow-xl shadow-amber-900/40 hover:shadow-amber-500/30 transform hover:-translate-y-0.5 text-xs sm:text-sm cursor-pointer"
              >
                <span>EXPLORE MENU &amp; ORDER</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/contact-qr"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md font-bold px-5 py-4 rounded-2xl transition-all border border-white/20 text-white text-xs sm:text-sm hover:border-amber-400/40"
              >
                <QrCode className="w-4 h-4 text-amber-400" />
                <span>Counter QR (Zero Login)</span>
              </Link>
            </div>

            {/* Social Proof & Trust Badges Strip */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 border-t border-white/15 text-xs text-white/80">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/15 flex items-center justify-center text-amber-400 shrink-0">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                </div>
                <div>
                  <span className="font-extrabold text-white block text-xs sm:text-sm">4.8 / 5.0</span>
                  <span className="text-[10px] text-white/60">1,200+ Reviews</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center text-emerald-400 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-extrabold text-white block text-xs sm:text-sm">100% Desi Ghee</span>
                  <span className="text-[10px] text-white/60">Pure Ingredients</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/15 flex items-center justify-center text-amber-400 shrink-0">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-extrabold text-white block text-xs sm:text-sm">30-45 Mins</span>
                  <span className="text-[10px] text-white/60">Express in Bijnor</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive 3D Showcase Card */}
          <div className="lg:col-span-5 relative">
            {/* Ambient Background Aura */}
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/30 to-red-600/30 rounded-3xl blur-2xl transform scale-95" />

            {/* 3D Glassmorphic Showcase Box */}
            <div className="relative bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-xl border border-white/25 rounded-3xl p-5 sm:p-6 shadow-2xl overflow-hidden transition-all duration-300 text-left">
              
              {/* Top Floating Badge */}
              <div className="flex items-center justify-between gap-2 mb-3.5">
                <span className="inline-flex items-center gap-1.5 bg-amber-400 text-slate-950 font-black text-[11px] px-3 py-1 rounded-full shadow-md">
                  <span>{currentSweet.badgeIcon}</span>
                  <span>{currentSweet.badge}</span>
                </span>

                <span className="text-[11px] font-bold text-white/70 bg-black/30 px-2.5 py-1 rounded-full">
                  {currentSweet.categoryTag}
                </span>
              </div>

              {/* Sweet High-Res Image with 3D Float Shadow */}
              <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden bg-black/40 border border-white/20 shadow-inner group">
                <img
                  src={currentSweet.image}
                  alt={currentSweet.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Subtle vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                {/* Live Price Tag inside Image */}
                <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md border border-amber-400/40 rounded-xl px-3 py-1.5 shadow-lg">
                  <span className="text-[10px] text-amber-300 font-bold block uppercase tracking-wider">
                    Fresh Portion ({currentSweet.weight})
                  </span>
                  <span className="text-xl font-black text-white">
                    ₹{currentSweet.price}
                  </span>
                </div>
              </div>

              {/* Sweet Details */}
              <div className="mt-4 space-y-1.5">
                <h3 className="text-xl font-black text-white font-serif tracking-wide">
                  {currentSweet.name}
                </h3>
                <p className="text-xs text-amber-200/90 font-medium line-clamp-1">
                  {currentSweet.tagline}
                </p>
                <p className="text-[11px] text-white/70 leading-relaxed line-clamp-2">
                  {currentSweet.description}
                </p>
              </div>

              {/* Interactive Quick Add To Cart Bar */}
              <div className="mt-5 pt-4 border-t border-white/15 flex items-center justify-between gap-3">
                {/* Quantity Stepper */}
                <div className="flex items-center bg-black/40 border border-white/20 rounded-xl p-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-xs font-black text-white">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                    className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* 1-Tap Add to Cart Button */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={`flex-1 py-2.5 px-4 rounded-xl font-extrabold text-xs shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isAdded
                      ? 'bg-emerald-500 text-white scale-98'
                      : 'bg-amber-500 hover:bg-amber-400 text-slate-950 hover:shadow-amber-500/25'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Cart • ₹{currentSweet.price * quantity}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Carousel Navigation Indicator Dots */}
              <div className="mt-4 flex items-center justify-center gap-2">
                {HERO_SWEETS.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    type="button"
                    onClick={() => handleSelectSweet(dotIdx)}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      activeIdx === dotIdx
                        ? 'w-6 bg-amber-400'
                        : 'w-1.5 bg-white/30 hover:bg-white/60'
                    }`}
                    title={`View ${HERO_SWEETS[dotIdx].name}`}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
