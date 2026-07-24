import type { ReactNode } from "react";
import { cn } from "@shared/lib/cn";

type FormFieldProps = {
  label?: string;
  error?: string;
  children: ReactNode;
  className?: string;
};

export function FormField({ label, error, children, className }: FormFieldProps) {
  return (
    <label className={cn("grid gap-2 text-sm text-zinc-700", className)}>
      {label && <span className="font-medium text-zinc-900">{label}</span>}
      {children}
      {error ? <span className="text-xs text-red-600">{error}</span> : null}
    </label>
  );
}
