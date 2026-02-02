import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request?.nextUrl?.searchParams;
    const query = searchParams?.get?.('q') ?? '';

    if ((query?.length ?? 0) < 2) {
      return NextResponse.json({ articles: [] });
    }

    const articles = await prisma?.article?.findMany?.({
      where: {
        OR: [
          { title: { contains: query ?? '', mode: 'insensitive' } },
          { summary: { contains: query ?? '', mode: 'insensitive' } },
          { content: { contains: query ?? '', mode: 'insensitive' } },
        ],
      },
      include: {
        category: {
          select: { name: true, slug: true },
        },
      },
      take: 10,
    }) ?? [];

    return NextResponse.json({ articles: articles ?? [] });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ articles: [], error: 'Search failed' }, { status: 500 });
  }
}
