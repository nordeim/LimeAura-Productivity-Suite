### Review summary

The Phase A blueprint is comprehensive, well-structured, and actionable. It captures the priorities I previously recommended (token pipeline, Storybook, animation orchestration, offline-first with Yjs, CI + synthetic device tests) and delivers concrete artifacts you can run and iterate on. Below I confirm the parts that are good to ship, call out technical issues and edge cases to fix before committing, and provide an ordered list of precise next steps and testable acceptance checks so Phase A is auditable and reproducible.

---

### What I endorse (ready to ship or merge after minimal checks)

- Token pipeline concept: flatten → resolve references → emit CSS/TS/JSON is correct and will produce a single source of truth for frontend teams.
- Storybook configuration that injects tokens and enables a11y and visual regression checks.
- AnimationOrchestrator design: device capability detection, IntersectionObserver deferral, active-animation cap, reduced‑motion respect — this is the right pragmatic approach.
- Offline-first store using Yjs + IndexedDB + background sync queue: solid, practical, and avoids retrofitting CRDT later.
- CI pipeline with separate jobs for token build, Storybook build, visual regression and synthetic device testing — good separation of concerns and artifact promotion.

---

### Issues and corrections to address before committing

Note: these are small, concrete code / config fixes and test additions that prevent flaky builds and runtime surprises.

1) build-tokens.mjs — token flattening and reference resolution
- Risk: flatten() assumes any object containing a "value" is a terminal token. Some nested meta objects may use "value" at multiple nesting levels; ensure flatten preserves exact token path strings and that resolveReferences uses the final tokens map (not flattened raw) to resolve cascading references.
- Action: after flatten, build a tokens map where keys are full token paths and values are resolved strings; run a deterministic topological resolution pass to catch circular refs earlier (current depth-10 guard is good but add explicit cycle detection).
- Minor bug: CSS var naming currently removes ".value" via replace; confirm replacement pattern handles keys with dots and capitals consistently. Add unit tests asserting expected CSS variable names for representative token paths.

2) generateTypeScript output — types and runtime helpers
- Improvement: emit a strongly typed export (typed literal) and also a small runtime validator that throws at import-time if required tokens are missing. Right now getToken returns tokens[key] but TypeScript type TokenValue is loose; add explicit typeof tokens[TokenKey] typings and consider exporting an enum of TokenKey values for compile-time safety.

3) token-test.mjs — color parsing and validations
- Current getLuminance assumes hex notation #RRGGBB. Many tokens may be color functions (rgba(), var(--...)) or references that resolved to rgba(). Add normalization: accept hex, rgb(), rgba(), and fallback to a warning when color is not parseable.
- Contrast tests: consider separate thresholds for "large text" (3:1) vs normal (4.5:1). Add tests for disabled/low-contrast UI states (muted text on soft surfaces).
- Add a check that required tokens include motion durations and easings (you already validate some keys — expand to all critical tokens in REQUIRED_TOKENS).

4) Storybook config and aliasing
- viteFinal alias uses '/design-tokens/dist' which is an absolute root path. Prefer a file-system relative alias to the repo path so Storybook works both locally and in CI (use path.resolve to repo root).
- Ensure preview injects fonts and that Storybook static build includes design-tokens/dist/ tokens.css (CI artifact download covers this but local dev needs `npm run build:tokens` step documented clearly).

5) Card component & Card.module.css
- CSS uses var(--la-foundations-motion-easing-gentle) but tokens emit easing values as cubic-bezier strings; ensure naming matches (gentle vs gentle.value). Align token keys vs CSS var names strictly.
- Card.tsx sets style `'--animation-delay': `${animationDelay}s`` — ensure that Storybook and components coerce to valid CSS property names (React requires CSS custom properties in camelCase to start with `--` but leaving as string is fine). Add unit test asserting computed style.

