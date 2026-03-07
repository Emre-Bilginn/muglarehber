import { Prisma, PrismaClient } from '@prisma/client';

type PrismaClientSingleton = PrismaClient<
  Prisma.PrismaClientOptions,
  'query' | 'warn' | 'error'
>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
  prismaDebugReady: boolean | undefined;
};

function getDatabaseDebugInfo() {
  const databaseUrl = process.env.DATABASE_URL ?? '';

  if (!databaseUrl) {
    return {
      hasDatabaseUrl: false,
    };
  }

  try {
    const parsed = new URL(databaseUrl);

    return {
      hasDatabaseUrl: true,
      protocol: parsed.protocol.replace(':', ''),
      host: parsed.host,
      database: parsed.pathname.replace(/^\//, '') || null,
      sslmode: parsed.searchParams.get('sslmode'),
      channelBinding: parsed.searchParams.get('channel_binding'),
    };
  } catch {
    return {
      hasDatabaseUrl: true,
      parseError: true,
      usesSslModeRequire: /sslmode=require/i.test(databaseUrl),
    };
  }
}

const prismaLogConfig = [
  { emit: 'event' as const, level: 'query' as const },
  { emit: 'stdout' as const, level: 'warn' as const },
  { emit: 'stdout' as const, level: 'error' as const },
];

export const prisma: PrismaClientSingleton =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: prismaLogConfig,
  });

if (process.env.DB_DEBUG === 'true' && !globalForPrisma.prismaDebugReady) {
  console.log('[prisma:init]', getDatabaseDebugInfo());

  prisma.$on('query', (event) => {
    console.log('[prisma:query]', {
      durationMs: event.duration,
      target: event.target,
      query: event.query,
    });
  });

  globalForPrisma.prismaDebugReady = true;
}

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;
