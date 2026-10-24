'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function OrderStatusClient({ orderId, currentStatus }: { orderId: string, currentStatus: string }) {
  const router = useRouter();
  const [status, setStatus] = useState(currentStatus);
  const [updating, setUpdating] = useState(false);

  const statuses = [
    'PENDING', 'CONFIRMED', 'PREPARING', 'READY', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED'
  ];

  const handleStatusChange = async (newStatus: string) => {
    setStatus(newStatus);
    setUpdating(true);
    try {
      await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      router.refresh();
    } catch (e) {
      console.error(e);
      alert('Failed to update status');
      setStatus(currentStatus);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm font-medium text-foreground/60">Update Status:</span>
      <select 
        value={status} 
        onChange={(e) => handleStatusChange(e.target.value)}
        disabled={updating}
        className="p-2 bg-surface border border-border rounded-lg text-sm outline-none focus:border-primary disabled:opacity-50"
      >
        {statuses.map(s => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
    </div>
  );
}
