import { getTvOrders } from '@/lib/orderService';
import TvDisplayClient from '@/components/tv/TvDisplayClient';
import Link from 'next/link';
import { ExternalLink, Tv } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminTvPage() {
  const { received, preparing, ready } = await getTvOrders();

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface p-4 rounded-2xl border border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
            <Tv className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-extrabold text-foreground text-sm">TV Order Status Screen Active</h2>
            <p className="text-xs text-foreground/60">
              Open on any Smart TV browser, Android TV or tablet at <code className="text-primary font-mono font-bold">/tv</code>
            </p>
          </div>
        </div>

        <Link
          href="/tv"
          target="_blank"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold px-4 py-2 rounded-xl text-xs shadow-md transition-all cursor-pointer"
        >
          <span>Open Full TV Mode</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="rounded-3xl overflow-hidden border border-border shadow-2xl">
        <TvDisplayClient
          initialReceived={received}
          initialPreparing={preparing}
          initialReady={ready}
        />
      </div>
    </div>
  );
}
