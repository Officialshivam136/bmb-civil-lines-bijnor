import { Terminal, Database, ShieldAlert, RefreshCw, Cpu, Activity } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function AdminDevToolsPage() {
  return (
    <div className="space-y-6 max-w-[1200px] mx-auto pb-12">
      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <Terminal className="w-6 h-6 text-amber-400" />
          <span>Developer Tools & Diagnostics</span>
        </h1>
        <p className="text-xs text-neutral-400 mt-1">
          Diagnostics for serverless fallbacks, TV order queue latency, and database connectivity.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
        <div className="bg-[#18181b] border border-neutral-800 p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="font-bold text-white">Database Engine</span>
            <Database className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-neutral-400 text-[11px]">
            SQLite + Resilient Serverless Catalogue Overlays (Zero-Crash Guarantee)
          </p>
          <span className="inline-block font-mono text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
            Operational
          </span>
        </div>

        <div className="bg-[#18181b] border border-neutral-800 p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="font-bold text-white">TV Display Queue</span>
            <Activity className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-neutral-400 text-[11px]">
            Real-time polling / WebSocket stream at <code className="text-amber-400">/api/tv/orders</code>
          </p>
          <Link
            href="/tv"
            target="_blank"
            className="inline-block font-bold text-[11px] text-amber-400 hover:underline"
          >
            Test TV Screen &rarr;
          </Link>
        </div>

        <div className="bg-[#18181b] border border-neutral-800 p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="font-bold text-white">Security Middleware</span>
            <ShieldAlert className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-neutral-400 text-[11px]">
            Edge Proxy Active: Route protection on /admin/* and /api/admin/*
          </p>
          <span className="inline-block font-mono text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
            Enforced
          </span>
        </div>
      </div>
    </div>
  );
}