6) AnimationOrchestrator runtime caveats
- Accessing WebGL debug extension WEBGL_debug_renderer_info may be unavailable or blocked; guard for null and fallback safely.
- Performance monitoring loop uses requestAnimationFrame recursion — add cancellation on unmount and ensure orchestrator does not keep strong references to pages in long-running tests (avoid memory leaks in Storybook).
- setTimeout cleanup uses (options.duration || 300) + (options.delay || 0) — if options.delay is undefined, this may become NaN in some templates; coerce to numbers.

7) Offline store and Yjs usage
- In createTask you construct new Y.Text(task.title as any) — that creates a new Y.Text instance each task; prefer to store strings in a Y.Map key (or keep Y.Text but use consistent API patterns). Tests should assert CRDT merging behavior for simultaneous edits.
- syncQueue is a Y.Array of operations; deleting with syncQueue.delete(0, operations.length) is OK, but verify y-indexeddb persistence behavior and rehydration on page reload. Add integration tests that simulate offline create → reload → online sync.

8) Playwright / synthetic device tests
- Playwright's config options use `launchOptions` and `use` parameters — cpuThrottling, downloadThroughput, uploadThroughput as top-level `use` keys are not direct Playwright options. Use Playwright’s `page.route` and DevTools emulation for network/CPU throttling, or run Lighthouse-style emulation in Puppeteer. Validate Playwright config in CI before relying on it.
- The animation.spec.ts longtask observer should ensure PerformanceObserver is supported in the headless runner; add fallback checks and produce clear artifact logs.

9) CI details
- Chromatic action and `exitZeroOnChanges: true; autoAcceptChanges: main` — be careful: auto-accepting visual changes on main can mask regressions. Require at least one approver or a bot that validates diffs against critical stories; set `exitZeroOnChanges: false` for protected branches.
- Token artifacts: the `git diff --exit-code design-tokens/dist/ || echo "::warning::Token files have uncommitted changes"` step emits a warning but does not block. For strictness, consider failing CI on token drift or requiring a token bump PR.

---

### Precise prioritized next steps (implementation-ready, ordered)

1. Add unit tests for build-tokens.mjs
   - Test cases: nested token resolution, circular reference detection, expected CSS var names for sample keys, and required token presence.
2. Hardening token-test.mjs
   - Add color parsing for hex/rgb/rgba; distinguish large vs normal text contrast thresholds; fail CI on unparseable color tokens.
3. Storybook local dev flow
   - Add `npm run build:tokens` guidance in frontend package.json and prestart hook so tokens are always built locally before storybook dev.
4. Fix Playwright throttling pattern
   - Replace `cpuThrottling` and direct throughput fields with Playwright recommended emulation via `page.context().newCDPSession(page).send('Network.emulateNetworkConditions', ...)` and `page.emulateCPUThrottling` utilities or deploy Lighthouse integration.
5. Add contract tests
   - Add a small test suite: token file existence, Storybook static includes tokens.css, AnimationOrchestrator.getCapabilities returns object, OfflineStore.createTask persists to IndexedDB (can be run in a headless browser).
6. CI policy updates
   - Set Chromatic to block merges on critical story diffs; require visual approval for baseline changes. Fail pipeline on token-test errors.
7. Developer docs
   - Add an onboarding README: how to build tokens, start Storybook, run Playwright tests, and reproduce offline sync flow.

---

### Quick verifiable acceptance checks before merge

- Running design-tokens/scripts/build-tokens.mjs produces dist/tokens.css, dist/tokens.ts, dist/tokens.json with no unresolved "{...}" occurrences.
- design-tokens/scripts/token-test.mjs exits 0 locally against the emitted tokens.json.
- npm run storybook loads stories for Card and Button, their styles reflect tokens (verify background and radius visually or via snapshot).
- AnimationOrchestrator.getInstance().getCapabilities() returns tier and prefersReducedMotion; Card story shows no animation when prefers-reduced-motion is enabled.
- OfflineStore.createTask() when run in a headless browser adds a task that survives a reload (IndexedDB persistence), and sync queue length reduces after simulated server `/api/sync` success.
- Playwright performance test runs in CI and outputs an HTML report artifact.

---

### Final recommendations and governance rules

