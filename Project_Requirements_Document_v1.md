# LimeAura Productivity Suite — Project Requirements Document (PRD)  
Version: 1.1 — Finalized Phase A Blueprint  
Last updated: 2025-11-15T16:20:00+08:00  
Author: LimeAura Product & Engineering Working Group

---

## 1. Executive summary

LimeAura is a modern, enterprise-ready productivity platform combining task management, planning, real-time collaboration, and customizable dashboards. Its core differentiator is a design-led "wow" experience driven by the LimeAura Design System (tokens, components, and an animation system) while delivering enterprise-grade performance, accessibility (WCAG 2.1 AA), security, and scalability. This PRD replaces and consolidates previous artifacts into a single, comprehensive, actionable specification that guides product, design, and engineering through Phase A (design system + core MVP) to Phase 4 (enterprise readiness).

Primary outcomes:
- Deliver an MVP that supports Organizations → Workspaces → Projects → Tasks with Kanban and List views, basic dashboards, in-app notifications, comments, attachments, and offline-first behavior.
- Ensure UI fidelity to the LimeAura design tokens and motion system while enforcing performance budgets and accessibility.
- Provide a production-grade foundation for real-time collaboration, event sourcing for auditability, and a secure, scalable backend.

Success metrics (12 months):
- On-time task completion +20%
- Status-report prep time −40%
- CTA satisfaction >85%
- User adoption >70% within 90 days
- Uptime ≥99.9%

---

## 2. Vision, value proposition, and target users

Vision
- Create an intuitive, visually stunning platform that turns complexity into clarity and enables teams to plan, execute, and tell the story of their work.

Value proposition
- High signal dashboards and AI-assisted planning reduce administrative overhead and surface risk early.
- An immediately delightful UI (LimeAura tokens + motion) that still meets enterprise performance, security, and accessibility demands.
- Offline-first foundations and robust integrations keep work flowing in low-connectivity and high-scale environments.

Target users
- Product managers, engineers, designers, operations, executives, and cross-functional teams seeking concise status, predictable delivery, and collaborative planning.

Key personas
- Project Lead: configures projects, plans sprints, examines dashboards, manages integrations.
- Team Member: creates/updates tasks, logs time, comments, and collaborates.
- Stakeholder: consumes dashboards and reports, provides approvals/comments.
- Admin: manages org-level settings, access, billing, integrations.

---

## 3. Scope and phased rollout

Phased delivery ensures business value early while protecting quality and visual fidelity.

Phase 1 — Foundation & Core MVP (Weeks 1–12)
- Deliverables:
  - Token pipeline (JSON → CSS variables + TypeScript) and Storybook with base components (Card, Button, Avatar, ToggleSwitch, ProgressCircular).
  - Core data model and API scaffolding (Organization, Workspace, Project, Task).
  - Kanban Board, List View, Task CRUD, Comments, Attachments (in-app), basic notifications (in-app only).
  - Offline-first task store (Yjs + IndexedDB) with sync queue and service worker.
  - CI pipeline with token tests, Storybook build, axe accessibility audits, visual regression baseline, and synthetic device tests.
- Acceptance:
  - Storybook + tokens pass CI; critical accessibility violations = 0; LCP/FCP smoke tests pass on median devices.

Phase 2 — Planning & Reporting (Weeks 13–26)
- Deliverables:
  - Calendar and Gantt views with keyboard navigation; Milestones and Dependencies.
  - Time tracking and server-side aggregated dashboard widgets.
  - Integration scaffolding: Calendar (Google/Office 365) and Slack notifications.
- Acceptance:
  - Gantt interactions and exports validated; dashboards load <1s with aggregated payloads.

Phase 3 — Wow & Automation (Weeks 27–40)
- Deliverables:
  - Customizable drag-and-drop dashboards (persisted per-user).
  - AI-assisted task creation (NL → structured fields) and smart suggestions.
  - Advanced animation orchestration and runtime throttling for device tiers.
- Acceptance:
  - Drag/drop runs smoothly (≥16ms per frame target) on target devices; AI suggestions reach defined accuracy metrics.

Phase 4 — Enterprise & Hardening (Weeks 41–52)
- Deliverables:
  - SAML/SSO, audit logs, advanced RBAC/ABAC policies, export/destroy workflows.
  - Production observability (tracing, logs, dashboards), DR runbooks, performance hardening.
