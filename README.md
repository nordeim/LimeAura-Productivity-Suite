# LimeAura Productivity Suite

LimeAura is a design-first, enterprise-ready productivity platform combining delightful UI, real‑time collaboration, and production‑grade reliability.

---

## Table of contents
- Vision
- What’s in this repo
- Quick start (local dev)
- Architecture & key design decisions
- Tokens, Storybook and UI governance
- Development workflow and CI gates
- Contributing guide (how to help)
- Roadmap & milestones
- License and code of conduct

---

## Vision

LimeAura’s core promise:
- A joyful, highly-readable UI driven by a single source of truth (design tokens) that preserves visual fidelity across implementations.
- Fast, reliable collaboration: offline-first behavior, deterministic conflict resolution for text, and pragmatic optimistic updates for structured data.
- Enterprise-grade maturity: accessibility (WCAG 2.1 AA), security (zero-trust patterns), observability, and automated quality gates.

This repo exists to kickstart and harden Phase A so product teams can iterate on features without sacrificing design or reliability.

---

## What’s in this repo

Top-level modules and purpose:
- design-tokens/  
  - Source token JSON (limeaura-design-system.json) and pipeline scripts that emit dist/tokens.css, dist/tokens.ts, dist/tokens.json.
  - Token unit tests and CI job snippets enforcing token integrity and drift checks.
- packages/frontend/  
  - React + Vite application skeleton used by Storybook and local dev.
  - Components: Card, Button, Avatar, ToggleSwitch, ProgressCircular (seed implementations).
  - AnimationOrchestrator utility and sample integration.
  - Offline store demo using Yjs + IndexedDB (IndexeddbPersistence).
  - Storybook config with a11y and visual regression integration.
- .github/workflows/  
  - CI workflows for token pipeline, Storybook build, visual regression, synthetic device tests, and token drift enforcement.
- docs/ (planned)  
  - Runbooks, API contract notes, onboard guides, and design governance docs.

Why these pieces are grouped this way:
- Single source token pipeline allows both designers and engineers to work from the same truth.
- Storybook centralizes component contract verification (visual + accessibility).
- CI policies prevent silent drift between design and code.

---

## Quick start (local dev)

Requirements
- Node.js 18+ (Node 20 recommended for CI parity)
- npm or pnpm (examples use npm)
- Git

Clone and bootstrap
```bash
git clone https://github.com/your-org/limeaura.git
cd limeaura
```

Build tokens (always before starting the frontend)
```bash
cd design-tokens
npm ci
npm run build        # generates dist/tokens.css, dist/tokens.ts, dist/tokens.json
npm test             # run token unit tests (Jest or Vitest variant depending on package.json)
```

Start Storybook (frontend)
```bash
cd ../packages/frontend
npm ci
# ensure tokens built from design-tokens/dist are available
npm run storybook
# open http://localhost:6006
```

Run synthetic device tests (Playwright)
```bash
cd packages/frontend
npm ci
npx playwright install
npx playwright test --project="Low-end Mobile"
```

Run full CI locally (token pipeline + tests)
```bash
# from repo root
# run token build & test, then storybook build 
cd design-tokens && npm run build && npm run test
cd ../packages/frontend && npm run build-storybook
```

Quick dev tips
- Use `npm run build` in design-tokens before Storybook to ensure components pick up latest tokens.
- Storybook is the canonical place to validate visual regressions and accessibility before opening PRs.

---

## Architecture & key design decisions

High-level architecture
- Frontend: React 18 + Vite (PWA-friendly). Storybook for component-driven development.
- Token system: JSON (source) → build script → CSS custom properties + TypeScript token exports.
- Real-time: WebSocket gateway pattern + Redis pub/sub for cross-node fanout; durable event stream for audit.
- Offline-first: Yjs CRDTs (text) + IndexedDB persistence + sync queue + service worker.
- Backend: PostgreSQL (OLTP) + Event store (Kafka or append-only event table) + Redis for caching and pub/sub.

Design trade-offs emphasized
- Yjs for pragmatic CRDT on collaborative text to avoid complex OT implementation overhead.
- Local-first behavior early to deliver instant perceived performance.
- Animation orchestration to protect low-end devices and respect user motion preferences.
- Token‑drift enforcement in CI to guarantee cross-team visual consistency.

Performance & accessibility priorities
- Animate only transform/opacity; throttle via AnimationOrchestrator.
- Respect prefers-reduced-motion; provide alternative visual feedback.
- Enforce WCAG 2.1 AA via automated axe checks in CI and manual keyboard/screen reader flows.

---

## Tokens, Storybook and UI governance

