function normalizeError(error: unknown) {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack,
    };
  }

  return error;
}

export function logServerDebug(
  scope: string,
  message: string,
  context?: Record<string, unknown>,
) {
  if (process.env.DB_DEBUG !== 'true') {
    return;
  }

  console.log(`[${scope}] ${message}`, context ?? {});
}

export function logServerError(
  scope: string,
  message: string,
  error: unknown,
  context?: Record<string, unknown>,
) {
  console.error(`[${scope}] ${message}`, {
    ...(context ?? {}),
    error: normalizeError(error),
  });
}