- Lock token schema changes: require a design-token bump PR that includes both design-tokens/dist changes and the corresponding visual approval in Chromatic. Enforce via CI.
- Treat AnimationOrchestrator as critical infra: releases that change its defaults must run the full synthetic-device tests.
- Maintain a short “Phase A” decision log (one file) capturing any deviations from limeaura-design-system.json and the rationale — this makes audits and future handoffs easier.

---

### Plan and deliverables

I will provide:
- A production-ready token unit test suite (Vitest) that validates resolved references, CSS variable naming, required tokens, and color contrast (hex/rgb/rgba support).
- A small GitHub Actions CI job that builds the tokens, runs the unit tests, and fails the run when token artifacts diverge from the committed dist/ (token drift).
- Usage notes and quick run commands so your team can adopt this immediately.

Files to add (locations)
- design-tokens/tests/token.spec.ts — Vitest unit tests
- design-tokens/package.json — minimal test runner script (if not present)
- .github/workflows/token-ci.yml — CI job snippet that builds tokens, runs tests, and fails on token drift

All code below is ready to copy into your repo and adapt to your toolchain.

---

### 1) Token unit tests (Vitest)

Create design-tokens/tests/token.spec.ts

```ts
/**
 * design-tokens/tests/token.spec.ts
 *
 * Vitest test suite for token validation:
 *  - no unresolved references
 *  - required tokens present
 *  - CSS variable name generation correctness
 *  - color contrast checks (supports #hex, rgb(), rgba())
 */

import fs from 'fs';
import path from 'path';
import { describe, it, expect, beforeAll } from 'vitest';

const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const TOKENS_JSON = path.join(DIST, 'tokens.json');
const TOKENS_CSS = path.join(DIST, 'tokens.css');
let tokens: Record<string, any> = {};

const REQUIRED_TOKENS = [
  'foundations.color.background.main.value',
  'foundations.color.surface.primary.value',
  'foundations.color.text.primary.value',
  'foundations.font.family.primary.value',
  'foundations.radius.card.lg.value',
  'foundations.shadow.card.value',
  'foundations.motion.duration.normal.value',
  'foundations.motion.easing.standard.value'
];

// Utility: parse color strings (#rrggbb, rgb(), rgba())
function parseColorToRgb(color: string): { r: number; g: number; b: number } | null {
  if (!color || typeof color !== 'string') return null;
  color = color.trim();

  // hex #RRGGBB or #RGB
  const hexMatch = color.match(/^#([a-fA-F0-9]{3}|[a-fA-F0-9]{6})$/);
  if (hexMatch) {
    let hex = hexMatch[1];
    if (hex.length === 3) {
      hex = hex.split('').map(c => c + c).join('');
    }
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return { r, g, b };
  }

  // rgb(r,g,b)
  const rgbMatch = color.match(/^rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)$/i);
  if (rgbMatch) {
    return { r: Number(rgbMatch[1]), g: Number(rgbMatch[2]), b: Number(rgbMatch[3]) };
  }

  // rgba(r,g,b,a)
  const rgbaMatch = color.match(/^rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*(0|0?\.\d+|1(\.0)?)\s*\)$/i);
  if (rgbaMatch) {
    const alpha = Number(rgbaMatch[4]);
    // If alpha is 0 treat as transparent (not parseable for contrast)
    if (alpha === 0) return null;
    return { r: Number(rgbaMatch[1]), g: Number(rgbaMatch[2]), b: Number(rgbaMatch[3]) };
  }

  // If it's a CSS var or function we can't compute — return null
  return null;
}

function luminanceFromRgb({ r, g, b }: { r: number; g: number; b: number }): number {
  const srgb = [r, g, b].map(v => v / 255).map(c =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  );
  return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
}

function contrastRatio(hexA: string, hexB: string): number | null {
  const a = parseColorToRgb(hexA);
  const b = parseColorToRgb(hexB);
  if (!a || !b) return null;
  const la = luminanceFromRgb(a);
  const lb = luminanceFromRgb(b);
  const lighter = Math.max(la, lb);
  const darker = Math.min(la, lb);
  return (lighter + 0.05) / (darker + 0.05);
}

beforeAll(() => {
  if (!fs.existsSync(TOKENS_JSON)) throw new Error('tokens.json missing — run build-tokens first');
  tokens = JSON.parse(fs.readFileSync(TOKENS_JSON, 'utf8'));
});

describe('Token basic validations', () => {
  it('has no unresolved reference tokens (no "{" characters in values)', () => {
    const unresolved = Object.entries(tokens).filter(([k, v]) => {
      const val = typeof v === 'object' && 'value' in v ? v.value : v;
      return typeof val === 'string' && val.includes('{');
    });
    expect(unresolved).toEqual([]);
  });

  it('contains required tokens', () => {
    const missing = REQUIRED_TOKENS.filter(r => !Object.prototype.hasOwnProperty.call(tokens, r));
    expect(missing).toEqual([]);
  });

  it('generated CSS file exists and contains representative vars', () => {
    expect(fs.existsSync(TOKENS_CSS)).toBe(true);
    const css = fs.readFileSync(TOKENS_CSS, 'utf8');
    // Spot-check: surface primary var name
    expect(css.includes('--la-foundations-color-surface-primary')).toBe(true);
    // Spot-check: background main var name
    expect(css.includes('--la-foundations-color-background-main')).toBe(true);
  });
});

describe('Token format and naming', () => {
  it('CSS variable naming convention is kebab-case and prefixed with --la-', () => {
    // Sample a few tokens and verify CSS var naming produced by convention
    const samples = [
      'foundations.color.surface.primary.value',
      'foundations.spacing.pagePadding.value',
      'foundations.radius.card.lg.value'
    ];
    samples.forEach(key => {
      expect(Object.prototype.hasOwnProperty.call(tokens, key)).toBeTruthy();
      const varName = `--la-${key.replace(/\.value$/, '').replace(/\./g, '-').toLowerCase()}`;
      const css = fs.readFileSync(TOKENS_CSS, 'utf8');
      expect(css.includes(varName)).toBeTruthy();
    });
  });
});

describe('Color contrast validations', () => {
  it('primary text on surface primary meets WCAG AA (4.5:1) for normal text', () => {
    const textKey = 'foundations.color.text.primary.value';
    const bgKey = 'foundations.color.surface.primary.value';
    const text = tokens[textKey]?.value;
    const bg = tokens[bgKey]?.value;
    const ratio = contrastRatio(text, bg);
    // If parse failed, warn (test will fail) — prefer explicit failure to catch non-parseable formats
    expect(ratio).not.toBeNull();
    expect(ratio! >= 4.5).toBeTruthy();
  });

  it('onAccent text on accent primary meets WCAG AA (4.5:1)', () => {
    const textKey = 'foundations.color.text.onAccent.value';
    const bgKey = 'foundations.color.accent.primary.value';
    const text = tokens[textKey]?.value;
    const bg = tokens[bgKey]?.value;
    // If token missing, skip with a warning (manifest might not define onAccent)
    if (!text || !bg) {
      expect(true).toBeTruthy(); // pass but note tokens absent
      return;
    }
    const ratio = contrastRatio(text, bg);
    expect(ratio).not.toBeNull();
    expect(ratio! >= 4.5).toBeTruthy();
  });
});
```

