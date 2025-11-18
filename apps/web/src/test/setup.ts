/**
 * @file apps/web/src/test/setup.ts
 * @purpose Vitest setup file for DOM testing.
 * @phase 7
 */
import '@testing-library/jest-dom';

// Mock TanStack Query for tests
vi.mock('@tanstack/react-query', async (importOriginal) => {
  const mod = await importOriginal<typeof import('@tanstack/react-query')>();
  return {
    ...mod,
    useQuery: vi.fn(() => ({ data: null, isLoading: false, isError: false })),
    useMutation: vi.fn(() => ({ mutate: vi.fn(), isPending: false })),
  };
});
