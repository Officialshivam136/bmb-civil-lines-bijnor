import { UserCheck, Shield, Key, Mail, Phone } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function AdminTeamPage() {
  const staff = [
    { name: 'Shivam Sharma', role: 'Store Owner / Administrator', email: 'admin@bmb.com', phone: '+91 89791 64646', status: 'Active' },
    { name: 'BMB Cashier Desk', role: 'POS Billing Operator', email: 'billing@bmb.com', phone: '+91 89791 64646', status: 'Active' },
    { name: 'BMB Kitchen Station', role: 'Kitchen & Queue Manager', email: 'kitchen@bmb.com', phone: '+91 89791 64646', status: 'Active' }
  ];

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto pb-12">
      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <UserCheck className="w-6 h-6 text-amber-400" />
          <span>Team & Staff Roles</span>
        </h1>
        <p className="text-xs text-neutral-400 mt-1">
          Manage staff accounts and permissions for counter billing, kitchen queue, and store management.
        </p>
      </div>

      <div className="bg-[#18181b] border border-neutral-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#242429] text-neutral-400 uppercase text-[10px] tracking-wider border-b border-neutral-800">
                <th className="py-3 px-4">Staff Member</th>
                <th className="py-3 px-4">Role & Permission</th>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800 text-neutral-200">
              {staff.map(s => (
                <tr key={s.email} className="hover:bg-[#202025]">
                  <td className="py-3.5 px-4 font-bold text-white">{s.name}</td>
                  <td className="py-3.5 px-4">
                    <span className="bg-amber-500/15 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-md font-semibold text-[11px]">
                      {s.role}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-neutral-400">{s.phone}</td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="text-emerald-400 font-bold text-[11px] bg-emerald-500/10 px-2 py-0.5 rounded-md">
                      ● {s.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
