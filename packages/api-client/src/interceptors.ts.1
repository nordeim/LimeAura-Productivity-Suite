/**
 * @file packages/api-client/src/interceptors.ts
 * @purpose Defines request and response interceptors for the API client.
 * @interface Middleware
 * @phase 3
 */

import { AxiosInstance, AxiosError } from 'axios';
import { ApiErrorResponse } from '@limeaura/types';

/**
 * Configuration for the Auth interceptor.
 * This is provided by the AuthService to break circular dependency.
 */
export interface AuthInterceptorConfig {
  getToken: () => string | null;
  // In a real-world scenario, this would also include
  // logic to refresh the token, e.g., onRefresh: () => Promise<string>;
}

/**
 * Sets up the response error interceptor.
 * This transforms Axios errors into a consistent ApiErrorResponse format.
 * @param instance - The Axios instance.
 */
export function setupErrorInterceptor(instance: AxiosInstance): void {
  instance.interceptors.response.use(
    (response) => response, // Pass through successful responses
    (error: AxiosError) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx.
        const errorData = error.response.data as ApiErrorResponse;
        if (errorData && errorData.errors) {
          // This is a structured API error from our backend
          return Promise.reject(errorData);
        }

        // This is a generic HTTP error
        const genericError: ApiErrorResponse = {
          errors: [
            {
              id: error.config?.url || 'unknown_request',
              status: error.response.status,
              code: `http_error_${error.response.status}`,
              title: error.response.statusText,
              detail: 'An unexpected HTTP error occurred.',
            },
          ],
        };
        return Promise.reject(genericError);
      } else if (error.request) {
        // The request was made but no response was received
        const networkError: ApiErrorResponse = {
          errors: [
            {
              id: 'network_error',
              status: 503, // Service Unavailable
              code: 'network_error',
              title: 'Network Error',
              detail:
                'Could not connect to the server. Please check your network.',
            },
          ],
        };
        return Promise.reject(networkError);
      } else {
        // Something happened in setting up the request that triggered an Error
        const setupError: ApiErrorResponse = {
          errors: [
            {
              id: 'client_setup_error',
              status: 400,
              code: 'client_error',
              title: 'Client Error',
              detail: error.message,
            },
          ],
        };
        return Promise.reject(setupError);
      }
    }
  );
}
