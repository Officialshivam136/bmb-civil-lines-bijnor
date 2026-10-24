'use client';

import { FileText, Download, Printer, Calendar } from 'lucide-react';

export default function AdminSalesPage() {
  const salesRows = [
    { date: '24 Oct 2026 (Today)', orders: 5, gross: '₹226', discount: '₹4', net: '₹222' },
    { date: '23 Oct 2026', orders: 8, gross: '₹1,640', discount: '₹60', net: '₹1,580' },
    { date: '22 Oct 2026', orders: 12, gross: '₹2,890', discount: '₹140', net: '₹2,750' },
    { date: '21 Oct 2026', orders: 6, gross: '₹1,120', discount: '₹20', net: '₹1,100' },
    { date: '20 Oct 2026', orders: 9, gross: '₹1,950', discount: '₹80', net: '₹1,870' }
  ];

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <FileText className="w-6 h-6 text-amber-400" />
            <span>Sales & GST Billing Reports</span>
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Export daily accounting statements, cash reconciliation, and UPI collections for Bikaner Misthan Bhandar.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 bg-[#242429] hover:bg-[#2b2b32] text-white border border-neutral-700 px-4 py-2 rounded-xl text-xs font-bold"
          >
            <Printer className="w-4 h-4 text-neutral-400" />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      <div className="bg-[#18181b] border border-neutral-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#242429] text-neutral-400 uppercase text-[10px] tracking-wider border-b border-neutral-800">
                <th className="py-3 px-4">Billing Date</th>
                <th className="py-3 px-4">Order Count</th>
                <th className="py-3 px-4">Gross Revenue</th>
                <th className="py-3 px-4">Discounts Given</th>
                <th className="py-3 px-4 text-right">Net Collections</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800 text-neutral-200">
              {salesRows.map(row => (
                <tr key={row.date} className="hover:bg-[#202025]">
                  <td className="py-3.5 px-4 font-semibold text-white">{row.date}</td>
                  <td className="py-3.5 px-4">{row.orders} orders</td>
                  <td className="py-3.5 px-4 font-mono">{row.gross}</td>
                  <td className="py-3.5 px-4 font-mono text-rose-400">-{row.discount}</td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-amber-400">{row.net}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
