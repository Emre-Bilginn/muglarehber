import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request?.nextUrl?.searchParams;
    const category = searchParams?.get?.('category') ?? '';
    const featured = searchParams?.get?.('featured') ?? '';
    const limit = parseInt(searchParams?.get?.('limit') ?? '10', 10);

    const whereClause: { categoryId?: string; isFeatured?: boolean; category?: { slug: string } } = {};

    if (category) {
      whereClause.category = { slug: category };
    }

    if (featured === 'true') {
      whereClause.isFeatured = true;
    }

    const articles = await prisma?.article?.findMany?.({
      where: whereClause,
      include: {
        category: {
          select: { name: true, slug: true },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
    }) ?? [];

    const safeArticles = (articles ?? [])?.map?.((a: {
      id: string;
      title: string;
      slug: string;
      summary: string;
      imageUrl: string | null;
      createdAt: Date;
      category: { name: string; slug: string };
    }) => ({
      id: a?.id ?? '',
      title: a?.title ?? '',
      slug: a?.slug ?? '',
      summary: a?.summary ?? '',
      imageUrl: a?.imageUrl ?? null,
      createdAt: a?.createdAt?.toISOString?.() ?? '',
      category: a?.category ?? {},
    })) ?? [];

    return NextResponse.json({ articles: safeArticles });
  } catch (error) {
    console.error('Get articles error:', error);
    return NextResponse.json({ articles: [], error: 'Failed to fetch articles' }, { status: 500 });
  }
}
