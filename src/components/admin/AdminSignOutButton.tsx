'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

export default function AdminSignOutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'logout' })
      });
      router.push('/admin/login');
      router.refresh();
    } catch (err) {
      console.warn('Sign out error:', err);
      window.location.href = '/admin/login';
    }
  };

  return (
    <button
      onClick={handleSignOut}
      disabled={loading}
      className="p-2 text-foreground/50 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all cursor-pointer"
      title="Sign Out of Admin Portal"
    >
      <LogOut className={`w-4 h-4 ${loading ? 'animate-pulse' : ''}`} />
    </button>
  );
}
