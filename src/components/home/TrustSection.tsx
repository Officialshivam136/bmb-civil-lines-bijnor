'use client';

import { motion } from 'framer-motion';
import { Award, ShieldCheck, Truck, HeartHandshake } from 'lucide-react';

const trustItems = [
  {
    icon: Award,
    title: '100% Pure Desi Ghee',
    desc: 'Prepared with high quality cow & buffalo desi ghee and pure mawa.',
    badge: 'Purity Tested'
  },
  {
    icon: ShieldCheck,
    title: 'Sanitized & Tamper-Proof',
    desc: 'Packed in hygienic food-grade boxes to seal in aroma and freshness.',
    badge: 'Hygienic'
  },
  {
    icon: Truck,
    title: 'Express Bijnor Delivery',
    desc: 'Direct dispatch to your home across Bijnor within 30 to 45 minutes.',
    badge: 'Fast & Hot'
  },
  {
    icon: HeartHandshake,
    title: 'Direct Shop Support',
    desc: 'Personalized customer service and live WhatsApp order assistance.',
    badge: 'Local Care'
  }
];

export default function TrustSection() {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="text-center max-w-xl mx-auto mb-10">
        <span className="text-xs font-bold uppercase tracking-widest text-[#8c1824] bg-[#8c1824]/10 px-3.5 py-1 rounded-full">
          The Bikaner Promise
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-3">
          Why Families in Bijnor Trust Us
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {trustItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="relative p-6 rounded-2xl bg-surface border border-border shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center group"
            >
              <div className="w-14 h-14 bg-[#8c1824]/10 text-[#8c1824] group-hover:bg-[#8c1824] group-hover:text-white rounded-2xl flex items-center justify-center transition-colors duration-300 mb-4 shadow-sm">
                <Icon className="w-7 h-7" />
              </div>
              <span className="text-[11px] font-bold text-[#b45309] uppercase tracking-wider mb-1">
                {item.badge}
              </span>
              <h3 className="font-bold text-base text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-xs text-foreground/70 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
