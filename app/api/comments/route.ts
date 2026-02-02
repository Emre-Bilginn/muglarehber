import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request?.nextUrl?.searchParams;
    const articleId = searchParams?.get?.('articleId') ?? '';

    if (!articleId) {
      return NextResponse.json({ comments: [] });
    }

    const comments = await prisma?.comment?.findMany?.({
      where: {
        articleId: articleId ?? '',
        isApproved: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    }) ?? [];

    const safeComments = (comments ?? [])?.map?.((c: { id: string; name: string; content: string; createdAt: Date }) => ({
      id: c?.id ?? '',
      name: c?.name ?? '',
      content: c?.content ?? '',
      createdAt: c?.createdAt?.toISOString?.() ?? '',
    })) ?? [];

    return NextResponse.json({ comments: safeComments });
  } catch (error) {
    console.error('Get comments error:', error);
    return NextResponse.json({ comments: [], error: 'Failed to fetch comments' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request?.json?.() ?? {};
    const { articleId, name, email, content } = body ?? {};

    if (!articleId || !name || !email || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const comment = await prisma?.comment?.create?.({
      data: {
        articleId: articleId ?? '',
        name: name ?? '',
        email: email ?? '',
        content: content ?? '',
        isApproved: true,
      },
    });

    const safeComment = {
      id: comment?.id ?? '',
      name: comment?.name ?? '',
      content: comment?.content ?? '',
      createdAt: comment?.createdAt?.toISOString?.() ?? '',
    };

    return NextResponse.json({ comment: safeComment });
  } catch (error) {
    console.error('Create comment error:', error);
    return NextResponse.json({ error: 'Failed to create comment' }, { status: 500 });
  }
}
