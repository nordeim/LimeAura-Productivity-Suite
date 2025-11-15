### Executive summary

LimeAura’s PRD and design system present a coherent, high-fidelity product and UI specification that can deliver a “wow‑factor” productivity dashboard while meeting strong accessibility and production-readiness goals. The design system is thorough — tokens, component specs, motion system, accessibility rules, and an implementation checklist are already present. The main gaps are implementation-level engineering contracts (APIs, component props/typed interfaces, data schemas), performance guardrails for large-scale datasets, and concrete testing/CI artifacts. The assessment below validates assumptions, highlights risk areas and edge cases, and provides a phased, machine-actionable plan (with checklists) to move from PRD → production while preserving the design fidelity and observability goals.

---

### 1. Validation of core assumptions and high-level recommendations

- Assumption: The frontend will strictly follow the design tokens and animations.
  - Validation: The design system enforces tokenized values and animation rules. Engineering must implement tokens as source-controlled CSS variables (and runtime JS token exports) so components consume the same single source of truth.
  - Recommendation: Publish tokens as (a) CSS custom properties for runtime styling, (b) a TypeScript token module for design-time types and unit tests, and (c) a Figma / Storybook token sync pipeline.

- Assumption: Animations are safe and performant across devices.
  - Validation: The design system already limits animations to transform/opacity and defines prefers-reduced-motion behavior. Real risk remains for many simultaneous animated cards and large dashboards.
  - Recommendation: Implement runtime animation orchestration (staggering, visibility gating, LCP-aware entry) and strict frame‑budget tests. Add a runtime throttle (e.g., skip animations when low FPS or on low-power devices).

- Assumption: Accessibility requirements (WCAG 2.1 AA) will be met simply by following the spec.
  - Validation: The spec contains strong guidance (ARIA, keyboard patterns, prefers-reduced-motion). The remaining work is automated and manual validation during development.
  - Recommendation: Integrate axe-core into CI, create Storybook accessibility stories per component, and require accessibility checks as a merge-blocking gating rule.

- Assumption: Real-time and scale goals (millions of tasks, thousands of concurrent users) are achievable with the proposed architecture.
  - Validation: Back-end architecture in PRD (Postgres + Redis + WebSockets) is appropriate, but requires explicit data partitioning, pagination strategies, and subscription scoping to avoid over-sending events.
  - Recommendation: Define event-scope patterns (channel by workspace/project), apply cursor-based pagination, implement backpressure and per-connection message limits, and adopt query cost limits on reporting endpoints.

---

### 2. Major risks, impact, and mitigations

- Risk: Animation/Rendering performance on low-end devices
  - Impact: Janky UI, missed adoption targets, accessibility complaints.
  - Mitigation: limit simultaneous animated elements; defer non-critical animation; monitor FPS in E2E tests; use IntersectionObserver to pause offscreen animations.

- Risk: Visual drift between design tokens and live components (visual inconsistency)
  - Impact: Loss of “wow”; QA overhead.
  - Mitigation: Storybook + Chromatic visual regression with token-driven snapshots; pre-merge visual diffs required.

- Risk: Accessibility regressions
  - Impact: Non-compliance, legal and UX issues.
  - Mitigation: Axe/CI gating, keyboard-only E2E flows in Cypress, screen reader acceptance tests for critical components.

- Risk: Data-volume performance (dashboards & Gantt views)
  - Impact: Slow load, low adoption.
  - Mitigation: server-side aggregation for dashboard widgets, incremental lazy loading, client-side virtualization for lists/tables, incremental rendering (skeletons + streaming).

- Risk: Security / RBAC leakage across workspaces
  - Impact: Critical data exposure.
  - Mitigation: enforce server-side ACL checks for every query; automated tests for RBAC edge cases; audit log enforcement (immutable change history).

- Risk: Scope creep around the “wow” dashboard features
  - Impact: Delayed deliverables and degraded quality.
  - Mitigation: Lock “wow” customization features to Phase 3. In Phase 1 deliver a strict, polished subset that matches PRD visual standards.

---

### 3. Phased implementation plan (milestones, key deliverables, acceptance criteria)

Phase A — Foundation (2–4 weeks)
- Deliverables:
  - Token pipeline: CSS variables + TypeScript export + tokens test suite.
  - Storybook environment with design token integration.
  - Base Card, Button, Avatar, Tag components implemented and documented (props + types).
  - CI baseline: linting, prettier, unit test runner, Storybook build.
