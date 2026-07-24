import type { FieldValues, Path, UseFormSetError } from "react-hook-form";

export function mapServerErrors<TFieldValues extends FieldValues>(
  details: Record<string, string[] | string> | undefined,
  setError: UseFormSetError<TFieldValues>,
) {
  if (!details) {
    return;
  }

  for (const [key, value] of Object.entries(details)) {
    setError(key as Path<TFieldValues>, {
      type: "server",
      message: Array.isArray(value) ? value.join(", ") : value,
    });
  }
}
