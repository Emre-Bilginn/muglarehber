const FORM_CONTENT_TYPES = new Set([
  'application/x-www-form-urlencoded',
  'multipart/form-data',
  'text/plain',
]);

function getContentType(request: Request) {
  return request.headers.get('content-type')?.split(';')[0]?.trim().toLowerCase() ?? '';
}

function coerceValue(value: FormDataEntryValue) {
  return typeof value === 'string' ? value : value.name;
}

export async function parseRequestBody(request: Request) {
  const contentType = getContentType(request);

  if (!contentType || contentType === 'application/json') {
    return (await request.json()) as Record<string, unknown>;
  }

  if (FORM_CONTENT_TYPES.has(contentType)) {
    const formData = await request.formData();

    return Object.fromEntries(
      Array.from(formData.entries()).map(([key, value]) => [key, coerceValue(value)]),
    );
  }

  return {};
}

export function isMalformedRequestBodyError(error: unknown) {
  if (!(error instanceof Error)) {
    return false;
  }

  const message = error.message.toLowerCase();

  return (
    message.includes('unexpected end of form') ||
    message.includes('failed to parse body') ||
    message.includes('invalid json') ||
    message.includes('unexpected end of json input')
  );
}

export function getTrimmedString(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}