- Acceptance:
  - SAML across IdPs tested; audit logs immutable; SRE runbooks validated in DR test.

Out of scope for v1.0
- ERP-level finance modules, multi-tenant billing engines, highly specialized industry templates.

---

## 4. User stories and acceptance criteria

Each story includes functional acceptance criteria and non-functional constraints (security/performance/accessibility).

Epic: Projects & Tasks
- US-101 Create project
  - Acceptance: Admin/Project Lead can create a Project with title, description, goals; project persisted; default workflow created.
- US-102 Create/Edit/Delete Task
  - Acceptance: Task fields (title, description, assignee, due date, priority, tags, attachments); history event created; optimistic UI update; offline creation queued and synced.
- US-103 Subtasks & Dependencies
  - Acceptance: Tasks can reference subtasks and dependencies; Gantt shows dependency edges; server validates circular dependency prevention.

Epic: Views & Navigation
- US-201 Kanban Board
  - Acceptance: Drag/drop columns/cards; keyboard accessible (move via keyboard); LV feedback < 120ms local move; optimistic update with reconciliation.
- US-202 List View
  - Acceptance: Filter, sort, pagination (cursor-based), virtualization for long lists.

Epic: Dashboard & Reporting
- US-301 Widget Framework
  - Acceptance: Dashboard container supports Card-based widgets; widgets have server-aggregated data; drill-down to pre-filtered task lists.
- US-302 Export Reports
  - Acceptance: Export selected view as CSV/PDF; exports are generated asynchronously for large data sets.

Epic: Collaboration & Notifications
- US-401 Comments & Mentions
  - Acceptance: Inline commenting with @mentions, notifications created, readable by mentioned user.
- US-402 Notifications
  - Acceptance: In-app notifications with aria-live polite; keyboard dismiss; swipe-to-dismiss on mobile.

Non-functional acceptance examples
- Accessibility: pages must have no critical axe violations in CI and pass manual keyboard flows.
- Performance: Core dashboard (aggregate) should return and render within target budgets for median org dataset (<1s server, <1.5s client render).
- Security: All APIs authenticated; RBAC enforced; audit trail captured as event store entries.

---

## 5. Information architecture & core data model

Top-level containers
- Organization → Workspaces → Projects → Tasks

Core entities (selected)
- User { id, name, email, roles, timezone, locale }
- Organization { id, name, settings, billing }
- Workspace { id, organizationId, name, members }
- Project { id, workspaceId, name, workflow, settings }
- Task { id, projectId, title, description, status, priority, assigneeId, watchers[], dueDate, estimates, timeLogs[], tags[], attachments[], dependencies[], subtasks[], version, createdAt, updatedAt }
- TimeLog { id, taskId, userId, start, end, duration, comment }
- Comment { id, taskId, userId, content, createdAt, editedAt }
- Event { id, entityType, entityId, type, payload, userId, timestamp, metadata } (event-sourced audit log)

Relationships and constraints
- Task belongs to Project; Task has many Subtasks (self-referential).
- Task dependencies must avoid cycles; server-side validation enforced.
- Auditability: Events stored immutably in append-only event store (Kafka/SQL event table), and materialized views kept for fast reads.

API contracts (summary)
- Prefer GraphQL for flexibility + server-side persisted queries; provide REST endpoints for simple integrations.
- Pagination: cursor-based (opaque).
- Realtime channels: workspace:{workspaceId} and project:{projectId} scoping; subscription limits enforced per-client.

Versioning & compatibility
- Semantic API versioning; breaking changes require migration plan and deprecation windows.

---

## 6. UX/UI and design system requirements

Source of truth
- All UI must reference the LimeAura tokens and component specs (limeaura-design-system.json).

Typography and layout
- Primary font stack: Nunito → SF Pro Rounded → Inter → system fallbacks.
- Page padding: 40px on desktop, responsive reductions to foundations.spacing.lg on mobile.

Color & contrast
- All text colors must meet WCAG 2.1 AA thresholds (4.5:1 for normal text).
- Accent uses limited palette; ensure semantic tokens are used (success/warning/danger).

Motion and animation
- Motion must use transform and opacity. Global keyframes and tokenized durations/easings control behavior.
- Respect prefers-reduced-motion: reduce animations to transitions or none.
- Implement AnimationOrchestrator to detect device tier and throttle non-critical animations.

