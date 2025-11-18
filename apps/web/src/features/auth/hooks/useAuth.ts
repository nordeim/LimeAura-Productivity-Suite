/**
 * @file apps/web/src/features/auth/hooks/useAuth.ts
 * @purpose Hook for managing authentication logic.
 * @interface Auth utilities
 * @phase 7
 */
import { useState } from 'react';
import { useUserStore } from '@limeaura/state';
import { authService } from '@limeaura/auth';
import { ApiErrorResponse } from '@limeaura/types';

export function useAuth() {
  const { user, isAuthenticated, setUser, clearUser } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Ensure service is initialized
  authService.init();

  const login = async (credentials: any) => {
    setIsLoading(true);
    setError(null);
    try {
      await authService.login(credentials);
    } catch (err) {
      const apiError = err as ApiErrorResponse;
      setError(apiError.errors?.[0]?.detail || 'Login failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await authService.logout();
  };

  return {
    user,
    isAuthenticated,
    login,
    logout,
    isLoading,
    error,
  };
}
