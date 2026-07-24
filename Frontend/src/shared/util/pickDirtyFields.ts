export function pickDirtyFields<T extends Record<string, unknown>>(values: T, dirtyFields: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(values).filter(([key]) => Boolean(dirtyFields[key])),
  ) as Partial<T>;
}
