# Project Architecture Document (PAD)
## LimeAura Productivity Suite

### Document Version: 1.0.0
### Last Updated: November 2024
### Status: Foundation Phase (Phase A Active)

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [System Architecture Overview](#2-system-architecture-overview)
3. [Project Structure & File Hierarchy](#3-project-structure--file-hierarchy)
4. [Application Logic Flow](#4-application-logic-flow)
5. [Module Architecture & Interactions](#5-module-architecture--interactions)
6. [Data Architecture](#6-data-architecture)
7. [Implementation Patterns](#7-implementation-patterns)
8. [Security Architecture](#8-security-architecture)
9. [Development Guidelines](#9-development-guidelines)
10. [Deployment Architecture](#10-deployment-architecture)

---

## 1. Executive Summary

### 1.1 Mission Statement

**Transform team productivity through intelligent, delightful, and accessible collaboration tools that adapt to how modern teams actually work.**

LimeAura exists to eliminate the friction between planning and execution. We believe productivity tools should energize teams, not drain them. Every interaction should feel fluid, every insight should arrive just in time, and every team member should feel empowered to do their best work.

### 1.2 Vision

**By 2025, LimeAura will be the gold standard for team productivity platforms, recognized for:**
- **Speed**: Sub-second interactions that feel instant
- **Intelligence**: AI that anticipates needs without being intrusive
- **Beauty**: Interfaces that inspire through thoughtful motion and color
- **Accessibility**: Universal usability regardless of ability or device
- **Reliability**: 99.99% uptime with seamless offline capability

### 1.3 Core Value Propositions

```mermaid
graph TB
    subgraph "LimeAura Value Matrix"
        A[Instant Performance] -->|Enables| B[Flow State]
        C[Visual Excellence] -->|Creates| D[User Delight]
        E[Smart Automation] -->|Delivers| F[Time Savings]
        G[Real-time Sync] -->|Ensures| H[Team Alignment]
        I[Offline-First] -->|Provides| J[Uninterrupted Work]
        
        B --> K[20% Productivity Gain]
        D --> K
        F --> K
        H --> K
        J --> K
    end
    
    style A fill:#D6F25F
    style C fill:#D6F25F
    style E fill:#D6F25F
    style G fill:#D6F25F
    style I fill:#D6F25F
    style K fill:#7B3EFF,color:#fff
```

### 1.4 Success Metrics

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| Page Load Time (P75) | < 1.5s | RUM Analytics |
| Time to First Interaction | < 2s | Lighthouse CI |
| Task Completion Rate | > 85% | Event Analytics |
| User Adoption (90 days) | > 70% | Active User Metrics |
| System Uptime | 99.9% | Monitoring Systems |
| Accessibility Score | 100% | Automated Testing |
| Customer Satisfaction | > 4.5/5 | NPS Surveys |

---

## 2. System Architecture Overview

### 2.1 High-Level Architecture

```mermaid
graph TB
    subgraph "Client Layer"
        PWA[Progressive Web App]
        Mobile[Mobile Apps]
        Desktop[Desktop Apps]
    end
    
    subgraph "Edge Layer"
        CDN[CDN/Edge Workers]
        WAF[Web Application Firewall]
    end
    
    subgraph "API Gateway"
        GW[API Gateway/Load Balancer]
        WS[WebSocket Gateway]
    end
    
    subgraph "Application Services"
        AUTH[Auth Service]
        CORE[Core API Service]
        RT[Real-time Service]
        AI[AI Service]
        NOTIFY[Notification Service]
    end
    
    subgraph "Data Layer"
        PG[(PostgreSQL)]
        REDIS[(Redis)]
        S3[Object Storage]
        ES[(Elasticsearch)]
    end
    
    subgraph "Infrastructure"
        K8S[Kubernetes Cluster]
        MONITOR[Monitoring Stack]
        QUEUE[Message Queue]
    end
    
    PWA --> CDN
    Mobile --> CDN
    Desktop --> CDN
    CDN --> WAF
    WAF --> GW
    WAF --> WS
    
    GW --> AUTH
    GW --> CORE
    WS --> RT
    CORE --> AI
    CORE --> NOTIFY
    
    AUTH --> REDIS
    CORE --> PG
    CORE --> S3
    RT --> REDIS
    RT --> QUEUE
    NOTIFY --> QUEUE
    CORE --> ES
    
    Application Services --> K8S
    K8S --> MONITOR
    
    style PWA fill:#D6F25F
    style CORE fill:#7B3EFF,color:#fff
    style RT fill:#7B3EFF,color:#fff
```

### 2.2 Technology Stack

#### Frontend Stack
```yaml
Core Framework: React 18.2+ with Concurrent Features
Build Tool: Vite 5.0+
Language: TypeScript 5.3+ (strict mode)
State Management:
  Local: Zustand 4.4+
  Server: TanStack Query 5.0+
  Offline: Yjs + IndexedDB
Styling:
  CSS Modules + PostCSS
  Design Tokens: Custom Pipeline
  Animations: Framer Motion + Custom Orchestrator
Testing:
  Unit: Vitest + React Testing Library
  E2E: Playwright
  Visual: Chromatic
PWA: Workbox 7.0+
```

#### Backend Stack
```yaml
Runtime: Node.js 20 LTS
Framework: Fastify 4.0+
Language: TypeScript 5.3+
Database:
  Primary: PostgreSQL 16
  Cache: Redis 7.2+
  Search: Elasticsearch 8.0+
  Time-series: TimescaleDB
Real-time:
  WebSocket: Socket.io 4.0+
  Pub/Sub: Redis Streams
  Queue: BullMQ
Authentication: 
  JWT + OAuth2
  SAML 2.0 (Enterprise)
API:
  REST: OpenAPI 3.0
  GraphQL: Apollo Server 4.0+
```

#### Infrastructure Stack
```yaml
Container: Docker 24+
Orchestration: Kubernetes 1.28+
CI/CD: GitHub Actions + ArgoCD
Monitoring:
  Metrics: Prometheus + Grafana
  Logs: ELK Stack
  APM: OpenTelemetry
  Errors: Sentry
Cloud: AWS/GCP (Multi-region)
CDN: Cloudflare
```

---

## 3. Project Structure & File Hierarchy

### 3.1 Complete Project Structure

```
limeaura/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml                 # Main CI pipeline
│   │   ├── deploy-staging.yml     # Staging deployment
│   │   ├── deploy-production.yml  # Production deployment
│   │   └── security-scan.yml      # Security scanning
│   └── CODEOWNERS                 # Code ownership rules
│
├── design-tokens/
│   ├── src/
│   │   └── limeaura-design-system.json  # Source design tokens
│   ├── scripts/
│   │   ├── build-tokens.mjs       # Token build script
│   │   ├── validate-tokens.mjs    # Token validation
│   │   └── sync-figma.mjs        # Figma sync script
│   └── dist/                      # Generated tokens
│       ├── tokens.css
│       ├── tokens.ts
│       └── tokens.json
│
├── packages/
│   ├── frontend/
│   │   ├── src/
│   │   │   ├── components/        # UI Components
│   │   │   │   ├── atoms/
│   │   │   │   │   ├── Button/
│   │   │   │   │   │   ├── Button.tsx
│   │   │   │   │   │   ├── Button.module.css
│   │   │   │   │   │   ├── Button.test.tsx
│   │   │   │   │   │   └── Button.stories.tsx
│   │   │   │   │   ├── Avatar/
│   │   │   │   │   ├── Badge/
│   │   │   │   │   └── Icon/
│   │   │   │   ├── molecules/
│   │   │   │   │   ├── Card/
│   │   │   │   │   ├── TaskItem/
│   │   │   │   │   ├── ProgressCircular/
│   │   │   │   │   └── NotificationItem/
│   │   │   │   ├── organisms/
│   │   │   │   │   ├── KanbanBoard/
│   │   │   │   │   ├── GanttChart/
│   │   │   │   │   ├── Calendar/
│   │   │   │   │   └── Dashboard/
│   │   │   │   └── templates/
│   │   │   │       ├── AppLayout/
│   │   │   │       ├── AuthLayout/
│   │   │   │       └── DashboardLayout/
│   │   │   │
│   │   │   ├── features/          # Feature modules
│   │   │   │   ├── auth/
│   │   │   │   │   ├── components/
│   │   │   │   │   ├── hooks/
│   │   │   │   │   ├── services/
│   │   │   │   │   └── stores/
│   │   │   │   ├── projects/
│   │   │   │   │   ├── components/
│   │   │   │   │   ├── hooks/
│   │   │   │   │   ├── services/
│   │   │   │   │   └── stores/
│   │   │   │   ├── tasks/
│   │   │   │   ├── dashboard/
│   │   │   │   └── settings/
│   │   │   │
│   │   │   ├── hooks/             # Shared hooks
│   │   │   │   ├── useAnimation.ts
│   │   │   │   ├── useOfflineSync.ts
│   │   │   │   ├── useWebSocket.ts
│   │   │   │   └── useAccessibility.ts
│   │   │   │
│   │   │   ├── services/          # API services
│   │   │   │   ├── api.ts
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── task.service.ts
│   │   │   │   └── realtime.service.ts
│   │   │   │
│   │   │   ├── stores/            # Global stores
│   │   │   │   ├── app.store.ts
│   │   │   │   ├── user.store.ts
│   │   │   │   └── offline.store.ts
│   │   │   │
│   │   │   ├── utils/             # Utilities
│   │   │   │   ├── AnimationOrchestrator.ts
│   │   │   │   ├── DeviceCapabilities.ts
│   │   │   │   ├── OfflineQueue.ts
│   │   │   │   └── SecurityUtils.ts
│   │   │   │
│   │   │   ├── types/             # TypeScript types
│   │   │   │   ├── api.types.ts
│   │   │   │   ├── models.types.ts
│   │   │   │   └── components.types.ts
│   │   │   │
│   │   │   ├── App.tsx
│   │   │   ├── main.tsx
│   │   │   └── vite-env.d.ts
│   │   │
│   │   ├── public/
│   │   │   ├── manifest.json      # PWA manifest
│   │   │   ├── sw.js             # Service worker
│   │   │   └── icons/
│   │   │
│   │   ├── .storybook/
│   │   ├── tests/
│   │   │   ├── unit/
│   │   │   ├── integration/
│   │   │   └── e2e/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── vite.config.ts
│   │   └── playwright.config.ts
│   │
│   ├── backend/
│   │   ├── src/
│   │   │   ├── modules/           # Feature modules
│   │   │   │   ├── auth/
│   │   │   │   │   ├── auth.controller.ts
│   │   │   │   │   ├── auth.service.ts
│   │   │   │   │   ├── auth.repository.ts
│   │   │   │   │   ├── auth.dto.ts
│   │   │   │   │   └── auth.test.ts
│   │   │   │   ├── projects/
│   │   │   │   ├── tasks/
│   │   │   │   ├── users/
│   │   │   │   └── realtime/
│   │   │   │
│   │   │   ├── core/              # Core functionality
│   │   │   │   ├── database/
│   │   │   │   │   ├── migrations/
│   │   │   │   │   ├── seeds/
│   │   │   │   │   └── connection.ts
│   │   │   │   ├── cache/
│   │   │   │   ├── queue/
│   │   │   │   └── websocket/
│   │   │   │
│   │   │   ├── shared/            # Shared utilities
│   │   │   │   ├── middleware/
│   │   │   │   ├── decorators/
│   │   │   │   ├── guards/
│   │   │   │   └── utils/
│   │   │   │
│   │   │   ├── config/
│   │   │   │   ├── app.config.ts
│   │   │   │   ├── database.config.ts
│   │   │   │   └── redis.config.ts
│   │   │   │
│   │   │   ├── app.ts
│   │   │   └── server.ts
│   │   │
│   │   ├── tests/
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── shared/                    # Shared packages
│   │   ├── types/
│   │   ├── utils/
│   │   └── constants/
│   │
│   └── mobile/                    # Future mobile apps
│       ├── ios/
│       └── android/
│
├── infrastructure/
│   ├── kubernetes/
│   │   ├── base/
│   │   ├── staging/
│   │   └── production/
│   ├── terraform/
│   └── docker/
│       ├── frontend.Dockerfile
│       └── backend.Dockerfile
│
├── scripts/
│   ├── setup.sh                   # Initial setup
│   ├── dev.sh                     # Development startup
│   └── deploy.sh                  # Deployment script
│
├── docs/
│   ├── architecture/
│   ├── api/
│   ├── deployment/
│   └── contributing/
│
├── package.json                    # Root package.json
├── pnpm-workspace.yaml            # PNPM workspace config
├── turbo.json                     # Turborepo config
├── .env.example
├── .gitignore
├── README.md
└── LICENSE
```

### 3.2 Key File Descriptions

#### Critical Configuration Files

| File | Purpose | Key Contents |
|------|---------|--------------|
| `turbo.json` | Monorepo task orchestration | Build pipeline, caching strategy, task dependencies |
| `pnpm-workspace.yaml` | Workspace package management | Package locations, shared dependencies |
| `.env.example` | Environment template | Required env vars with descriptions |
| `CODEOWNERS` | Code review automation | Team ownership mappings |

#### Core Application Files

| File | Purpose | Key Responsibilities |
|------|---------|---------------------|
| `frontend/src/App.tsx` | Root application component | Router setup, global providers, error boundaries |
| `frontend/src/main.tsx` | Application entry point | React mounting, service worker registration |
| `backend/src/server.ts` | Server entry point | HTTP server, WebSocket setup, graceful shutdown |
| `backend/src/app.ts` | Application configuration | Middleware, routes, error handling |

#### Critical Services

| File | Purpose | Key Features |
|------|---------|--------------|
| `AnimationOrchestrator.ts` | Animation performance management | Device detection, frame budgeting, staggering |
| `OfflineQueue.ts` | Offline operation queue | CRDT sync, conflict resolution, retry logic |
| `realtime.service.ts` | WebSocket management | Connection pooling, subscription limits, backpressure |
| `auth.service.ts` | Authentication logic | JWT, OAuth, RBAC, session management |

---

## 4. Application Logic Flow

### 4.1 Core Application Flow

```mermaid
flowchart TB
    subgraph "Application Initialization"
        Start[App Start] --> CheckAuth{Authenticated?}
        CheckAuth -->|Yes| LoadUser[Load User Profile]
        CheckAuth -->|No| ShowAuth[Show Auth Screen]
        ShowAuth --> Auth[Authenticate]
        Auth --> LoadUser
        LoadUser --> LoadWorkspace[Load Workspace]
        LoadWorkspace --> InitServices[Initialize Services]
    end
    
    subgraph "Service Initialization"
        InitServices --> InitOffline[Init Offline Store]
        InitServices --> InitWebSocket[Init WebSocket]
        InitServices --> InitAnimation[Init Animation System]
        InitOffline --> SyncQueue[Sync Offline Queue]
        InitWebSocket --> Subscribe[Subscribe Channels]
        InitAnimation --> DetectDevice[Detect Capabilities]
    end
    
    subgraph "Main Application Loop"
        Subscribe --> AppReady[App Ready]
        SyncQueue --> AppReady
        DetectDevice --> AppReady
        AppReady --> UserAction{User Action}
        
        UserAction -->|Create Task| CreateFlow[Create Task Flow]
        UserAction -->|Update Task| UpdateFlow[Update Task Flow]
        UserAction -->|View Dashboard| DashboardFlow[Dashboard Flow]
        UserAction -->|Navigate| RouteFlow[Route Change Flow]
        
        CreateFlow --> OptimisticUpdate[Optimistic UI Update]
        UpdateFlow --> OptimisticUpdate
        OptimisticUpdate --> QueueSync[Queue for Sync]
        QueueSync --> ServerSync[Sync with Server]
        ServerSync --> UpdateUI[Update UI with Result]
        UpdateUI --> UserAction
        
        DashboardFlow --> FetchWidgets[Fetch Widget Data]
        FetchWidgets --> RenderDashboard[Render Dashboard]
        RenderDashboard --> UserAction
    end
    
    subgraph "Real-time Updates"
        ServerSync --> BroadcastChange[Broadcast to Team]
        BroadcastChange --> WSMessage[WebSocket Message]
        WSMessage --> HandleMessage[Handle RT Message]
        HandleMessage --> UpdateLocalState[Update Local State]
        UpdateLocalState --> UpdateUI
    end
    
    style Start fill:#D6F25F
    style AppReady fill:#7B3EFF,color:#fff
    style OptimisticUpdate fill:#00C6AE
```

### 4.2 Task Creation Flow (Detailed)

```mermaid
sequenceDiagram
    participant U as User
    participant UI as UI Layer
    participant OS as Offline Store
    participant Q as Sync Queue
    participant API as API Service
    participant WS as WebSocket
    participant DB as Database
    participant Team as Team Members
    
    U->>UI: Click "Create Task"
    UI->>UI: Show Task Form
    U->>UI: Enter Task Details
    U->>UI: Submit Form
    
    UI->>UI: Validate Input
    UI->>OS: Save to IndexedDB
    OS->>OS: Generate Local ID
    OS->>OS: Apply CRDT Operations
    OS-->>UI: Return Optimistic Task
    
    UI->>UI: Update UI Immediately
    UI->>U: Show Success Toast
    
    UI->>Q: Add to Sync Queue
    
    alt Online
        Q->>API: POST /api/tasks
        API->>API: Validate & Authorize
        API->>DB: Insert Task
        DB-->>API: Return Task with ID
        API->>WS: Publish Task Created
        WS->>Team: Broadcast Update
        API-->>Q: Return Success
        Q->>OS: Update with Server ID
        OS->>UI: Reconcile State
    else Offline
        Q->>Q: Mark for Later Sync
        Note over Q: Will retry when online
    end
```

### 4.3 Authentication & Authorization Flow

```mermaid
flowchart LR
    subgraph "Authentication Flow"
        Login[Login Request] --> CheckCreds{Valid?}
        CheckCreds -->|Yes| GenerateTokens[Generate JWT + Refresh]
        CheckCreds -->|No| LoginError[Return Error]
        
        GenerateTokens --> StoreTokens[Store in Cookie/LocalStorage]
        StoreTokens --> LoadPermissions[Load User Permissions]
        LoadPermissions --> CachePerms[Cache in Redis]
        CachePerms --> AuthComplete[Auth Complete]
    end
    
    subgraph "Authorization Flow"
        Request[API Request] --> ExtractToken[Extract JWT]
        ExtractToken --> ValidateToken{Valid JWT?}
        ValidateToken -->|No| Unauthorized[401 Unauthorized]
        ValidateToken -->|Yes| CheckPerms[Check Permissions]
        
        CheckPerms --> CacheCheck{In Cache?}
        CacheCheck -->|Yes| ValidatePerms[Validate Against Resource]
        CacheCheck -->|No| LoadFromDB[Load from Database]
        LoadFromDB --> UpdateCache[Update Cache]
        UpdateCache --> ValidatePerms
        
        ValidatePerms --> HasAccess{Authorized?}
        HasAccess -->|Yes| ProcessRequest[Process Request]
        HasAccess -->|No| Forbidden[403 Forbidden]
    end
    
    style AuthComplete fill:#10B981
    style ProcessRequest fill:#10B981
    style Unauthorized fill:#EF4444
    style Forbidden fill:#EF4444
```

---

## 5. Module Architecture & Interactions

### 5.1 Frontend Module Architecture

```mermaid
graph TB
    subgraph "Frontend Architecture"
        subgraph "Presentation Layer"
            Pages[Pages/Routes]
            Templates[Templates]
            Organisms[Organisms]
            Molecules[Molecules]
            Atoms[Atoms]
        end
        
        subgraph "Feature Modules"
            AuthModule[Auth Module]
            ProjectModule[Projects Module]
            TaskModule[Tasks Module]
            DashboardModule[Dashboard Module]
        end
        
        subgraph "State Management"
            GlobalStore[Global Stores]
            FeatureStores[Feature Stores]
            ServerCache[Server State Cache]
            LocalCache[Local State Cache]
        end
        
        subgraph "Service Layer"
            APIService[API Service]
            WSService[WebSocket Service]
            OfflineService[Offline Service]
            AuthService[Auth Service]
        end
        
        subgraph "Infrastructure"
            Router[Router]
            ErrorBoundary[Error Boundaries]
            Providers[Context Providers]
            Guards[Route Guards]
        end
        
        Pages --> Templates
        Templates --> Organisms
        Organisms --> Molecules
        Molecules --> Atoms
        
        Pages --> FeatureModules
        
        AuthModule --> AuthService
        ProjectModule --> APIService
        TaskModule --> APIService
        TaskModule --> WSService
        DashboardModule --> APIService
        
        FeatureModules --> FeatureStores
        FeatureStores --> GlobalStore
        
        APIService --> ServerCache
        OfflineService --> LocalCache
        
        Router --> Guards
        Guards --> AuthService
        Pages --> ErrorBoundary
        ErrorBoundary --> Providers
    end
    
    style Pages fill:#D6F25F
    style APIService fill:#7B3EFF,color:#fff
    style GlobalStore fill:#00C6AE
```

### 5.2 Backend Module Architecture

```mermaid
graph TB
    subgraph "Backend Architecture"
        subgraph "API Layer"
            REST[REST API]
            GraphQL[GraphQL API]
            WebSocket[WebSocket Server]
        end
        
        subgraph "Business Logic"
            AuthModule[Auth Module]
            ProjectModule[Project Module]
            TaskModule[Task Module]
            NotificationModule[Notification Module]
            ReportingModule[Reporting Module]
        end
        
        subgraph "Data Access Layer"
            Repositories[Repositories]
            QueryBuilder[Query Builder]
            ORMLayer[ORM Layer]
        end
        
        subgraph "Infrastructure Services"
            CacheService[Cache Service]
            QueueService[Queue Service]
            EventBus[Event Bus]
            LoggingService[Logging Service]
        end
        
        subgraph "External Services"
            EmailProvider[Email Provider]
            StorageProvider[Storage Provider]
            AIProvider[AI Provider]
        end
        
        REST --> AuthModule
        REST --> ProjectModule
        REST --> TaskModule
        GraphQL --> ProjectModule
        GraphQL --> TaskModule
        WebSocket --> NotificationModule
        
        AuthModule --> Repositories
        ProjectModule --> Repositories
        TaskModule --> Repositories
        TaskModule --> EventBus
        
        Repositories --> QueryBuilder
        QueryBuilder --> ORMLayer
        
        NotificationModule --> QueueService
        NotificationModule --> EmailProvider
        
        ReportingModule --> CacheService
        TaskModule --> AIProvider
        
        EventBus --> QueueService
        QueueService --> NotificationModule
    end
    
    style REST fill:#D6F25F
    style GraphQL fill:#D6F25F
    style WebSocket fill:#D6F25F
    style EventBus fill:#7B3EFF,color:#fff
```

### 5.3 User Interaction Flow

```mermaid
stateDiagram-v2
    [*] --> Landing
    Landing --> Authentication: Start
    
    Authentication --> Loading: Success
    Authentication --> Authentication: Failure
    
    Loading --> Dashboard: Data Loaded
    
    Dashboard --> ProjectView: Select Project
    Dashboard --> Settings: Open Settings
    Dashboard --> CreateTask: Quick Create
    
    ProjectView --> KanbanView: View as Kanban
    ProjectView --> GanttView: View as Gantt
    ProjectView --> ListView: View as List
    ProjectView --> CalendarView: View as Calendar
    
    KanbanView --> TaskDetail: Select Task
    GanttView --> TaskDetail: Select Task
    ListView --> TaskDetail: Select Task
    CalendarView --> TaskDetail: Select Task
    
    TaskDetail --> EditTask: Edit
    EditTask --> TaskDetail: Save
    TaskDetail --> ProjectView: Close
    
    CreateTask --> TaskDetail: Created
    
    Settings --> Profile: Edit Profile
    Settings --> Workspace: Manage Workspace
    Settings --> Integrations: Configure Integrations
    
    Profile --> Settings: Save
    Workspace --> Settings: Save
    Integrations --> Settings: Save
    
    Settings --> Dashboard: Close
    ProjectView --> Dashboard: Back
    
    Dashboard --> [*]: Logout
```

---

## 6. Data Architecture

### 6.1 Database Schema

```mermaid
erDiagram
    Organization ||--o{ Workspace : contains
    Organization ||--o{ User : has
    
    Workspace ||--o{ Project : contains
    Workspace ||--o{ WorkspaceMember : has
    
    User ||--o{ WorkspaceMember : is
    User ||--o{ Task : creates
    User ||--o{ Task : assigned_to
    User ||--o{ Comment : writes
    User ||--o{ TimeLog : logs
    
    Project ||--o{ Task : contains
    Project ||--o{ Milestone : has
    Project ||--o{ ProjectMember : has
    
    Task ||--o{ Subtask : has
    Task ||--o{ Comment : has
    Task ||--o{ Attachment : has
    Task ||--o{ TimeLog : tracks
    Task ||--o{ TaskDependency : depends_on
    Task ||--o{ TaskHistory : has_history
    
    Milestone ||--o{ Task : includes
    
    Organization {
        uuid id PK
        string name
        string slug
        json settings
        timestamp created_at
        timestamp updated_at
    }
    
    User {
        uuid id PK
        string email UK
        string name
        string avatar_url
        json preferences
        timestamp last_seen
        timestamp created_at
    }
    
    Workspace {
        uuid id PK
        uuid org_id FK
        string name
        string slug UK
        json settings
        timestamp created_at
    }
    
    Project {
        uuid id PK
        uuid workspace_id FK
        string name
        text description
        enum status
        date start_date
        date end_date
        json metadata
        timestamp created_at
    }
    
    Task {
        uuid id PK
        uuid project_id FK
        uuid parent_id FK
        string title
        text description
        enum status
        enum priority
        uuid assignee_id FK
        uuid creator_id FK
        date due_date
        integer estimated_hours
        integer actual_hours
        json custom_fields
        integer version
        timestamp created_at
        timestamp updated_at
    }
    
    TaskHistory {
        uuid id PK
        uuid task_id FK
        uuid user_id FK
        json changes
        string event_type
        timestamp created_at
    }
```

### 6.2 State Management Architecture

```mermaid
graph TB
    subgraph "Client State Architecture"
        subgraph "Persistent State"
            IndexedDB[IndexedDB]
            LocalStorage[LocalStorage]
            SessionStorage[SessionStorage]
        end
        
        subgraph "Runtime State"
            ZustandStore[Zustand Stores]
            ReactQuery[React Query Cache]
            YjsDoc[Yjs Document]
        end
        
        subgraph "State Synchronization"
            SyncEngine[Sync Engine]
            ConflictResolver[Conflict Resolver]
            VersionManager[Version Manager]
        end
        
        IndexedDB <--> SyncEngine
        LocalStorage <--> ZustandStore
        SessionStorage <--> ReactQuery
        
        SyncEngine <--> YjsDoc
        SyncEngine <--> ConflictResolver
        ConflictResolver <--> VersionManager
        
        YjsDoc <--> ZustandStore
        ReactQuery <--> ZustandStore
    end
    
    subgraph "Server State"
        PostgreSQL[(PostgreSQL)]
        Redis[(Redis Cache)]
        CDNCache[CDN Cache]
    end
    
    SyncEngine <--> API[API Layer]
    API <--> PostgreSQL
    API <--> Redis
    API --> CDNCache
    
    style IndexedDB fill:#D6F25F
    style ZustandStore fill:#7B3EFF,color:#fff
    style SyncEngine fill:#00C6AE
```

### 6.3 Caching Strategy

| Cache Level | Technology | TTL | Use Case |
|-------------|------------|-----|----------|
| L1 - Browser | IndexedDB | Persistent | Offline data, user preferences |
| L2 - Memory | React Query | 5 min | Active session data |
| L3 - Edge | Cloudflare KV | 1 min | Static resources, public data |
| L4 - Server | Redis | 10 min | Session data, frequent queries |
| L5 - Database | Materialized Views | 1 hour | Analytics, reports |

---

## 7. Implementation Patterns

### 7.1 Component Development Pattern

```typescript
// Standard component structure
// components/atoms/Button/Button.tsx

import React, { forwardRef } from 'react';
import { AnimationOrchestrator } from '@/utils/AnimationOrchestrator';
import { useAccessibility } from '@/hooks/useAccessibility';
import styles from './Button.module.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    variant = 'primary', 
    size = 'md', 
    loading = false,
    fullWidth = false,
    icon,
    children,
    className,
    disabled,
    onClick,
    ...props 
  }, ref) => {
    const orchestrator = AnimationOrchestrator.getInstance();
    const { announceAction } = useAccessibility();
    
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (loading || disabled) return;
      
      // Accessibility announcement
      announceAction(`Button ${children} activated`);
      
      // Animation
      orchestrator.scheduleAnimation(e.currentTarget, {
        animation: 'buttonPress',
        duration: 200,
        critical: true
      });
      
      onClick?.(e);
    };
    
    return (
      <button
        ref={ref}
        className={`
          ${styles.button}
          ${styles[variant]}
          ${styles[size]}
          ${fullWidth ? styles.fullWidth : ''}
          ${loading ? styles.loading : ''}
          ${className || ''}
        `}
        disabled={disabled || loading}
        onClick={handleClick}
        aria-busy={loading}
        aria-disabled={disabled || loading}
        {...props}
      >
        {loading && <span className={styles.spinner} aria-hidden="true" />}
        {icon && <span className={styles.icon}>{icon}</span>}
        <span className={styles.content}>{children}</span>
      </button>
    );
  }
);

Button.displayName = 'Button';
```

### 7.2 Service Pattern

```typescript
// Standard service structure
// services/task.service.ts

import { apiClient } from '@/services/api';
import { offlineStore } from '@/stores/offline.store';
import { wsService } from '@/services/websocket.service';
import type { Task, CreateTaskDTO, UpdateTaskDTO } from '@/types';

export class TaskService {
  private static instance: TaskService;
  
  static getInstance(): TaskService {
    if (!TaskService.instance) {
      TaskService.instance = new TaskService();
    }
    return TaskService.instance;
  }
  
  async createTask(data: CreateTaskDTO): Promise<Task> {
    // Optimistic creation
    const optimisticTask = await offlineStore.createTask(data);
    
    try {
      // Attempt server sync
      const serverTask = await apiClient.post<Task>('/tasks', data);
      
      // Reconcile with server response
      await offlineStore.reconcileTask(optimisticTask.id, serverTask);
      
      // Broadcast via WebSocket
      wsService.emit('task:created', serverTask);
      
      return serverTask;
    } catch (error) {
      // Queue for later sync
      await offlineStore.queueSync('CREATE_TASK', optimisticTask);
      return optimisticTask;
    }
  }
  
  async updateTask(id: string, updates: UpdateTaskDTO): Promise<Task> {
    // Apply optimistic update
    await offlineStore.updateTask(id, updates);
    
    try {
      const updatedTask = await apiClient.patch<Task>(`/tasks/${id}`, updates);
      await offlineStore.reconcileTask(id, updatedTask);
      wsService.emit('task:updated', updatedTask);
      return updatedTask;
    } catch (error) {
      await offlineStore.queueSync('UPDATE_TASK', { id, updates });
      throw error;
    }
  }
  
  subscribeToTaskUpdates(projectId: string, callback: (task: Task) => void): () => void {
    const unsubscribe = wsService.subscribe(`project:${projectId}:tasks`, callback);
    return unsubscribe;
  }
}

export const taskService = TaskService.getInstance();
```

### 7.3 Store Pattern

```typescript
// Standard store structure
// stores/project.store.ts

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { Project, Task } from '@/types';

interface ProjectState {
  projects: Map<string, Project>;
  activeProjectId: string | null;
  filters: {
    status: string[];
    assignee: string[];
    priority: string[];
  };
  sorting: {
    field: string;
    direction: 'asc' | 'desc';
  };
}

interface ProjectActions {
  setProjects: (projects: Project[]) => void;
  setActiveProject: (projectId: string) => void;
  updateProject: (projectId: string, updates: Partial<Project>) => void;
  setFilter: (filterType: string, values: string[]) => void;
  setSorting: (field: string, direction: 'asc' | 'desc') => void;
  reset: () => void;
}

const initialState: ProjectState = {
  projects: new Map(),
  activeProjectId: null,
  filters: {
    status: [],
    assignee: [],
    priority: []
  },
  sorting: {
    field: 'created_at',
    direction: 'desc'
  }
};

export const useProjectStore = create<ProjectState & ProjectActions>()(
  devtools(
    persist(
      immer((set) => ({
        ...initialState,
        
        setProjects: (projects) => set((state) => {
          state.projects.clear();
          projects.forEach(p => {
            state.projects.set(p.id, p);
          });
        }),
        
        setActiveProject: (projectId) => set((state) => {
          state.activeProjectId = projectId;
        }),
        
        updateProject: (projectId, updates) => set((state) => {
          const project = state.projects.get(projectId);
          if (project) {
            Object.assign(project, updates);
          }
        }),
        
        setFilter: (filterType, values) => set((state) => {
          state.filters[filterType] = values;
        }),
        
        setSorting: (field, direction) => set((state) => {
          state.sorting.field = field;
          state.sorting.direction = direction;
        }),
        
        reset: () => set(initialState)
      })),
      {
        name: 'project-store',
        partialize: (state) => ({
          activeProjectId: state.activeProjectId,
          filters: state.filters,
          sorting: state.sorting
        })
      }
    )
  )
);
```

---

## 8. Security Architecture

### 8.1 Security Layers

```mermaid
graph TB
    subgraph "Security Architecture"
        subgraph "Network Security"
            CloudflareWAF[Cloudflare WAF]
            DDoSProtection[DDoS Protection]
            RateLimiting[Rate Limiting]
        end
        
        subgraph "Application Security"
            Authentication[Authentication]
            Authorization[Authorization]
            InputValidation[Input Validation]
            OutputEncoding[Output Encoding]
        end
        
        subgraph "Data Security"
            Encryption[Encryption at Rest]
            TLS[TLS 1.3]
            TokenSigning[Token Signing]
            SecureStorage[Secure Storage]
        end
        
        subgraph "Audit & Monitoring"
            AuditLogs[Audit Logs]
            SecurityMonitoring[Security Monitoring]
            AnomalyDetection[Anomaly Detection]
            IncidentResponse[Incident Response]
        end
        
        CloudflareWAF --> DDoSProtection
        DDoSProtection --> RateLimiting
        RateLimiting --> Authentication
        
        Authentication --> Authorization
        Authorization --> InputValidation
        InputValidation --> OutputEncoding
        
        OutputEncoding --> Encryption
        Encryption --> TLS
        TLS --> TokenSigning
        TokenSigning --> SecureStorage
        
        SecureStorage --> AuditLogs
        AuditLogs --> SecurityMonitoring
        SecurityMonitoring --> AnomalyDetection
        AnomalyDetection --> IncidentResponse
    end
    
    style CloudflareWAF fill:#D6F25F
    style Authentication fill:#7B3EFF,color:#fff
    style Encryption fill:#00C6AE
    style AuditLogs fill:#FFB020
```

### 8.2 Security Implementation Checklist

```yaml
Authentication:
  ☐ JWT with RS256 signing
  ☐ Refresh token rotation
  ☐ Session timeout (15 min activity, 8 hour absolute)
  ☐ MFA support (TOTP)
  ☐ OAuth2 providers (Google, GitHub, Microsoft)
  ☐ SAML 2.0 for enterprise

Authorization:
  ☐ Role-Based Access Control (RBAC)
  ☐ Attribute-Based Access Control (ABAC)
  ☐ Resource-level permissions
  ☐ API rate limiting per user/role
  ☐ IP allowlisting for admin actions

Data Protection:
  ☐ AES-256 encryption at rest
  ☐ TLS 1.3 minimum for transit
  ☐ PII tokenization
  ☐ Secure key management (AWS KMS/HashiCorp Vault)
  ☐ Database field-level encryption for sensitive data

Input Validation:
  ☐ Schema validation (Zod/Joi)
  ☐ SQL injection prevention (parameterized queries)
  ☐ XSS prevention (content security policy)
  ☐ File upload restrictions
  ☐ Request size limits

Audit & Compliance:
  ☐ Comprehensive audit logging
  ☐ Log integrity verification
  ☐ GDPR compliance (data export/deletion)
  ☐ SOC 2 Type II readiness
  ☐ Regular security audits
```

---

## 9. Development Guidelines

### 9.1 Development Workflow

```mermaid
gitGraph
    commit id: "main"
    branch develop
    checkout develop
    commit id: "feature-start"
    
    branch feature/LIME-123-task-creation
    checkout feature/LIME-123-task-creation
    commit id: "implement-ui"
    commit id: "add-tests"
    commit id: "fix-review"
    
    checkout develop
    merge feature/LIME-123-task-creation
    
    branch release/1.0.0
    checkout release/1.0.0
    commit id: "bump-version"
    commit id: "update-changelog"
    
    checkout main
    merge release/1.0.0 tag: "v1.0.0"
    
    checkout develop
    merge main
```

### 9.2 Code Quality Standards

```typescript
// CODE QUALITY CHECKLIST
/**
 * ✅ TypeScript strict mode enabled
 * ✅ ESLint + Prettier configured
 * ✅ Pre-commit hooks (Husky + lint-staged)
 * ✅ Conventional commits enforced
 * ✅ 80% test coverage minimum
 * ✅ No any types without justification
 * ✅ Documented public APIs
 * ✅ Accessibility tested
 * ✅ Performance budgets met
 */

// Example: Well-structured code
/**
 * Creates a new task with optimistic updates and offline support
 * @param data - Task creation data
 * @returns Promise resolving to created task
 * @throws {ValidationError} If data is invalid
 * @throws {NetworkError} If sync fails and no offline support
 */
export async function createTask(data: CreateTaskDTO): Promise<Task> {
  // Input validation
  const validated = taskSchema.parse(data);
  
  // Performance tracking
  const perfMark = performance.mark('task-creation-start');
  
  try {
    // Business logic with error handling
    const task = await taskService.create(validated);
    
    // Measure performance
    performance.measure('task-creation', perfMark);
    
    // Analytics
    analytics.track('task_created', {
      projectId: task.projectId,
      duration: performance.getEntriesByName('task-creation')[0].duration
    });
    
    return task;
  } catch (error) {
    // Structured error handling
    if (error instanceof NetworkError && offlineCapable) {
      return offlineStore.createTask(validated);
    }
    
    logger.error('Task creation failed', { error, data: validated });
    throw error;
  }
}
```

### 9.3 Testing Strategy

```yaml
Testing Pyramid:
  Unit Tests (70%):
    - Components: React Testing Library
    - Services: Vitest
    - Utils: Vitest
    - Stores: Zustand testing utilities
    
  Integration Tests (20%):
    - API endpoints: Supertest
    - Database operations: Test containers
    - WebSocket flows: Socket.io Client
    
  E2E Tests (10%):
    - Critical user journeys: Playwright
    - Cross-browser testing: BrowserStack
    - Performance testing: Lighthouse CI
    
  Specialized Testing:
    - Accessibility: axe-core + Pa11y
    - Visual Regression: Chromatic
    - Security: OWASP ZAP
    - Load Testing: k6
```

---

## 10. Deployment Architecture

### 10.1 Deployment Pipeline

```mermaid
flowchart TB
    subgraph "CI/CD Pipeline"
        Push[Git Push] --> Lint[Lint & Format]
        Lint --> Tests[Run Tests]
        Tests --> Build[Build Artifacts]
        Build --> Security[Security Scan]
        Security --> Deploy{Branch?}
        
        Deploy -->|feature| Preview[Deploy Preview]
        Deploy -->|develop| Staging[Deploy Staging]
        Deploy -->|main| Production[Deploy Production]
        
        Preview --> E2ETests[E2E Tests]
        Staging --> SmokeTests[Smoke Tests]
        Production --> HealthCheck[Health Checks]
        
        HealthCheck --> Monitor[Monitor Metrics]
        Monitor --> Alert{Issues?}
        Alert -->|Yes| Rollback[Auto Rollback]
        Alert -->|No| Success[Deployment Success]
    end
    
    style Push fill:#D6F25F
    style Production fill:#7B3EFF,color:#fff
    style Success fill:#10B981
    style Rollback fill:#EF4444
```

### 10.2 Infrastructure Specifications

```yaml
Production Environment:
  Regions:
    Primary: us-east-1 (AWS)
    Secondary: eu-west-1 (AWS)
    CDN: Global (Cloudflare)
    
  Compute:
    Frontend:
      - Cloudflare Pages
      - Auto-scaling enabled
      - Cache: 1 hour for assets, 5 min for HTML
      
    Backend:
      - EKS Kubernetes cluster
      - Node count: 3-10 (auto-scaling)
      - Instance type: t3.large
      - CPU: 2 vCPU per pod
      - Memory: 4GB per pod
      
  Database:
    PostgreSQL:
      - RDS Multi-AZ
      - Instance: db.r6g.xlarge
      - Storage: 500GB SSD
      - Read replicas: 2
      - Backup: Daily, 30-day retention
      
    Redis:
      - ElastiCache cluster
      - Node type: cache.r6g.large
      - Nodes: 3 (1 primary, 2 replicas)
      
  Monitoring:
    - Prometheus + Grafana
    - Sentry for errors
    - CloudWatch for AWS resources
    - Custom dashboards for KPIs
    
  Disaster Recovery:
    - RTO: 1 hour
    - RPO: 5 minutes
    - Cross-region backup
    - Automated failover
```

---

## Appendix A: Quick Reference

### Critical Commands

```bash
# Development
pnpm dev                 # Start all services in dev mode
pnpm dev:frontend       # Start only frontend
pnpm dev:backend        # Start only backend
pnpm test              # Run all tests
pnpm test:e2e          # Run E2E tests
pnpm build             # Build all packages
pnpm deploy:staging    # Deploy to staging
pnpm deploy:prod       # Deploy to production

# Database
pnpm db:migrate        # Run migrations
pnpm db:seed          # Seed development data
pnpm db:reset         # Reset database

# Code Quality
pnpm lint             # Run ESLint
pnpm format           # Run Prettier
pnpm typecheck        # Run TypeScript checks
pnpm test:coverage    # Generate coverage report
```

### Environment Variables

```env
# Required for all environments
NODE_ENV=development
APP_URL=http://localhost:3000
API_URL=http://localhost:4000

# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/limeaura
REDIS_URL=redis://localhost:6379

# Authentication
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d

# External Services
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
OPENAI_API_KEY=
SENTRY_DSN=

# Feature Flags
ENABLE_AI_FEATURES=false
ENABLE_OFFLINE_MODE=true
ENABLE_WEBSOCKET=true
```

---

## Appendix B: Troubleshooting Guide

### Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| WebSocket connection fails | CORS or firewall | Check allowed origins, verify ports |
| Offline sync conflicts | Version mismatch | Implement version vectors, use CRDT |
| Animation jank | Too many concurrent | Reduce count, use orchestrator |
| Memory leaks | Event listeners | Cleanup in useEffect, use weak maps |
| Slow dashboard load | No caching | Implement multi-tier cache strategy |
| Auth token expiry | Short TTL | Implement refresh token rotation |

---

## Document Maintenance

This document should be updated with every major architectural decision. Version control all changes and maintain a changelog. Review quarterly for accuracy and completeness.

**Last Review**: November 2024  
**Next Review**: February 2025  
**Maintainers**: Architecture Team

---

This comprehensive Project Architecture Document serves as your complete reference for building the LimeAura Productivity Suite. Every decision is deliberate, every pattern is proven, and every component is designed for scale, performance, and maintainability. Use this as your north star throughout development.
