import { QueryClient } from "@tanstack/react-query";

const shouldRetry = (failureCount: number, error: unknown) => {
  if (failureCount >= 2) {
    return false;
  }

  const response = error as { statusCode?: number } | undefined;
  if (response?.statusCode && response.statusCode >= 400 && response.statusCode < 500 && response.statusCode !== 429) {
    return false;
  }

  return true;
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      gcTime: 5 * 60_000,
      refetchOnWindowFocus: false,
      retry: shouldRetry,
    },
    mutations: {
      retry: false,
    },
  },
});
