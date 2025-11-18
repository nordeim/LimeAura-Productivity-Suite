System ArchitectureOverviewLimeAura is a productivity suite designed with a Local-First philosophy, utilizing optimistic UI updates and background synchronization to ensure instant responsiveness.Component Diagramgraph TD
    Client[Web Client (React + Zustand)]
    LB[Load Balancer]
    API[API Gateway (Node.js)]
    WS[WebSocket Server (Socket.io)]
    
    subgraph Data Layer
        PG[(PostgreSQL Primary)]
        Redis[(Redis Cache)]
        S3[Object Storage]
    end
    
    subgraph Client Side
        IndexedDB[(IndexedDB / Dexie)]
        SW[Service Worker]
    end

    Client -->|HTTP/REST| LB
    Client -->|WebSocket| WS
    Client <-->|Read/Write| IndexedDB
    
    LB --> API
    API --> PG
    API --> Redis
    API --> S3
    
    WS --> Redis
    
    SW -->|Cache| Client
Data Flow1. Task Creation (Optimistic)User creates a task.Client: Immediately adds task to Zustand store and IndexedDB. UI updates instantly.Sync Engine: Queues a CREATE operation in IndexedDB.Sync Engine: Attempts to send request to API.Success: Updates local task with server ID.Offline: Keeps operation queued. Retries when online event fires.2. Real-Time UpdatesServer: Broadcasts task.created event via WebSocket.Client: WebSocketClient receives event.Client: Updates local store if the change originated from another user.Tech StackFrontend: React 18, TypeScript, TailwindCSS, Zustand, TanStack QueryBackend: Node.js, FastifyDatabase: PostgreSQL 16Cache/PubSub: Redis 7Infrastructure: Docker, Kubernetes, AWS/GCPDesign DecisionsMonorepo: Uses pnpm workspaces and Turborepo for efficient build and dependency management across packages (ui, types, api-client, etc.).Shared Types: The @limeaura/types package ensures strict contract alignment between frontend and backend.Design System: Tokens-based architecture (@limeaura/design-tokens) allows for easy theming and consistent UI implementation.
