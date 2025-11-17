/**
 * @file packages/auth/src/auth-service.ts
 * @purpose Manages user authentication, token storage, and session state.
 * @interface Auth management
 * @phase 3
 */

import { apiClient } from '@limeaura/api-client';
import { useUserStore } from '@limeaura/state';
import { User } from '@limeaura/types';

const TOKEN_KEY = 'limeaura_auth_token';
const REFRESH_TOKEN_KEY = 'limeaura_refresh_token';

class AuthService {
  private isInitialized = false;

  /**
   * Initializes the auth service.
   * Call this once on application startup.
   */
  public init(): void {
    if (this.isInitialized) {
      return;
    }

    // Setup the API client interceptor
    apiClient.setupAuthInterceptor({
      getToken: this.getAccessToken,
      // TODO: Add token refresh logic
    });

    // Try to load user from stored token
    this.hydrateSession();
    this.isInitialized = true;
  }

  private getAccessToken(): string | null {
    if (typeof window === 'undefined') {
      return null;
    }
    return window.localStorage.getItem(TOKEN_KEY);
  }

  private setTokens(access: string, refresh: string): void {
    window.localStorage.setItem(TOKEN_KEY, access);
    window.localStorage.setItem(REFRESH_TOKEN_KEY, refresh);
  }

  private clearTokens(): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(REFRESH_TOKEN_KEY);
  }

  /**
   * Attempts to load user data if a valid token is present.
   */
  private async hydrateSession(): Promise<void> {
    const token = this.getAccessToken();
    if (token) {
      try {
        // TODO: Replace with a 'GET /me' call
        // This is a placeholder. A real app would verify the token
        // and fetch the user profile.
        // const user = await apiClient.get<User>('/auth/me');
        // useUserStore.getState().setUser(user);
      } catch (error) {
        console.error('AuthService: Failed to hydrate session', error);
        this.logout(); // Token is invalid
      }
    }
  }

  public async login(
    credentials: any /* TODO: Define LoginDTO in @limeaura/types */
  ): Promise<User> {
    try {
      // TODO: Update type when /auth/login response is defined
      const response = await apiClient.post<any>('/auth/login', credentials);
      this.setTokens(response.accessToken, response.refreshToken);

      // TODO: Update when /auth/me is available
      // const user = await apiClient.get<User>('/auth/me');
      const user: User = response.user; // Assuming login returns user
      useUserStore.getState().setUser(user);

      return user;
    } catch (error) {
      console.error('AuthService: Login failed', error);
      throw error;
    }
  }

  public async logout(): Promise<void> {
    try {
      // Notify backend to invalidate refresh token
      // await apiClient.post('/auth/logout', {
      //   refreshToken: window.localStorage.getItem(REFRESH_TOKEN_KEY),
      // });
    } catch (error) {
      console.error('AuthService: Logout notification failed', error);
    } finally {
      this.clearTokens();
      useUserStore.getState().clearUser();
    }
  }
}

/**
 * Singleton instance of the AuthService.
 */
export const authService = new AuthService();
