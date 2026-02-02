import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request?.json?.() ?? {};
    const { name, email, subject, message } = body ?? {};

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Tüm alanları doldurmanız gerekiyor.' }, { status: 400 });
    }

    const contact = await prisma?.contactMessage?.create?.({
      data: {
        name: name ?? '',
        email: email ?? '',
        subject: subject ?? '',
        message: message ?? '',
      },
    });

    return NextResponse.json({ success: true, id: contact?.id ?? '' });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Mesaj gönderilemedi.' }, { status: 500 });
  }
}
