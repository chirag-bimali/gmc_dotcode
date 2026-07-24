export type ApiError = {
  code?: string;
  message?: string;
  details?: Record<string, string[] | string>;
  rowErrors?: Array<Record<string, unknown>>;
};

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
  error?: ApiError;
  statusCode: number;
  timestamp: string;
  page?: number;
  pageSize?: number;
  totalCount?: number;
  hasNext?: boolean;
  hasPrevious?: boolean;
};
