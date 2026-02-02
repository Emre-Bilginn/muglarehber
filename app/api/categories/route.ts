import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const categories = await prisma?.category?.findMany?.({
      orderBy: {
        order: 'asc',
      },
      include: {
        _count: {
          select: { articles: true },
        },
      },
    }) ?? [];

    const safeCategories = (categories ?? [])?.map?.((c: {
      id: string;
      name: string;
      slug: string;
      description: string | null;
      icon: string | null;
      _count: { articles: number };
    }) => ({
      id: c?.id ?? '',
      name: c?.name ?? '',
      slug: c?.slug ?? '',
      description: c?.description ?? '',
      icon: c?.icon ?? 'MapPin',
      articleCount: c?._count?.articles ?? 0,
    })) ?? [];

    return NextResponse.json({ categories: safeCategories });
  } catch (error) {
    console.error('Get categories error:', error);
    return NextResponse.json({ categories: [], error: 'Failed to fetch categories' }, { status: 500 });
  }
}