Notes:
- This test suite expects build-tokens.mjs has already been run and produced design-tokens/dist/tokens.json and tokens.css.
- Vitest handles Node ESM; adjust package.json scripts as shown next.

---

### 2) Minimal design-tokens/package.json

If design-tokens currently has no package.json, add one so tests can run locally and in CI:

Create design-tokens/package.json

```json
{
  "name": "design-tokens",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "build": "node scripts/build-tokens.mjs",
    "test": "vitest run --run --reporter dot"
  },
  "devDependencies": {
    "vitest": "^1.0.0"
  }
}
```

Command to run locally
- cd design-tokens
- npm ci
- npm run build
- npm run test

---

### 3) CI job snippet that fails on token drift

Create .github/workflows/token-ci.yml (or extend your existing pipeline). This job:
- builds tokens
- runs Vitest token tests
- compares dist/ against committed files; fails if drift detected

```yaml
name: Token Pipeline - Build, Test, Drift Check

on:
  push:
    paths:
      - 'design-tokens/**'
  pull_request:
    paths:
      - 'design-tokens/**'

jobs:
  tokens:
    name: Build tokens + tests + drift check
    runs-on: ubuntu-latest
    env:
      NODE_VERSION: 20

    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}

      - name: Install design-tokens deps
        working-directory: design-tokens
        run: npm ci

      - name: Build tokens
        working-directory: design-tokens
        run: npm run build

      - name: Run token tests
        working-directory: design-tokens
        run: npm run test

      - name: Detect token drift (fail if generated files differ from committed)
        id: drift
        run: |
          # Ensure git index is up to date
          git config user.name ci-bot || true
          git config user.email ci-bot@example.com || true

          # Print diff for debugging
          git --no-pager diff --exit-code -- design-tokens/dist/ || true

          # If there are local changes in dist/ compared to index, fail
          if ! git diff --quiet -- design-tokens/dist/; then
            echo "Token drift detected: generated dist/ differs from committed files."
            echo "Please run 'cd design-tokens && npm run build' and commit design-tokens/dist/ changes."
            git --no-pager diff -- design-tokens/dist/
            exit 1
          fi

      - name: Upload tokens artifact
        if: success()
        uses: actions/upload-artifact@v3
        with:
          name: design-tokens-dist
          path: design-tokens/dist/
```