Component requirements (must-have)
- Card: base variants (heroWithCutout, calendarCard, integrationsCard); animation delays via CSS variables; semantic HTML.
- Button: primary, secondary, success, ghost; proper focus states and min-height.
- ToggleSwitch: label-based accessible implementation (input[type=checkbox] + :checked).
- ProgressCircular: SVG-based with rounded caps and animated stroke-dashoffset.

Storybook
- Full component stories with a11y and visual snapshot coverage; tokens injected at runtime.

Design governance
- Token changes must be accompanied by a token-bump PR that updates committed dist artifacts and a changelog entry; CI enforces drift checks.

---

## 7. Accessibility (A11y) standards & testing

Global requirements
- Meet WCAG 2.1 AA across core flows.
- Keyboard support for all interactive elements (Tab, Enter, Space, Arrow keys for calendar/board navigation).
- Screen reader semantics: ARIA attributes (aria-live, aria-current, aria-selected, aria-checked).
- Focus indicators visible and consistent.

Component-level rules
- Icon-only buttons must include aria-label.
- Calendar: aria-current="date" for today; aria-selected="true" for selected date.
- Notifications: container aria-live="polite".

Testing & CI
- Automated: axe-core run against Storybook static build; failures for critical/serious block merges.
- Manual: keyboard-only user tests, screen reader sessions (VoiceOver, NVDA), zoom up to 200%.
- Regression: add a11y stories and require visual snapshots for a11y-affected variants.

---

## 8. Security, privacy, and compliance requirements

Authentication & Identity
- JWT for API auth; OAuth2 flows for integrations (Google, Office 365, GitHub).
- Support SSO/SAML in Phase 4.

Authorization
- RBAC core model (roles: Admin, ProjectLead, TeamMember, Stakeholder, ViewOnly).
- ABAC patterns supported for advanced policies (role + context + resource attributes).

Data protection
- Encryption in transit (TLS 1.3) and at rest (AES-256).
- Data export and deletion endpoints per GDPR/CCPA requirements.
- Audit logs immutable and queryable; events carry user, timestamp, IP, user-agent.

Infrastructure & runtime
- WAF and network segmentation; least-privilege IAM for services; secrets in KMS/Secret Manager.
- Regular dependency scanning (SCA) and scheduled security audits/pen tests.

Operational security
- Rate-limiting and per-connection quotas for realtime channels; backpressure and subscription limits enforced.
- Secure defaults and input validation to prevent injection attacks.

---

## 9. Real-time architecture & collaboration semantics

Collaboration model
- Text fields: use Yjs (CRDT) for rich collaborative text and presence where real-time editing is needed.
- Structured fields: field-level last-write-wins with optimistic locking for critical fields (status, assignee).
- Conflict handling: merge strategy documented and surfaced to users for conflicts that require manual resolution (rare).

Realtime infrastructure
- WebSocket gateway cluster (stateless): Socket gateway → Redis Pub/Sub → Event Stream (Kafka) → backend services.
- Connection management: subscription limits (maxChannelsPerUser, maxUsersPerChannel), automatic cleanup, throttling per connection.
- Event durability: critical events persisted to event store for recovery and audit.

Offline & Sync
- Local-first approach: IndexedDB + Yjs + service worker; operations queued and synced with server using structured sync API.
- Server reconciliation: server returns canonical operations; client applies via CRDT merges or versioned reconciliation.

---

## 10. Backend architecture and scalability

Architecture pattern
- Service-oriented modular backend (monolith or microservices as team scale dictates), with strong boundary contracts.
- Core services: Auth, API Gateway, Project/Task service (primary domain), Real-time gateway, Sync service, Analytics/Reporting.

Data stores
- Relational: PostgreSQL (primary OLTP, schema migrations via versioned migrations).
- Event store: Kafka / durable event append (or Postgres event table) for audit and materialized views.
- Cache: Redis cluster (caching + pub/sub utility).
- Search: Elasticsearch/Opensearch for full-text and complex query patterns.
- Local caches: IndexedDB for offline clients.

Scalability patterns
- Materialized views for dashboards (CDC or background workers to refresh aggregates).
- Cursor-based pagination and server-side filtering for large datasets.
- Horizontal scale for websocket gateways; per-node subscription limits and Redis pub/sub for cross-node fanout.
- Connection pooling for Postgres (PgBouncer).

