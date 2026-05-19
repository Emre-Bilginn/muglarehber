import { NextRequest, NextResponse } from 'next/server';
import prisma, { hasDatabaseUrl, isDatabaseConnectionError } from '@/lib/db';
import { getTrimmedString, isMalformedRequestBodyError, parseRequestBody } from '@/lib/request-body';
import { logServerDebug, logServerError } from '@/lib/server-log';

export const dynamic = 'force-dynamic';

const commentsUnavailableMessage = 'Yorumlar gecici olarak kullanilamiyor.';
const malformedRequestMessage = 'Istek tamamlanamadi. Lutfen formu tekrar gonderin.';

export async function GET(request: NextRequest) {
  if (!hasDatabaseUrl()) {
    logServerError('api/comments', 'DATABASE_URL missing for comments fetch', new Error('DATABASE_URL missing'));
    return NextResponse.json({ comments: [], unavailable: true, error: commentsUnavailableMessage });
  }

  try {
    const searchParams = request?.nextUrl?.searchParams;
    const articleId = searchParams?.get?.('articleId') ?? '';

    if (!articleId) {
      return NextResponse.json({ comments: [] });
    }

    const comments = await prisma.comment.findMany({
      where: {
        articleId,
        isApproved: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    logServerDebug('api/comments', 'Fetched comments', {
      articleId,
      count: comments.length,
    });

    const safeComments =
      comments?.map?.((comment: { id: string; name: string; content: string; createdAt: Date }) => ({
        id: comment?.id ?? '',
        name: comment?.name ?? '',
        content: comment?.content ?? '',
        createdAt: comment?.createdAt?.toISOString?.() ?? '',
      })) ?? [];

    return NextResponse.json({ comments: safeComments });
  } catch (error) {
    logServerError('api/comments', 'Failed to fetch comments', error);
    return NextResponse.json(
      {
        comments: [],
        unavailable: isDatabaseConnectionError(error),
        error: isDatabaseConnectionError(error) ? commentsUnavailableMessage : 'Failed to fetch comments',
      },
      { status: isDatabaseConnectionError(error) ? 200 : 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  if (!hasDatabaseUrl()) {
    logServerError('api/comments', 'DATABASE_URL missing for comment creation', new Error('DATABASE_URL missing'));
    return NextResponse.json({ error: commentsUnavailableMessage }, { status: 503 });
  }

  try {
    const body = await parseRequestBody(request);
    const articleId = getTrimmedString(body?.articleId);
    const name = getTrimmedString(body?.name);
    const email = getTrimmedString(body?.email);
    const content = getTrimmedString(body?.content);

    if (!articleId || !name || !email || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const comment = await prisma.comment.create({
      data: {
        articleId,
        name,
        email,
        content,
        isApproved: true,
      },
    });

    logServerDebug('api/comments', 'Created comment', {
      articleId,
      commentId: comment.id,
    });

    const safeComment = {
      id: comment?.id ?? '',
      name: comment?.name ?? '',
      content: comment?.content ?? '',
      createdAt: comment?.createdAt?.toISOString?.() ?? '',
    };

    return NextResponse.json({ comment: safeComment });
  } catch (error) {
    if (isMalformedRequestBodyError(error)) {
      logServerError('api/comments', 'Failed to parse comment request body', error);
      return NextResponse.json({ error: malformedRequestMessage }, { status: 400 });
    }

    logServerError('api/comments', 'Failed to create comment', error);
    return NextResponse.json(
      { error: isDatabaseConnectionError(error) ? commentsUnavailableMessage : 'Failed to create comment' },
      { status: isDatabaseConnectionError(error) ? 503 : 500 },
    );
  }
}