Behavior notes:
- The drift check uses git diff to detect any changes in design-tokens/dist/ after generation. If the build process produces output different from what's committed, the job fails with a clear message and the diff printed.
- This enforces explicit commits for token updates and prevents silent mismatches between code and design tokens used at runtime.

---

### 4) Additional recommendations and small guardrails

- Token bump PR practice
  - When tokens intentionally change, require the PR to include both:
    - updated design-tokens/dist/* artifacts
    - a CHANGELOG entry describing token intent and visual impact
  - The CI drift check enforces this.

- Local dev convenience
  - Add a prestart or prestorybook script in frontend package.json to run `cd design-tokens && npm run build` so Storybook always consumes up-to-date CSS/TS tokens.
  - Example in packages/frontend/package.json:
    "storybook": "npm --prefix ../design-tokens run build && storybook dev -p 6006"

- Strictness tuning
  - If you prefer warnings rather than hard failures for certain visual token changes, implement a separate job that posts diffs to PRs but does not block merges. For production stability, keep the default blocking behavior.

---

### 5) Acceptance checks (quick list you can run)

1. Locally:
   - cd design-tokens
   - npm ci
   - npm run build
   - npm run test
   - Expected: tests pass, tokens.json and tokens.css generated.

2. CI:
   - Open a PR that modifies limeaura-design-system.json but does not update dist/.
   - Expected: CI fails at drift check with printed git diff and message asking to commit updated dist/.

3. Storybook integration:
   - Run storybook (after build tokens) and verify components consume CSS vars generated in dist/tokens.css.

---

### Overview

Below are production-ready, Jest-compatible token validation tests plus supporting package.json and CI guidance. These tests mirror the Vitest suite previously provided but use CommonJS and Jest APIs so they run in repositories using Jest. Copy the files into your repo, run the commands, and the CI snippet will fail on token drift as requested.

---

### Files to add

- design-tokens/tests/token.test.js
- design-tokens/package.json (Jest variant or merged with existing)
- .github/workflows/token-ci-jest.yml (CI job snippet adapted for Jest)

Place the test file under design-tokens/tests/, keep build-tokens.mjs and dist/ as before.

---

### design-tokens/tests/token.test.js

```js
/**
 * design-tokens/tests/token.test.js
 *
 * Jest test suite for token validation:
 *  - no unresolved references
 *  - required tokens present
 *  - CSS variable naming correctness (spot-check)
 *  - color contrast checks (#hex, rgb(), rgba())
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const TOKENS_JSON = path.join(DIST, 'tokens.json');
const TOKENS_CSS = path.join(DIST, 'tokens.css');

let tokens = {};

const REQUIRED_TOKENS = [
  'foundations.color.background.main.value',
  'foundations.color.surface.primary.value',
  'foundations.color.text.primary.value',
  'foundations.font.family.primary.value',
  'foundations.radius.card.lg.value',
  'foundations.shadow.card.value',
  'foundations.motion.duration.normal.value',
  'foundations.motion.easing.standard.value'
];

// Utility: parse color strings (#rrggbb, #rgb, rgb(), rgba())
function parseColorToRgb(color) {
  if (!color || typeof color !== 'string') return null;
  color = color.trim();

  // hex #RRGGBB or #RGB
  const hexMatch = color.match(/^#([a-fA-F0-9]{3}|[a-fA-F0-9]{6})$/);
  if (hexMatch) {
    let hex = hexMatch[1];
    if (hex.length === 3) {
      hex = hex.split('').map(c => c + c).join('');
    }
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return { r, g, b };
  }

  // rgb(r,g,b)
  const rgbMatch = color.match(/^rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)$/i);
  if (rgbMatch) {
    return { r: Number(rgbMatch[1]), g: Number(rgbMatch[2]), b: Number(rgbMatch[3]) };
  }

  // rgba(r,g,b,a)
  const rgbaMatch = color.match(/^rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*(0|0?\.\d+|1(\.0)?)\s*\)$/i);
  if (rgbaMatch) {
    const alpha = Number(rgbaMatch[4]);
    if (alpha === 0) return null;
    return { r: Number(rgbaMatch[1]), g: Number(rgbaMatch[2]), b: Number(rgbaMatch[3]) };
  }

  // Not parseable (CSS var or color function)
  return null;
}

function luminanceFromRgb({ r, g, b }) {
  const srgb = [r, g, b].map(v => v / 255).map(c =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  );
  return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
}

function contrastRatio(colorA, colorB) {
  const a = parseColorToRgb(colorA);
  const b = parseColorToRgb(colorB);
  if (!a || !b) return null;
  const la = luminanceFromRgb(a);
  const lb = luminanceFromRgb(b);
  const lighter = Math.max(la, lb);
  const darker = Math.min(la, lb);
  return (lighter + 0.05) / (darker + 0.05);
}

beforeAll(() => {
  if (!fs.existsSync(TOKENS_JSON)) {
    throw new Error('tokens.json not found — run build-tokens first (design-tokens/scripts/build-tokens.mjs)');
  }
  const raw = fs.readFileSync(TOKENS_JSON, 'utf8');
  tokens = JSON.parse(raw);
});

describe('Token basic validations', () => {
  test('no unresolved reference tokens (no "{" characters in values)', () => {
    const unresolved = Object.entries(tokens).filter(([k, v]) => {
      const val = v && typeof v === 'object' && 'value' in v ? v.value : v;
      return typeof val === 'string' && val.includes('{');
    });
    expect(unresolved).toEqual([]);
  });

  test('contains required tokens', () => {
    const missing = REQUIRED_TOKENS.filter(r => !Object.prototype.hasOwnProperty.call(tokens, r));
    expect(missing).toEqual([]);
  });

  test('generated CSS file exists and contains representative vars', () => {
    expect(fs.existsSync(TOKENS_CSS)).toBe(true);
    const css = fs.readFileSync(TOKENS_CSS, 'utf8');
    expect(css.includes('--la-foundations-color-surface-primary')).toBe(true);
    expect(css.includes('--la-foundations-color-background-main')).toBe(true);
  });
});

describe('Token format and naming', () => {
  test('CSS variable naming is kebab-case and prefixed with --la-', () => {
    const samples = [
      'foundations.color.surface.primary.value',
      'foundations.spacing.pagePadding.value',
      'foundations.radius.card.lg.value'
    ];
    const css = fs.readFileSync(TOKENS_CSS, 'utf8');
    samples.forEach(key => {
      expect(Object.prototype.hasOwnProperty.call(tokens, key)).toBeTruthy();
      const varName = `--la-${key.replace(/\\.value$/, '').replace(/\\./g, '-').toLowerCase()}`;
      expect(css.includes(varName)).toBeTruthy();
    });
  });
});

describe('Color contrast validations', () => {
  test('primary text on surface primary meets WCAG AA (4.5:1)', () => {
    const textKey = 'foundations.color.text.primary.value';
    const bgKey = 'foundations.color.surface.primary.value';
    const text = tokens[textKey] && tokens[textKey].value;
    const bg = tokens[bgKey] && tokens[bgKey].value;
    const ratio = contrastRatio(text, bg);
    expect(ratio).not.toBeNull();
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });

  test('onAccent text on accent primary meets WCAG AA (4.5:1) when present', () => {
    const textKey = 'foundations.color.text.onAccent.value';
    const bgKey = 'foundations.color.accent.primary.value';
    const textToken = tokens[textKey];
    const bgToken = tokens[bgKey];
    if (!textToken || !bgToken) {
      // If tokens absent, pass but log a warning for visibility
      expect(true).toBe(true);
      return;
    }
    const text = textToken.value;
    const bg = bgToken.value;
    const ratio = contrastRatio(text, bg);
    expect(ratio).not.toBeNull();
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });
});
```

---

### design-tokens/package.json (Jest variant)

If your design-tokens folder has no package.json or uses Vitest, replace or merge with this Jest variant. Adjust versions to match your repo.

```json
{
  "name": "design-tokens",
  "version": "1.0.0",
  "private": true,
  "type": "commonjs",
  "scripts": {
    "build": "node scripts/build-tokens.mjs",
    "test": "jest --runInBand --config ./jest.config.cjs"
  },
  "devDependencies": {
    "jest": "^29.0.0"
  }
}
```

Add jest.config.cjs at design-tokens/jest.config.cjs:

```js
module.exports = {
  rootDir: '.',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/tests/**/*.test.js'],
  verbose: true,
  collectCoverage: false
};
```

Run locally:
- cd design-tokens
- npm ci
- npm run build
- npm run test

---

### CI job snippet (Jest) — .github/workflows/token-ci-jest.yml

```yaml
name: Token Pipeline - Build, Jest tests, Drift check

