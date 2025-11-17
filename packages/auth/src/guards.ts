/**
 * @file packages/auth/src/guards.ts
 * @purpose React components/hooks for route protection.
 * @interface Auth guards
 * @phase 3
 */

import React from 'react';
import { useUserStore } from '@limeaura/state';

/**
 * A hook to get the current authentication state.
 */
export function useAuth() {
  const { user, isAuthenticated } = useUserStore((state) => ({
    user: state.user,
    isAuthenticated: state.isAuthenticated,
  }));
  return { user, isAuthenticated };
}

/**
 * A component wrapper to protect routes.
 * Renders children if authenticated, or falls back.
 *
 * @example
 * <RequireAuth fallback={<Navigate to="/login" />}>
 * <DashboardPage />
 * </RequireAuth>
 */
export function RequireAuth({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback: React.ReactElement;
}): React.ReactElement {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return fallback;
  }

  return children as React.ReactElement;
}