- Acceptance:
  - Storybook shows tokens-driven components; visual regression baseline captured.
  - Token unit tests pass.

Phase 1 — Core MVP (8–12 weeks)
- Deliverables:
  - Task, Project, Workspace data model (DB migrations + REST/GraphQL schemas).
  - Kanban Board, List View, basic Dashboard container using Card components.
  - Notifications (in-app) and basic WebSocket real-time scaffold scoped by workspace.
  - Core components completed: ToggleSwitch, ProgressCircular, Calendar skeleton, IconButton.
  - Accessibility baseline: axe-core CI runs; keyboard navigation for board/list flows.
  - Automated tests: unit tests for components + E2E flows (signup, create project, create task).
- Acceptance:
  - End-to-end critical flows work in staging; performance smoke tests (FCP < 800ms for core view on median device); axe violations zero critical.

Phase 2 — Planning & Reporting (6–10 weeks)
- Deliverables:
  - Gantt/Calendar full implementations with keyboard navigation and aria-current semantics.
  - Time tracking, MilestoneCard implementations, server-side aggregations for dashboard widgets.
  - Visual regression run across components and dashboards.
  - Integration with OAuth calendaring and Slack (initial webhooks).
- Acceptance:
  - Gantt interactions pass E2E; dashboards load with server-side aggregation in <1s for typical org data.

Phase 3 — Wow & Automation (8–12 weeks)
- Deliverables:
  - Customizable drag/drop dashboard layout (persisted per-user), widget API, and widget editing system.
  - Advanced animation orchestration (stagger manager, reduced-motion toggle).
  - AI-assisted task creation feature (NLP → structured fields) as an opt-in microservice.
  - Visual polish pass and performance profiling on low-end devices.
- Acceptance:
  - Drag/drop fluidity within 16ms per frame on target devices; AI task creation precision metrics and opt-out/privacy validated.

Phase 4 — Enterprise & Hardening (4–8 weeks)
- Deliverables:
  - SAML, audit logs, export/destroy workflows, RBAC hardened testing, SLA-based monitoring and runbooks.
  - Production observability: tracing, logging, dashboards for FCP/LCP/slow queries.
- Acceptance:
  - SAML login tested across IdPs; audit logs immutable and searchable; SRE runbooks validated in DR test.

---

### 4. Implementation patterns, engineering contracts, and dev checklist

Key engineering contracts (must be codified before component development)
- Design tokens
  - Source: JSON → build task produces CSS :root variables and tokens.ts with typed exports.
  - CI: token mismatch test (tokens.json matches tokens.ts and Figma tokens).
- Component API contract examples (TypeScript)
  - Card: Props { variant?: 'base'|'heroWithCutout'|'calendarCard'|'integrationsCard'; animationDelay?: number; role?: string; ariaLabel?: string }
  - ProgressCircular: Props { size?: 'small'|'default'; percentage: number; animate?: boolean }
  - ToggleSwitch: Props { checked: boolean; onChange: (v:boolean)=>void; ariaLabel?: string }
- Animation orchestration API
  - StaggerManager: expose per-container baseDelay and increment; detect prefers-reduced-motion; expose pause/resume.
- Data contracts
  - Pagination: cursor-based (opaque cursor).
  - Realtime channel naming: workspace:{workspaceId}:project:{projectId}:updates
  - Widget API: GET /widgets/:widgetId/data?range=... with server-side aggregation hints.

Developer checklist (pre-merge)
- Storybook story exists for component variant.
- Unit tests cover props and accessibility role/keyboard interactions.
- Visual snapshot exists and passed against baseline.
- Axe audit run in PR and no critical/serious violations.
- Performance smoke test (component mount/render time threshold).
- Token references: component must reference tokens.ts/CSS vars; no hardcoded color/spacing.

CI/CD gating rules
- Lint + Typecheck (TypeScript).
- Unit tests coverage threshold enforced per module.
- Storybook build and Chromatic visual diff approval for UI changes.
- Axe accessibility audit; block on critical issues.

Observability and monitoring (production)
- Frontend: collect RUM metrics (FCP, LCP, CLS) and custom metric for animation FPS.
- Backend: slow query logging (>200ms), WebSocket message rates per connection.
- Alerts: spike in axe critical violations in Canary builds; sustained >5% failure in critical E2E.

---

### 5. QA, accessibility and performance recipes

