import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import AdminLayoutShell from '@/components/admin/layout/AdminLayoutShell';
import { verifyAdminToken } from '@/lib/adminAuth';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const headerList = await headers();
  const currentPath = headerList.get('x-admin-pathname') || '';
  const isLoginPage = currentPath === '/admin/login';

  // If on /admin/login, render auth form directly without admin layout
  if (isLoginPage) {
    return <>{children}</>;
  }

  const cookieStore = await cookies();
  const authCookie = cookieStore.get('bmb_admin_auth');
  const sessionCheck = await verifyAdminToken(authCookie?.value);

  // Hard server-side protection: redirect unauthenticated or forged sessions to /admin/login
  if (!sessionCheck.valid || !sessionCheck.adminId) {
    redirect('/admin/login');
  }

  // Fetch admin profile
  let adminName = 'BMB Store Manager';
  let adminEmail = 'admin@bmb.com';

  try {
    const adminId = sessionCheck.adminId;
    if (adminId && !adminId.startsWith('admin_bmb_')) {
      const admin = await prisma.adminUser.findUnique({
        where: { id: adminId },
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

