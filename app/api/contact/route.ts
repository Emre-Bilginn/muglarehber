import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, email, subject, message } = body ?? {};

  if (!name || !email || !subject || !message) {
    return NextResponse.json(
      { error: "Lütfen tüm alanları doldurun." },
      { status: 400 },
    );
  }

  try {
    await prisma.contactMessage.create({
      data: {
        name,
        email,
        subject,
        message,
      },
    });

    return NextResponse.json({ success: true, stored: true });
  } catch {
    return NextResponse.json({
      success: true,
      stored: false,
    });
  }
}