Accessibility recipe (practical)
- Enforce aria contracts in component unit tests (jest-dom + axe).
- Keyboard navigation scenarios as Cypress flows: board drag/drop via keyboard, calendar arrow navigation, toggle activation via space/enter.
- A11y acceptance checklist for each component: roles, labels, focus order, focus visible style, contrast ratio checks with automated tool (embedding contrast tests into jest).

Performance recipe (practical)
- Use virtualization (react-window) for long lists and calendar day cells when many items.
- Dashboard widgets must use server-side aggregated payloads (limited to what the widget needs).
- Animation rules: cap simultaneous animated nodes <= 8; use requestAnimationFrame and IntersectionObserver to pause offscreen animations.
- Pre-render critical card skeletons server-side for LCP improvement; lazy-load non-critical cards.

Testing strategy
- Unit: Jest + React Testing Library for components and hooks.
- Visual: Storybook + Chromatic or Playwright snapshot runner; daily baseline runs.
- Integration: Contract tests for APIs (PACT or OpenAPI tests).
- E2E: Cypress flows for critical journeys + keyboard-only accessibility flows.
- Performance: Lighthouse CI for release builds; synthetic RUM for production.

---

### 6. Recommendations for delivery, team composition and immediate next steps

Team composition (tactical)
- 2 Frontend engineers (React + Storybook specialists), 1 UI engineer (animation & CSS-in-JS/tokens lead), 1 Backend engineer (API, realtime), 1 SRE/DevOps, 1 QA (automation + accessibility), 1 Product Designer (design-system steward).
- Optional: 1 ML engineer for Phase 3 AI features.

Immediate next steps (first 2 weeks)
1. Establish token pipeline: build gorepo task that emits CSS vars + tokens.ts; commit to repo.
2. Stand up Storybook and import Card/Button/Avatar component skeletons using tokens.
3. Implement CI checks: eslint, TypeScript, jest, storybook build, axe-core run.
4. Implement the animation orchestration utility and make it available to Card and Dashboard container.
5. Create a minimal staging backend with the Project/Task schema and cursored APIs for Kanban flows.

KPIs to track during delivery
- Visual regression pass rate (goal: 100% no-regression on critical components).
- Accessibility violations (goal: 0 critical in CI).
- Median dashboard load time for sample org (goal: <1s for aggregated data).
- Animation frame-rate percentage of frames >16ms on test devices (goal: >95% success).

---

### Overview

This deliverable is a production-ready, machine-actionable token pipeline and Storybook setup for Phase A. It converts the provided limeaura design tokens JSON into:
- runtime CSS custom properties for use in plain CSS and component libraries,
- a strongly typed TypeScript token module for design-time consumption,
- a canonical token JSON artifact used as single source of truth,
- Storybook integrated with the token output and initial component stories for Card, Button, Avatar, ToggleSwitch, and ProgressCircular.

Everything below is modular, auditable, versionable, and CI‑friendly. Copy the snippets into your repo and run the provided scripts to generate tokens and boot Storybook.

---

### Goals and outputs

- Single source of truth: use the provided limeaura-design-system.json as the tokens input.
- Outputs:
  - dist/tokens.css — CSS :root variables using token paths as kebab-case names.
  - dist/tokens.ts — TypeScript typed token exports and helper getters.
  - dist/tokens.json — normalized token subset used by front-end.
- Storybook:
  - Storybook v7 config integrated with the token pipeline.
  - preview setup to inject tokens.css and provide controls for reduced-motion toggle.
  - Example stories for Card, Button, Avatar, ToggleSwitch, ProgressCircular showing token usage.
- CI:
  - GitHub Actions workflow to run token build, token tests, Storybook build, and visual snapshot gateway.

---

### Repository file layout (recommended)

- design-tokens/
  - limeaura-design-system.json  <-- provided file (source)
  - scripts/
    - build-tokens.mjs
    - normalize-tokens.mjs
    - token-test.mjs
  - templates/
    - css-template.ejs
    - ts-template.ejs
  - dist/
    - tokens.css
    - tokens.ts
    - tokens.json
- packages/frontend/
  - package.json
  - src/
    - components/
      - Card/
      - Button/
      - Avatar/
      - ToggleSwitch/
      - ProgressCircular/
    - index.css
  - .storybook/
    - main.js
    - preview.js
    - manager.js
    - preview-head.html
  - stories/
    - Card.stories.tsx
    - Button.stories.tsx
    - Avatar.stories.tsx
    - ToggleSwitch.stories.tsx
    - ProgressCircular.stories.tsx
- .github/
  - workflows/
    - ci.yml

---

### Token pipeline implementation