on:
  push:
    paths:
      - 'design-tokens/**'
  pull_request:
    paths:
      - 'design-tokens/**'

jobs:
  tokens:
    name: Build tokens + jest tests + drift check
    runs-on: ubuntu-latest
    env:
      NODE_VERSION: 20

    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}

      - name: Install design-tokens deps
        working-directory: design-tokens
        run: npm ci

      - name: Build tokens
        working-directory: design-tokens
        run: npm run build

      - name: Run token Jest tests
        working-directory: design-tokens
        run: npm run test

      - name: Detect token drift (fail if generated files differ from committed)
        id: drift
        run: |
          git config user.name ci-bot || true
          git config user.email ci-bot@example.com || true

          echo "Checking for token drift..."
          git --no-pager diff --exit-code -- design-tokens/dist/ || true

          if ! git diff --quiet -- design-tokens/dist/; then
            echo "Token drift detected: generated dist/ differs from committed files."
            echo "Please run 'cd design-tokens && npm run build' and commit design-tokens/dist/ changes."
            git --no-pager diff -- design-tokens/dist/
            exit 1
          fi

      - name: Upload tokens artifact
        if: success()
        uses: actions/upload-artifact@v3
        with:
          name: design-tokens-dist
          path: design-tokens/dist/
```

Notes:
- The CI job builds tokens, runs Jest tests, then fails if any generated dist/ artifacts differ from committed files, enforcing explicit commits for token changes.

---

### Quick checklist to validate locally

1. Install dependencies and build tokens:
   - cd design-tokens
   - npm ci
   - npm run build

2. Run tests:
   - npm run test
   - Expect all tests to pass

3. Simulate drift check locally:
   - Run build, make a small change to dist/tokens.css (or remove a committed file), then run the drift detection commands from CI snippet to confirm behavior.

---

https://copilot.microsoft.com/shares/iVTG7hEr41mZAzub2YfXq
