/**
 * @file packages/ui/.storybook/preview.tsx
 * @purpose Storybook preview configuration (global setup).
 * @phase 4
 */
import React from 'react';
import type { Preview } from '@storybook/react';
import '../src/styles/reset.css'; // Global reset
import '../src/styles/animations.css'; // Global animations
import '@limeaura/design-tokens/dist/tokens.css'; // Design tokens

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
      <div style={{
        fontFamily: "var(--font-family-primary)",
        padding: "1rem",
        background: "var(--color-background-main)",
        minHeight: "100vh"
      }}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