1) Approach summary
- Normalize the authoritative JSON into a flat token map keyed by dot paths, then emit consistent kebab-case CSS variable names and a TypeScript module with exact types.
- Validate token references that use token interpolation patterns like "{color.border.subtle.value}" and resolve them.
- Run tests to ensure no unresolved references and that color contrast spot checks pass for critical pairs.

2) Example Node script: build-tokens.mjs
Save in design-tokens/scripts/build-tokens.mjs

```js
#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';

const ROOT = path.resolve(new URL(import.meta.url).pathname, '../../');
const SRC = path.join(ROOT, 'limeaura-design-system.json');
const DIST = path.join(ROOT, 'dist');

function toKebab(s){
  return s.replace(/\./g, '-')
          .replace(/([A-Z])/g, '-$1')
          .replace(/[_\s]+/g,'-')
          .toLowerCase()
          .replace(/--+/g,'-')
          .replace(/^-|-$|:/g,'');
}

function flatten(obj, prefix = ''){
  const out = {};
  for(const [k,v] of Object.entries(obj)){
    const key = prefix ? `${prefix}.${k}` : k;
    if(v && typeof v === 'object' && !('value' in v && Object.keys(v).length<=2)){
      Object.assign(out, flatten(v, key));
    } else {
      out[key] = v;
    }
  }
  return out;
}

function resolveValue(val, flat){
  if(typeof val !== 'string') return val;
  const refMatch = val.match(/\{([^}]+)\}/g);
  if(!refMatch) return val;
  let resolved = val;
  for(const m of refMatch){
    const inner = m.slice(1,-1);
    const ref = flat[inner];
    if(!ref) throw new Error(`Unresolved token reference ${inner}`);
    const rv = typeof ref === 'object' && 'value' in ref ? ref.value : ref;
    resolved = resolved.replace(m, rv);
  }
  return resolved;
}

async function main(){
  const raw = JSON.parse(await fs.readFile(SRC, 'utf8'));
  const flatRaw = flatten(raw);
  // create canonical tokens map only for entries with .value
  const tokens = Object.fromEntries(
    Object.entries(flatRaw)
      .filter(([,v]) => v && typeof v === 'object' && 'value' in v)
      .map(([k,v]) => [k, { value: resolveValue(v.value, flatRaw), meta: {...v, value: undefined}}])
  );

  await fs.mkdir(DIST, { recursive: true });

  // CSS output
  const cssLines = [':root {'];
  for(const [k,t] of Object.entries(tokens)){
    const varName = `--la-${toKebab(k)}`;
    cssLines.push(`  ${varName}: ${t.value};`);
  }
  cssLines.push('}');
  await fs.writeFile(path.join(DIST, 'tokens.css'), cssLines.join('\n'), 'utf8');

  // TS output
  const tsLines = [
    '// Auto-generated tokens. Do not edit.',
    'export const tokens = {'
  ];
  for(const [k,t] of Object.entries(tokens)){
    const prop = k.split('.').map(p=>p.replace(/[^a-zA-Z0-9_$]/g,'_')).join('_');
    tsLines.push(`  "${k}": ${JSON.stringify(t.value)},`);
  }
  tsLines.push('} as const;');
  tsLines.push('export type TokenKey = keyof typeof tokens;');
  tsLines.push(`export function cssVar(key: TokenKey){ return 'var(--la-' + key.replace(/\\./g,'-') + ')'; }`);
  await fs.writeFile(path.join(DIST, 'tokens.ts'), tsLines.join('\n'), 'utf8');

  // JSON output
  await fs.writeFile(path.join(DIST, 'tokens.json'), JSON.stringify(tokens, null, 2), 'utf8');

  console.log('Tokens generated to dist/');
}

main().catch(err=>{
  console.error(err);
  process.exit(1);
});
```

3) CSS naming convention
- Tokens become CSS variables prefixed with --la- to avoid collisions.
- Examples:
  - foundations.color.background.main.value → --la-foundations-color-background-main
  - foundations.spacing.pagePadding.value → --la-foundations-spacing-pagepadding

4) TypeScript module usage
- tokens.ts exports `tokens` map and helper `cssVar` for runtime-in-CSS-in-JS usage.
- Example in components:
```ts
import { cssVar } from 'design-tokens/dist/tokens';
const styles = {
  background: cssVar('foundations.color.surface.primary.value'),
  borderRadius: 'var(--la-foundations-radius-card-lg)'
};
```

