import { Prisma, PrismaClient } from '@prisma/client';

type PrismaClientSingleton = PrismaClient<
  Prisma.PrismaClientOptions,
  'query' | 'warn' | 'error'
>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
  prismaDebugReady: boolean | undefined;
  prismaConfigWarningPrinted: boolean | undefined;
};

const databaseUrl = process.env.DATABASE_URL?.trim() ?? '';
const databaseConfigured = Boolean(databaseUrl);

function getDatabaseDebugInfo() {
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

const prismaLogConfig: Prisma.LogDefinition[] = [
  { emit: 'stdout' as const, level: 'warn' as const },
  { emit: 'stdout' as const, level: 'error' as const },
];

if (process.env.DB_DEBUG === 'true') {
  prismaLogConfig.unshift({ emit: 'event' as const, level: 'query' as const });
}

export const prisma: PrismaClientSingleton =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: prismaLogConfig,
  });

export function hasDatabaseUrl() {
  return databaseConfigured;
}

export function isDatabaseConnectionError(error: unknown) {
  if (error instanceof Prisma.PrismaClientInitializationError) {
    return true;
  }

  const prismaError = error as { code?: string; message?: string } | null;
  const errorCode = prismaError?.code ?? '';
  const errorMessage = prismaError?.message?.toLowerCase?.() ?? '';

  return (
    errorCode === 'P1001' ||
    errorCode === 'P1002' ||
    errorCode === 'P1008' ||
    errorCode === 'P1017' ||
    errorMessage.includes("can't reach database server") ||
    errorMessage.includes('server has closed the connection')
  );
}

if (!databaseConfigured && !globalForPrisma.prismaConfigWarningPrinted) {
  console.warn('[prisma:init] DATABASE_URL is not configured. Database-backed features are disabled.');
  globalForPrisma.prismaConfigWarningPrinted = true;
}

if (process.env.DB_DEBUG === 'true' && !globalForPrisma.prismaDebugReady) {
  console.log('[prisma:init]', getDatabaseDebugInfo());

  prisma.$on('query', (event) => {
    console.log('[prisma:query]', {
      durationMs: event.duration,
      target: event.target,
    });
  });

  globalForPrisma.prismaDebugReady = true;
}

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;
