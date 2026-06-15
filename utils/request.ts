export function createHeaders(session?: string): Record<string, string> {
  return {
    'Content-Type': 'application/json',
    ...(session ? { Authorization: `Bearer ${session}` } : {}),
  };
}