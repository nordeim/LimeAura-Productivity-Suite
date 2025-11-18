/**
 * @file apps/web/.storybook/preview.tsx
 * @purpose Storybook preview configuration (global setup).
 * @phase 7
 */
import React from 'react';
import type { Preview } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Import global styles
import '@limeaura/design-tokens/dist/tokens.css';
import '@limeaura/ui/src/styles/reset.css';
import '@limeaura/ui/src/styles/animations.css';
import 'react-quill/dist/quill.snow.css';

const queryClient = new QueryClient();

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <div style={{
          fontFamily: "var(--font-family-primary)",
          background: "var(--color-background-main)",
          minHeight: "100vh",
          padding: "1rem"
        }}>
          <Story />
        </div>
      </QueryClientProvider>
    ),
  ],
};

export default preview;
