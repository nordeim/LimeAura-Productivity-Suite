/**
 * @file packages/api-client/src/client.ts
 * @purpose Main Axios HTTP client configuration.
 * @interface API service
 * @phase 3
 */

import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { setupErrorInterceptor, AuthInterceptorConfig } from './interceptors';

// Get API_URL from environment, fallback to example
const baseURL = process.env.API_URL || 'http://localhost:4000';

class ApiClient {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL,
      timeout: 10000, // 10 second timeout
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Setup the response error interceptor immediately
    setupErrorInterceptor(this.instance);
  }

  /**
   * Sets up the authentication request interceptor.
   * This is called by the AuthService to avoid circular dependencies.
   * @param config - The configuration containing token logic.
   */
  public setupAuthInterceptor(config: AuthInterceptorConfig): void {
    // Eject any existing interceptor to prevent duplicates
    // This uses a known pattern, but relies on interceptor order
    // A more robust way might use a named interceptor if Axios supported it.
    // For now, we assume only one auth interceptor.
    
    // We'll just add it. The auth service should only call this ONCE.
    this.instance.interceptors.request.use(
      (request: InternalAxiosRequestConfig) => {
        const token = config.getToken();
        if (token) {
          request.headers['Authorization'] = `Bearer ${token}`;
        }
        return request;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  public get<T>(path: string, params?: any): Promise<T> {
    return this.instance.get<T>(path, { params }).then((res) => res.data);
  }

  public post<T>(path: string, data: any): Promise<T> {
    return this.instance.post<T>(path, data).then((res) => res.data);
  }

  public patch<T>(path: string, data: any): Promise<T> {
    return this.instance.patch<T>(path, data).then((res) => res.data);
  }

  public delete(path: string): Promise<void> {
    return this.instance.delete(path).then(() => undefined);
  }
}

/**
 * Singleton instance of the ApiClient.
 */
export const apiClient = new ApiClient();
