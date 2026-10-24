import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

const DEFAULT_ADMIN_EMAIL = (process.env.ADMIN_EMAIL || 'admin@bmb.com').toLowerCase().trim();
const DEFAULT_ADMIN_PASS = process.env.ADMIN_PASSWORD || 'BmbBijnor@2026';

export async function POST(request: Request) {
  try {
    const { email, password, action } = await request.json();

    // Support logout via POST
    if (action === 'logout') {
      const cookieStore = await cookies();
      cookieStore.delete('bmb_admin_auth');
      return NextResponse.json({ success: true, message: 'Logged out successfully' });
    }

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const inputEmail = email.toLowerCase().trim();
    let authenticatedAdmin = null;

    // 1. Try database verification
    try {
      const admin = await prisma.adminUser.findUnique({
        where: { email: inputEmail }
      });

      if (admin) {
        const isValid = await bcrypt.compare(password, admin.password);
        if (isValid) {
          authenticatedAdmin = {
            id: admin.id,
            name: admin.name,
            email: admin.email,
            role: admin.role
          };
        }
      }
    } catch (dbErr) {
      console.warn('[api/admin/auth] Database lookup fallback:', dbErr);
    }

    // 2. Resilient fallback for serverless cloud environments
    if (!authenticatedAdmin) {
      if (inputEmail === DEFAULT_ADMIN_EMAIL && password === DEFAULT_ADMIN_PASS) {
        authenticatedAdmin = {
          id: 'admin_bmb_civil_lines_master',
          name: 'BMB Manager',
          email: DEFAULT_ADMIN_EMAIL,
          role: 'ADMIN'
        };
      }
    }

    if (!authenticatedAdmin) {
      return NextResponse.json({ error: 'Invalid admin credentials' }, { status: 401 });
    }

    // Set secure HTTP-only admin session cookie
    const cookieStore = await cookies();
    cookieStore.set('bmb_admin_auth', authenticatedAdmin.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });

    return NextResponse.json({
      success: true,
      user: authenticatedAdmin
    });
  } catch (error) {
    console.error('Admin authentication error:', error);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete('bmb_admin_auth');
  return NextResponse.json({ success: true, message: 'Signed out successfully' });
}

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get('bmb_admin_auth');
  return NextResponse.json({
    authenticated: Boolean(session?.value)
  });
}
