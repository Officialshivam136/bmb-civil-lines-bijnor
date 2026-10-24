'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState('');
  const router = useRouter();

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId.trim()) {
      router.push(`/track-order/${orderId.trim().replace(/^#/, '')}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-md text-center">
      <h1 className="text-3xl font-bold text-foreground mb-4">Track Your Order</h1>
      <p className="text-foreground/70 mb-8">Enter your Order ID below to track the current status of your delicious mithai.</p>

      <form onSubmit={handleTrack} className="flex gap-2">
        <input 
          type="text" 
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder="e.g. BMB-001000" 
          className="flex-1 p-4 border border-border rounded-xl focus:border-primary outline-none"
        />
        <button type="submit" className="bg-primary text-white p-4 rounded-xl hover:bg-primary/90 transition-colors">
          <Search className="w-6 h-6" />
        </button>
      </form>
    </div>
  );
}
