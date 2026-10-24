import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import AdminLayoutShell from '@/components/admin/layout/AdminLayoutShell';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const headerList = await headers();
  const currentPath = headerList.get('x-admin-pathname') || '';
  const isLoginPage = currentPath === '/admin/login';

  const cookieStore = await cookies();
  const authCookie = cookieStore.get('bmb_admin_auth');
  const isAuthenticated = Boolean(authCookie?.value && authCookie.value.trim().length > 0);

  // If on /admin/login, render auth form directly without admin layout
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
    <AdminLayoutShell adminName={adminName} adminEmail={adminEmail}>
      {children}
    </AdminLayoutShell>
  );
}
