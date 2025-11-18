/**
 * @file apps/web/src/providers/AppProviders.tsx
 * @purpose Global context provider wrapper.
 * @interface Provider tree
 * @phase 8
 */
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Import global styles (Reset + Tokens)
import '@limeaura/design-tokens/dist/tokens.css';
import '@limeaura/ui/src/styles/reset.css';
import '@limeaura/ui/src/styles/animations.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
