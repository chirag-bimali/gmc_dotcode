import type { PropsWithChildren } from "react";
import { QueryClientProvider as ReactQueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@shared/api/query-client";

export function QueryClientProvider({ children }: PropsWithChildren) {
  return <ReactQueryClientProvider client={queryClient}>{children}</ReactQueryClientProvider>;
}
