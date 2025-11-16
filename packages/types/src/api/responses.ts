/**
 * @file packages/types/src/api/responses.ts
 * @purpose Defines standardized API response wrappers.
 * @interface Response contracts
 * @phase 2
 */

export interface PaginationMeta {
  current_page: number;
  total_pages: number;
  total_items: number;
  items_per_page: number;
}

/**
 * Standard successful response for a single entity.
 */
export interface ApiResponse<T> {
  data: T;
  meta?: Record<string, unknown>;
}

/**
 * Standard successful response for a list of entities (paginated).
 */
export interface ApiListResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

/**
 * Standard error response structure.
 */
export interface ApiError {
  id: string; // Unique error ID for tracing
  status: number; // HTTP status code
  code: string; // Internal error code, e.g., 'validation_failed'
  title: string; // Short, human-readable summary
  detail: string; // Human-readable explanation
  source?: {
    pointer?: string; // JSON pointer to the field that caused the error
    parameter?: string; // Query parameter that caused the error
  };
}

export interface ApiErrorResponse {
  errors: ApiError[];
}
