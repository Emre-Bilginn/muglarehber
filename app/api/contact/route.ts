import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { logServerDebug, logServerError } from '@/lib/server-log';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = (await request?.json?.()) ?? {};
    const { name, email, subject, message } = body ?? {};

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Tum alanlari doldurmaniz gerekiyor.' }, { status: 400 });
    }

    const contact = await prisma.contactMessage.create({
      data: {
        name: name ?? '',
        email: email ?? '',
        subject: subject ?? '',
        message: message ?? '',
      },
    });

    logServerDebug('api/contact', 'Created contact message', {
      contactId: contact.id,
      subjectLength: String(subject ?? '').length,
    });

    return NextResponse.json({ success: true, id: contact?.id ?? '' });
  } catch (error) {
    logServerError('api/contact', 'Failed to create contact message', error);
    return NextResponse.json({ error: 'Mesaj gonderilemedi.' }, { status: 500 });
  }
}