5) Token validation script
Save as design-tokens/scripts/token-test.mjs. It loads dist/tokens.json and runs:
- unresolved token reference detection,
- critical contrast check between text.primary and surface.primary using simple luminance formula,
- ensures required tokens exist (list of essential keys like foundations.color.surface.primary.value, foundations.font.family.primary.value).

---

### Storybook setup

1) Install dependencies (frontend package.json excerpt)

```json
{
  "name": "frontend",
  "private": true,
  "scripts": {
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build",
    "build:tokens": "node ../design-tokens/scripts/build-tokens.mjs"
  },
  "devDependencies": {
    "@storybook/react": "^7.0.0",
    "@storybook/addon-essentials": "^7.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "typescript": "^5.0.0",
    "eslint": "^8.0.0",
    "chromatic": "^6.0.0"
  }
}
```

2) .storybook/main.js

```js
module.exports = {
  framework: '@storybook/react',
  stories: ['../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-essentials'],
  staticDirs: ['../public']
};
```

3) .storybook/preview.js

```js
import '../design-tokens/dist/tokens.css';
import '../src/index.css';
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: { expanded: true },
};
export const decorators = [
  Story => {
    // Reduced motion control visible in toolbar
    return <div style={{ padding: '40px', background: 'var(--la-foundations-color-background-main)' }}>
      <Story />
    </div>;
  }
];
```

4) preview-head.html
Include any fonts and meta for prefer-reduced-motion toggle. Use preload for Nunito.

5) Example Story: Button.stories.tsx

```tsx
import React from 'react';
import { Button } from '../src/components/Button';
import { tokens } from '../../design-tokens/dist/tokens';

export default { title: 'Controls/Button', component: Button };

export const Primary = () => <Button variant="primary">Primary action</Button>;
export const Secondary = () => <Button variant="secondary">Secondary</Button>;
```

6) Component wiring notes
- Components should consume CSS variables for styling and fall back to tokens.ts values when needed in inline styles.
- Keep Storybook stories focused: visual variants, accessibility props, reduced-motion story.

---

### CI integration and validation

1) GitHub Actions: .github/workflows/ci.yml

```yaml
name: CI
on: [push, pull_request]
jobs:
  build-tokens:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 18
      - name: Install deps
        run: |
          cd design-tokens
          npm ci
      - name: Build tokens
        run: node scripts/build-tokens.mjs
      - name: Token tests
        run: node scripts/token-test.mjs
  storybook:
    needs: build-tokens
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 18
      - name: Install Frontend deps
        run: |
          cd packages/frontend
          npm ci
      - name: Build Storybook
        run: |
          cd packages/frontend
          npm run build:tokens
          npm run build-storybook
```

2) Visual regression
- Integrate Chromatic or Playwright snapshots after the Storybook build stage.
- Gate PRs on visual snapshot pass for critical stories.

3) Token contract test automation
- token-test.mjs should fail CI on missing essential tokens or unresolved references.

---

### Tests, validation and acceptance criteria

- Token tests:
  - No unresolved references.
  - All required tokens exist.
  - Spot contrast tests pass for minimal critical pairs. Provide code to compute luminance and contrast in token-test.mjs.
- Storybook tests:
  - Storybook builds successfully after tokens are generated.
  - Chromatic snapshots for the five seed components pass.
- Accessibility tests:
  - Run axe-core against Storybook static build pages and fail on critical/serious issues.
- Acceptance for Phase A:
  - dist/tokens.css and dist/tokens.ts are present, tokens.json exists and references resolved.
  - Storybook builds and includes token styling for components.
  - CI token tests pass and Storybook build step succeeds.

---

### Next steps and checklist for you to run locally

1. Add the provided design-tokens/scripts directory and place limeaura-design-system.json there.
2. Ensure Node 18+ is available.
3. Run:
   - cd design-tokens
   - node scripts/build-tokens.mjs
   - confirm dist/tokens.css, dist/tokens.ts, dist/tokens.json are created
4. Wire tokens into frontend:
   - import design-tokens/dist/tokens.css in Storybook preview and your main app entry
   - use tokens.ts for typed constants in component logic
5. Start Storybook:
   - cd packages/frontend
   - npm run build:tokens
   - npm run storybook
6. Open Storybook at http://localhost:6006 and verify Card, Button, Avatar, ToggleSwitch, ProgressCircular show token-driven styles and that reduced-motion toggle works.
7. Commit and push; verify CI pipeline runs build-tokens and Storybook build.

---

https://copilot.microsoft.com/shares/e9SdAgQe2WwReaawiMwqT
