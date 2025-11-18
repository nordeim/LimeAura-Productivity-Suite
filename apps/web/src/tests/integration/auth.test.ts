/**
 * @file apps/web/src/tests/integration/auth.test.ts
 * @purpose Integration tests for authentication flow.
 * @interface Test suite
 * @phase 9
 */
import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { authService } from '@limeaura/auth';

// Mock auth service
vi.mock('@limeaura/auth', async () => {
  const actual = await vi.importActual('@limeaura/auth');
  return {
    ...actual,
    authService: {
      ...actual.authService,
      login: vi.fn(),
      logout: vi.fn(),
      init: vi.fn(),
    },
  };
});

describe('Auth Integration', () => {
  it('should handle login success', async () => {
    const { result } = renderHook(() => useAuth());
    
    // Mock successful login
    (authService.login as any).mockResolvedValue({ id: '1', name: 'Test User' });

    await act(async () => {
      await result.current.login({ email: 'test@test.com', password: 'password' });
    });

    expect(authService.login).toHaveBeenCalledWith({ email: 'test@test.com', password: 'password' });
    expect(result.current.error).toBeNull();
  });

  it('should handle login failure', async () => {
    const { result } = renderHook(() => useAuth());
    
    // Mock failed login
    (authService.login as any).mockRejectedValue({ 
      errors: [{ detail: 'Invalid credentials' }] 
    });

    await act(async () => {
      await result.current.login({ email: 'test@test.com', password: 'wrong' });
    });

    expect(result.current.error).toBe('Invalid credentials');
  });
});
