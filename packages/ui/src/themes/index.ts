/**
 * @file packages/ui/src/themes/index.ts
 * @purpose Theme definitions and configuration.
 * @interface Theme config
 * @phase 9
 */

export const themes = {
  light: {
    '--color-background-main': '#D6F25F',
    '--color-surface-primary': '#FFFFFF',
    '--color-text-primary': '#111111',
  },
  dark: {
    '--color-background-main': '#1a1a1a', // Example dark background
    '--color-surface-primary': '#2d2d2d',
    '--color-text-primary': '#ffffff',
  },
};

export type ThemeKey = keyof typeof themes;