Observability
- Metrics (Prometheus), tracing (OpenTelemetry), logs (structured JSON → ELK/Grafana), SLOs and alerts.
- RUM for front-end (First Contentful Paint, LCP, CLS, animation FPS metric).

---

## 11. Testing strategy and quality gates

Test pyramid
- Unit tests: components, utilities, reducers.
- Integration tests: service contract and API contract (PACT/OpenAPI checks).
- Component tests: Storybook + visual regression (Chromatic or Playwright snapshot).
- E2E tests: Playwright covering critical journeys (signup, create project, create task, board flows).
- Performance: Playwright + Lighthouse in CI for synthetic device tests; RUM in production.

CI gates
- Lint + Typecheck
- Token pipeline tests and drift check (fail on token drift)
- Unit tests + coverage threshold per package
- Storybook build + axe audits (fail on critical)
- Visual regression (critical stories block merges)
- Synthetic device perf tests (fail if performance budgets violated)

Quality metrics
- Test coverage thresholds at module level (set per-team).
- No critical a11y violations in CI.
- Daily visual diff baseline checks.

---

## 12. Deployment, operations, and disaster recovery

Deployment model
- Frontend: PWA built with React/Vite, deployed to CDN (Cloudflare Pages, Vercel).
- Backend: containerized services (Kubernetes/Cloud Run), scalable with autoscaling and health checks.
- Infrastructure as code (Terraform/CloudFormation).

Release strategy
- Canary → Blue/Green rollout for backend changes.
- Feature flags for incremental rollout of major features (dashboards, AI).

DR and backup
- Regular backups of primary DB, event store replication across regions.
- SRE runbooks for failover, incident response, and rollback procedures. Validate with quarterly DR drills.

Monitoring & SLOs
- SLOs: uptime (99.9%), API latency percentiles, error budget alerts.
- Playbook for escalations, incident review, and postmortems.

---

## 13. Integrations and extensibility

Planned integrations
- Calendar (Google, Office 365)
- Chat (Slack, Microsoft Teams) — webhooks + bot notifications
- Git (GitHub/GitLab) — PR/commit triggers for automated workflows
- File storage (Drive, OneDrive, Dropbox) — OAuth and file metadata storage

API & Webhooks
- REST + GraphQL endpoints with API keys and scopes.
- Webhooks for events; retry/backoff and event signing.

Plugin model (post-Phase 3)
- Widget plugin API for custom dashboard widgets with secure sandboxing and permission controls.

---

## 14. Privacy, data governance, and compliance

Data residency
- Support region-specific deployments; surface org-level data residency options.

Export & deletion
- Full data export (CSV/JSON) and secure deletion workflows; deletion triggers audit event and irreversible data purge after confirmation.

Compliance
- GDPR and CCPA readiness: Data Access and Deletion APIs, consent management, data processing records.
- Regular compliance reviews and third-party audits.

---

## 15. Team composition and roles

Core team (Phase 1–2)
- Product Manager (1) — feature priorities and acceptance criteria.
- Design Lead (1) — design system steward and accessibility champion.
- Frontend Engineers (2–3) — React, Storybook, tokens, animations.
- Backend Engineers (1–2) — API, sync, event sourcing basics.
- SRE/DevOps (1) — CI/CD, monitoring, infra.
- QA/Accessibility Engineer (1) — automated tests and manual accessibility validation.
- Optional: ML Engineer (Phase 3) — AI-assisted features.

Governance
- Design tokens and component merges require cross-team approval (design + frontend + QA).
- Token drift enforcement via CI.
- Weekly syncs between Product, Design, and Engineering for the roadmap and scope adjustments.

---

## 16. Risks, mitigation, and contingency plans

Risk: Animation / Rendering performance on low-end devices
- Mitigation: AnimationOrchestrator to throttle; device-tier detection; prefers-reduced-motion default for affected devices; synthetic device tests; deferred/offscreen animations.

Risk: Collaboration complexity (concurrent edits)
- Mitigation: Use Yjs for text CRDTs; field-level LWW for structured data; server reconciliation and user-visible conflict resolution where needed.

Risk: Token drift between design and implementation
- Mitigation: Token pipeline + CI drift check; require committed dist artifacts and changelog on token changes.

