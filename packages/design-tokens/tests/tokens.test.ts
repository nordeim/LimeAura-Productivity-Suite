/**
 * @file packages/design-tokens/tests/tokens.test.ts
 * @purpose Tests for the design token build script.
 * It imports the *generated* files to validate them.
 * @interface Test suite, run via `pnpm test`
 * @phase 1
 */

import { describe, it, expect } from 'vitest';
import { tokens } from '../dist/tokens';
import fs from 'fs';
import path from 'path';

describe('Design Tokens Build', () => {
  it('should generate a valid tokens.ts file', () => {
    // Test a few key tokens to ensure the structure is correct
    expect(tokens).toBeTypeOf('object');
    expect(tokens.color.background.main).toBe('var(--color-background-main)');
    expect(tokens.font.size.h1).toBe('var(--font-size-h1)');
    expect(tokens.motion.easing.gentle).toBe('var(--motion-easing-gentle)');
    expect(tokens.radius.card.lg).toBe('var(--radius-card-lg)');
  });

  it('should generate a valid tokens.css file', () => {
    const cssPath = path.resolve(__dirname, '../dist/tokens.css');
    const cssContent = fs.readFileSync(cssPath, 'utf-8');

    // Test for the root selector
    expect(cssContent).toContain(':root {');
    // Test for a few key variables
    expect(cssContent).toContain('--color-background-main: #D6F25F;');
    expect(cssContent).toContain(
      "--font-family-primary: 'Nunito', 'SF Pro Rounded', 'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;"
    );
    expect(cssContent).toContain('--spacing-xxxl: 32px;');
  });

  it('should have a matching number of CSS vars and TS object keys', () => {
    const cssPath = path.resolve(__dirname, '../dist/tokens.css');
    const cssContent = fs.readFileSync(cssPath, 'utf-8');

    const cssVarCount = (cssContent.match(/--/g) || []).length;
    
    // Helper to count keys in the nested TS object
    const countKeys = (obj: object): number => {
      let count = 0;
      for (const key in obj) {
        if (typeof obj[key as keyof typeof obj] === 'string') {
          count++;
        } else if (typeof obj[key as keyof typeof obj] === 'object') {
          count += countKeys(obj[key as keyof typeof obj]);
        }
      }
      return count;
    };

    const tsKeyCount = countKeys(tokens);

    expect(tsKeyCount).toBeGreaterThan(0);
    expect(cssVarCount).toBeGreaterThan(0);
    expect(tsKeyCount).toBe(cssVarCount);
  });
});
