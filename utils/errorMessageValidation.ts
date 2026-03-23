export function validateErrorMessage(
  actual: string,
  expectedList: string[]
) {
  const normalized = actual.toLowerCase();

  return expectedList.some(msg =>
    normalized.includes(msg.toLowerCase())
  );
}