Token pipeline (single source of truth)
- Source file: design-tokens/limeaura-design-system.json
- Outputs:
  - dist/tokens.css (runtime CSS variables prefixed with --la-)
  - dist/tokens.ts (typed token exports and helpers)
  - dist/tokens.json (resolved canonical tokens)
- Enforcement:
  - Token unit tests (Jest/Vitest) validate reference resolution, presence of critical tokens, and color contrast.
  - CI job fails on token drift: generated dist/ must match committed dist/ artifacts.

Storybook & visual QA
- Stories for each component including variants, accessibility stories and reduced-motion scenarios.
- Visual regression via Chromatic (or Playwright snapshot runner) — critical story diffs must be reviewed.
- Accessibility: storybook a11y addon + axe-runner in CI; critical/serious violations block merges.

Design change process
1. Edit source JSON tokens.
2. Run design-tokens build scripts locally and validate tests.
3. Include dist/* changes in the token-bump PR along with a changelog entry describing visual impact.
4. CI runs token tests; PR cannot merge until visual regression and a11y checks pass.

---

## Development workflow and CI gates

Branching
- main: production-ready
- develop: integration branch for Phase work
- feature/*: feature branches, PRs to develop

CI checks (required on PR)
- Token build + unit tests (design-tokens)
- Storybook build + axe accessibility audits
- Visual regression baseline (Chromatic / snapshot)
- Unit tests & TypeScript typecheck
- Playwright synthetic device performance tests for animation budgets (configured to run for critical PRs)
- Token drift check: fail if build tokens differ from committed dist/

Release
- Semantic versioning for packages
- Token changes require explicit token-bump PR
- Releases: Tag + CI/CD pipeline publishes frontend artifacts to CDN and backend images to registry

Security & code quality
- Branch protection: require passing CI checks, code reviews and at least one design review for token changes
- Dependabot for dependency updates
- SCA scanning integrated in release pipeline

---

## Contributing guide (how to help)

How to contribute
1. Read the PRD and design tokens to understand goals and visual principles.
2. Search or open issues for bugs, enhancements, or component requests.
3. Create a feature branch named `feature/<short-desc>` or `fix/<short-desc>`.
4. Implement changes and ensure:
   - tokens are not hard-coded (use CSS vars / tokens.ts)
   - Storybook has a story for UI changes
   - Unit tests and token tests pass
   - Visual diffs are intentional and accompanied by a changelog entry
5. Open a PR to `develop`; include screenshots, accessibility notes, and mention relevant owners.

Token change checklist (required when altering tokens)
- Update limeaura-design-system.json
- Run `cd design-tokens && npm run build`
- Run token tests `npm run test`
- Commit dist/ artifacts and a tokens CHANGELOG entry
- Add a Storybook story demonstrating the change if applicable

Code of conduct
- Be respectful and professional. All contributors must adhere to the project Code of Conduct in docs/CODE_OF_CONDUCT.md.

Maintainers and review owners
- Token changes: require sign-off from Design Lead + Frontend Lead.
- Core UI/Animation changes: require Frontend Lead + QA.
- Infrastructure changes: require DevOps/SRE approval.

---

## Roadmap & milestones

Phase A (complete foundations — current)
- Token pipeline, Storybook baseline, Card/Button/Avatar/ToggleSwitch/ProgressCircular
- AnimationOrchestrator, offline-first Yjs store demo, CI token tests & drift checks

Phase B (planning & reporting)
- Calendar & Gantt views, server-aggregated dashboards, calendar integrations

Phase C (wow & automation)
- Customizable dashboards, AI-assisted task creation, runtime animation orchestration enhancements

Phase D (enterprise)
- SAML/SSO, audit logs, RBAC/ABAC hardening, production observability & DR

How to see progress
- Project board in repo: Issues organized by milestone and assigned owners
- Weekly status updates in the project README-linked CHANGELOG and release notes

---

## License and governance

License
- The repo uses the MIT license. See LICENSE.md for details.

Governance
- Design and token changes must be traceable: every token update must include a changelog entry and pass CI drift checks.
- Security-critical reviews required for infra or authentication changes.
- Steering committee (Design Lead, Frontend Lead, Backend Lead, SRE) meets weekly to triage roadmap and approve token-bump PRs for major visual changes.

---

## Final notes and next steps

- Start by building tokens and running Storybook locally. The token pipeline and Storybook are the best places to learn how components consume the design system.
- If you want a contributor path mapped for first-timers: open issues labeled "good first issue" and follow the contributing checklist above.
- Roadmap items are intended to be iterative and gated: visual/a11y/performance approvals for each milestone.

Thank you for joining the LimeAura effort. We aim to build something that is both delightful and dependable — your contributions, design rigor, and careful testing will make the difference.

— LimeAura Core Team
