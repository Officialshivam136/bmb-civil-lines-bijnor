import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, password } = body;

    if (!name?.trim() || !phone?.trim() || !password) {
      return NextResponse.json({ error: 'Name, phone number, and password are required' }, { status: 400 });
    }

    const cleanPhone = phone.replace(/\D/g, '').slice(-10);
    if (cleanPhone.length !== 10) {
      return NextResponse.json({ error: 'Please enter a valid 10-digit Indian phone number' }, { status: 400 });
    }

    if (typeof password !== 'string' || password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters long' }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { phone: cleanPhone }
    });

    if (existingUser) {
      return NextResponse.json({ error: 'User with this phone number already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name: name.trim().slice(0, 100),
        phone: cleanPhone,
        password: hashedPassword,
        isGuest: false
      }
    });

    return NextResponse.json({ success: true, user: { id: user.id, name: user.name, phone: user.phone } });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Failed to register user' }, { status: 500 });
  }
}
