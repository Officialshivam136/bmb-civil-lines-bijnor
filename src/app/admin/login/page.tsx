'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, Mail, ShieldAlert, ArrowRight, Eye, EyeOff, ShieldCheck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import BMBLogo from '@/components/common/BMBLogo';

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/admin';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Invalid administrator credentials');
      }

      // Redirect to the originally intended admin destination
      router.push(callbackUrl);
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please verify credentials.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-950 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Subtle royal background glow */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-red-900/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full bg-neutral-900/90 border border-amber-500/30 p-8 rounded-3xl shadow-2xl space-y-6 relative z-10 backdrop-blur-xl">
        {/* Header with Royal 3D Crest */}
        <div className="flex flex-col items-center text-center">
          <BMBLogo size="md" />
          
          <div className="inline-flex items-center gap-1.5 bg-amber-500/15 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full text-[11px] font-bold mt-4 mb-2 tracking-wide uppercase">
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            <span>Restricted Admin Portal</span>
          </div>
          
          <h1 className="text-2xl font-black text-white tracking-tight">
            Administrative Access
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Bikaner Misthan Bhandar, Civil Lines, Bijnor
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/40 text-red-300 px-4 py-3 rounded-2xl text-xs flex items-center gap-2.5 animate-in shake duration-300">
            <ShieldAlert className="w-4 h-4 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-neutral-300 mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@bmb.com"
                className="w-full pl-10 pr-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white placeholder:text-neutral-600 focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 outline-none transition-all"
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-300 mb-1.5">
              Admin Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-10 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white placeholder:text-neutral-600 focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 outline-none transition-all"
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 text-xs"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-black py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/20 transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 text-xs cursor-pointer uppercase tracking-wider mt-2"
          >
            {loading ? (
              <span>Authenticating Session...</span>
            ) : (
              <>
                <span>Sign In to Admin Portal</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-500">
          <Link 
            href="/" 
            className="inline-flex items-center gap-1.5 hover:text-amber-400 transition-colors font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Storefront</span>
          </Link>

          <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400/80">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>256-bit Encrypted Session</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center text-white text-xs">
        Loading Secure Admin Portal...
      </div>
    }>
      <AdminLoginForm />
    </Suspense>
  );
}
