import { Cpu, CheckCircle2, MessageSquare, CreditCard, Tv, Printer } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function AdminIntegrationsPage() {
  const integrations = [
    {
      title: 'Smart TV Counter KDS',
      desc: 'Connect to in-store Smart TVs, Android TV sticks, or customer counter screens with instant token announcements.',
      status: 'Connected & Live',
      action: 'Open /tv',
      link: '/tv'
    },
    {
      title: 'WhatsApp Automation Gateway',
      desc: 'Instant order notifications sent to shop manager phone (+91 89791 64646) detailing sweet portions and total bill.',
      status: 'Active',
      action: 'Test Alert',
      link: '/admin/settings'
    },
    {
      title: 'Razorpay UPI & Cards Gateway',
      desc: 'Seamless UPI QR, Google Pay, PhonePe, and card payments with instant server webhook verification.',
      status: 'Integrated',
      action: 'Configure',
      link: '/admin/settings'
    },
    {
      title: 'ESC/POS Thermal Slip Printer',
      desc: 'Instant 2-inch and 3-inch counter thermal receipt printing directly from the POS billing screen.',
      status: 'Ready',
      action: 'Open POS',
      link: '/admin/pos'
    }
  ];

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto pb-12">
      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <Cpu className="w-6 h-6 text-amber-400" />
          <span>System & Hardware Integrations</span>
        </h1>
        <p className="text-xs text-neutral-400 mt-1">
          Connected hardware, Smart TVs, payment processors, and messaging webhooks for Civil Lines, Bijnor.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {integrations.map(int => (
          <div key={int.title} className="bg-[#18181b] border border-neutral-800 p-5 rounded-2xl flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white text-sm">{int.title}</h3>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> {int.status}
                </span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">{int.desc}</p>
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-800 flex justify-end">
              <Link
                href={int.link}
                target={int.link === '/tv' ? '_blank' : '_self'}
                className="text-xs font-bold text-amber-400 hover:text-amber-300"
              >
                {int.action} &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
