import Link from 'next/link';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { Package, ShoppingCart, LayoutDashboard, Settings, PlusCircle, QrCode, Users } from 'lucide-react';
import BMBLogo from '@/components/common/BMBLogo';
import AdminSignOutButton from '@/components/admin/AdminSignOutButton';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const headerList = await headers();
  const currentPath = headerList.get('x-admin-pathname') || '';
  const isLoginPage = currentPath === '/admin/login';

  const cookieStore = await cookies();
  const authCookie = cookieStore.get('bmb_admin_auth');
  const isAuthenticated = Boolean(authCookie?.value && authCookie.value.trim().length > 0);

  // If on /admin/login, render clean auth screen without admin sidebar
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Hard server-side protection: redirect unauthenticated users to /admin/login
  if (!isAuthenticated) {
    redirect('/admin/login');
  }

  // Fetch admin profile
  let adminName = 'BMB Store Manager';
  let adminEmail = 'admin@bmb.com';

  try {
    if (authCookie?.value && !authCookie.value.startsWith('admin_bmb_')) {
      const admin = await prisma.adminUser.findUnique({
        where: { id: authCookie.value },
        select: { name: true, email: true }
      });
      if (admin) {
        adminName = admin.name;
        adminEmail = admin.email;
      }
    }
  } catch (err) {
    console.warn('[AdminLayout] Admin lookup fallback:', err);
  }

  return (
    <div className="flex min-h-screen bg-surface">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-background border-r border-border flex flex-col shrink-0">
        <div className="h-20 flex items-center px-6 border-b border-border">
          <BMBLogo size="sm" showSubtitle={false} />
          <div className="ml-3">
            <span className="font-extrabold text-sm block text-primary">BMB Portal</span>
            <span className="text-[10px] font-semibold text-foreground/50 uppercase tracking-widest">Admin Control</span>
          </div>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-1.5 text-xs font-semibold">
          <Link 
            href="/admin" 
            className="flex items-center gap-3 px-3.5 py-3 rounded-xl hover:bg-primary/5 text-foreground/80 hover:text-primary transition-colors"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Overview & Metrics</span>
          </Link>

          <Link 
            href="/admin/orders" 
            className="flex items-center gap-3 px-3.5 py-3 rounded-xl hover:bg-primary/5 text-foreground/80 hover:text-primary transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Manage Orders</span>
          </Link>

          <Link 
            href="/admin/crm" 
            className="flex items-center gap-3 px-3.5 py-3 rounded-xl hover:bg-amber-500/10 text-amber-800 font-bold transition-colors"
          >
            <Users className="w-4 h-4 text-amber-600" />
            <span>Patron CRM & WhatsApp</span>
          </Link>

          <Link 
            href="/admin/products" 
            className="flex items-center gap-3 px-3.5 py-3 rounded-xl hover:bg-primary/5 text-foreground/80 hover:text-primary transition-colors"
          >
            <Package className="w-4 h-4" />
            <span>Manage Products</span>
          </Link>

          <Link 
            href="/admin/qr-stands" 
            className="flex items-center gap-3 px-3.5 py-3 rounded-xl hover:bg-primary/5 text-foreground/80 hover:text-primary transition-colors"
          >
            <QrCode className="w-4 h-4 text-accent-foreground" />
            <span>Counter & Table QR</span>
          </Link>

          <Link 
            href="/admin/products/new" 
            className="flex items-center gap-3 px-3.5 py-3 rounded-xl hover:bg-primary/5 text-foreground/80 hover:text-primary transition-colors text-primary"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ Add New Item</span>
          </Link>
        </nav>

        {/* Admin Footer Status */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="overflow-hidden mr-2">
              <p className="text-xs font-bold text-foreground truncate">{adminName}</p>
              <p className="text-[10px] text-foreground/50 truncate">{adminEmail}</p>
            </div>
            <AdminSignOutButton />
          </div>
        </div>
      </aside>

      {/* Main Admin Workspace */}
      <main className="flex-1 overflow-auto bg-background/50 flex flex-col">
        <header className="h-16 flex items-center justify-between px-8 bg-background border-b border-border sticky top-0 z-30 shadow-2xs">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-md">
              Bikaner Misthan Bhandar Admin
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="text-foreground/60">Live Bijnor Store: <strong className="text-emerald-600">● Accepting Orders</strong></span>
            <Link href="/" target="_blank" className="font-semibold text-primary hover:underline">
              View Storefront &rarr;
            </Link>
          </div>
        </header>

        <div className="p-6 md:p-8 flex-grow">
          {children}
        </div>
      </main>
    </div>
  );
}