Risk: Real-time scaling
- Mitigation: Gateway architecture with Redis pub/sub; subscription limits and backpressure; capacity planning and per-connection metrics; plan to adopt managed WebSocket services if needed.

Risk: Accessibility regressions
- Mitigation: Axe-driven CI checks; keyboard interaction E2E; screen reader manual checklists.

Risk: Security & data leakage
- Mitigation: Zero-trust auth/authz; audit logging; pen-tests and SCA.

Contingencies
- If event-store approach introduces unacceptable latency, fallback to hybrid approach: synchronous writes to Postgres + async event publication for analytics and augments.

---

## 17. Metrics, dashboards, and KPIs

Product KPIs
- Daily Active Users (DAU)
- Team adoption rate within 90 days
- Task completion rate (on-time) delta
- Time-to-first-value (time to create first task)

Operational KPIs
- API p50/p95 latency, error rate
- WebSocket connection health, messages/sec per node
- Build/test pass rates and a11y pass rate in CI

UX KPIs
- FCP/LCP/TTI for core views
- Animation FPS and long task counts on synthetic devices
- Chromatic visual regression pass rate

---

## 18. Documentation & handoff artifacts

Phase A deliverables (must be committed)
- LimeAura design tokens (source JSON + generated dist)
- Storybook with component stories and a11y checks
- Token pipeline scripts and token unit tests
- AnimationOrchestrator utility and demo story
- Offline store (Yjs + IndexedDB) demo and sync stub
- CI workflows: token pipeline, Storybook build, visual regression, synthetic device tests
- Developer onboarding README with local commands and token bump process

Handoff documents
- Component API reference (props, events, accessibility notes)
- Token catalog and mapping to CSS variables
- Animation and performance guidelines
- Runbooks for SRE (incidents, scaling, DR)

---

## 19. Milestones and timeline (high-level)

Week 0: Project kickoff, repo scaffolding, token pipeline plan  
Weeks 1–2: Token pipeline, Storybook baseline, Card + Button components  
Weeks 3–6: Core components, AnimationOrchestrator, offline-store prototype, CI gates  
Weeks 7–12: Kanban & List flows, API scaffolding, optimistic sync, basic notifications, Storybook polish  
Weeks 13–26: Gantt/Calendar, time-tracking, integrations, server-side aggregations  
Weeks 27–40: Dashboard customization, AI features, advanced analytics  
Weeks 41–52: Enterprise security (SAML), SRE hardening, compliance, full launch readiness

Each milestone requires a formal demo, accessibility audit, visual regression sign-off, and performance check.

---

## 20. Acceptance criteria for full product launch

- Core functionality: Projects, Tasks, Kanban, List, Comments, Attachments, Notifications, Dashboards basic widgets.
- UI fidelity: Storybook-driven components match LimeAura tokens; Chromatic baseline approved.
- Accessibility: zero critical axe violations and manual keyboard/screen reader acceptance for core flows.
- Performance: Core dashboard load/render within defined budgets on median devices; synthetic low-end device tests pass.
- Reliability: SRE-approved production deployment with monitoring, SLOs, and rollback tested.
- Security & compliance: Pen test done, encryption validated, GDPR/CCPA checks completed.
- Observability: RUM, tracing, and alerting configured; dashboards for key KPIs active.

---

## 21. Appendix

A. References and required reading
- LimeAura design system (limeaura-design-system.json)
- Local-First principles: Ink & Switch
- Yjs documentation (CRDT library)
- WCAG 2.1 AA guidelines
- Web Performance budgeting (web.dev materials)

B. CI & developer commands (quick)
- Build tokens:
  - cd design-tokens && npm ci && npm run build
- Run token tests (Jest):
  - cd design-tokens && npm ci && npm run test
- Start Storybook (frontend):
  - cd packages/frontend && npm ci && npm run storybook
- Run Playwright synthetic tests:
  - cd packages/frontend && npm ci && npx playwright test --project="Low-end Mobile"

C. Contact & governance
- Design owner: Design Lead (email)
- Token steward & merges: Frontend lead + Design lead approval required
- Security & compliance owner: Security lead (email)

---

https://copilot.microsoft.com/shares/JVi9uwwum2o5VV6rjmkkx
- generate a one-page executive summary slide and a Phase A task breakdown with GitHub Issues templates.

Which should I produce next?
