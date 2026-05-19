import { NextRequest, NextResponse } from "next/server";
import prisma, { hasDatabaseUrl, isDatabaseConnectionError } from "@/lib/db";
import { getTrimmedString, isMalformedRequestBodyError, parseRequestBody } from "@/lib/request-body";
import { logServerError } from "@/lib/server-log";

const malformedRequestMessage = "Istek tamamlanamadi. Lutfen formu tekrar gonderin.";
const databaseUnavailableMessage = "Mesaj su anda kaydedilemiyor. Lutfen daha sonra tekrar deneyin.";

export async function POST(request: NextRequest) {
  if (!hasDatabaseUrl()) {
    logServerError("api/contact", "DATABASE_URL missing for contact form", new Error("DATABASE_URL missing"));

    return NextResponse.json(
      { success: false, stored: false, error: databaseUnavailableMessage },
      { status: 503 },
    );
  }

  let body: Record<string, unknown>;

  try {
    body = await parseRequestBody(request);
  } catch (error) {
    logServerError("api/contact", "Failed to parse contact request body", error);

    return NextResponse.json(
      {
        success: false,
        stored: false,
        error: isMalformedRequestBodyError(error) ? malformedRequestMessage : "Gecerli bir istek gonderin.",
      },
      { status: 400 },
    );
  }

  const name = getTrimmedString(body?.name);
  const email = getTrimmedString(body?.email);
  const subject = getTrimmedString(body?.subject);
  const message = getTrimmedString(body?.message);

  if (!name || !email || !subject || !message) {
    return NextResponse.json(
      { success: false, stored: false, error: "Lutfen tum alanlari doldurun." },
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
  } catch (error) {
    logServerError("api/contact", "Failed to store contact message", error);

    return NextResponse.json(
      {
        success: false,
        stored: false,
        error: isDatabaseConnectionError(error)
          ? databaseUnavailableMessage
          : "Mesaj islenirken beklenmeyen bir hata olustu.",
      },
      { status: isDatabaseConnectionError(error) ? 503 : 500 },
    );
  }
}
