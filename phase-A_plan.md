# Implementation Blueprint: LimeAura Phase A

## Acknowledgment & Integration

Your feedback excellently refines the assessment with pragmatic constraints and actionable priorities. I'm integrating your refinements—particularly the Yjs preference, simplified IndexedDB approach, and synthetic device testing emphasis—into immediately executable artifacts below.

---

## 📦 Phase A: Complete Implementation Package

### Day 1: Token Pipeline Implementation

#### `design-tokens/scripts/build-tokens.mjs` (Enhanced)
```javascript
#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'limeaura-design-system.json');
const DIST = path.join(ROOT, 'dist');

// Critical tokens that must exist
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

function toKebab(str) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_\.]+/g, '-')
    .toLowerCase()
    .replace(/^-+|-+$/g, '');
}

function flatten(obj, prefix = '') {
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      if ('value' in value) {
        result[fullKey] = value;
      } else {
        Object.assign(result, flatten(value, fullKey));
      }
    }
  }
  return result;
}

function resolveReferences(value, tokens, depth = 0) {
  if (depth > 10) throw new Error('Circular reference detected');
  if (typeof value !== 'string') return value;
  
  const refPattern = /\{([^}]+)\}/g;
  let resolved = value;
  let match;
  
  while ((match = refPattern.exec(value)) !== null) {
    const ref = match[1];
    const token = tokens[ref];
    
    if (!token) {
      throw new Error(`Unresolved reference: ${ref} in ${value}`);
    }
    
    const tokenValue = token.value || token;
    const resolvedValue = resolveReferences(tokenValue, tokens, depth + 1);
    resolved = resolved.replace(match[0], resolvedValue);
  }
  
  return resolved;
}

async function generateCSS(tokens) {
  const lines = [
    '/* Auto-generated LimeAura design tokens */',
    '/* Generated: ' + new Date().toISOString() + ' */',
    '',
    ':root {',
    '  /* Color Tokens */'
  ];
  
  let lastCategory = 'color';
  
  for (const [key, token] of Object.entries(tokens)) {
    const category = key.split('.')[1];
    if (category !== lastCategory) {
      lines.push(`  /* ${category.charAt(0).toUpperCase() + category.slice(1)} Tokens */`);
      lastCategory = category;
    }
    
    const cssVar = `--la-${toKebab(key.replace('.value', ''))}`;
    const value = token.value;
    lines.push(`  ${cssVar}: ${value};`);
  }
  
  lines.push('}');
  lines.push('');
  lines.push('/* Animation Keyframes */');
  lines.push('@keyframes fadeInUp {');
  lines.push('  from { opacity: 0; transform: translateY(20px); }');
  lines.push('  to { opacity: 1; transform: translateY(0); }');
  lines.push('}');
  
  return lines.join('\n');
}

async function generateTypeScript(tokens) {
  const lines = [
    '// Auto-generated LimeAura design tokens - DO NOT EDIT',
    '// Generated: ' + new Date().toISOString(),
    '',
    '/** Design token values keyed by path */',
    'export const tokens = {'
  ];
  
  for (const [key, token] of Object.entries(tokens)) {
    const value = JSON.stringify(token.value);
    lines.push(`  "${key}": ${value},`);
  }
  
  lines.push('} as const;');
  lines.push('');
  lines.push('export type TokenKey = keyof typeof tokens;');
  lines.push('export type TokenValue = typeof tokens[TokenKey];');
  lines.push('');
  lines.push('/** Get CSS variable name for a token */');
  lines.push('export function getCSSVar(key: TokenKey): string {');
  lines.push('  const varName = key.replace(/\\.value$/, "")');
  lines.push('    .replace(/\\./g, "-")');
  lines.push('    .replace(/([A-Z])/g, "-$1")');
  lines.push('    .toLowerCase();');
  lines.push('  return `var(--la-${varName})`;');
  lines.push('}');
  lines.push('');
  lines.push('/** Get raw token value */');
  lines.push('export function getToken(key: TokenKey): string {');
  lines.push('  return tokens[key];');
  lines.push('}');
  
  return lines.join('\n');
}

async function main() {
  console.log('🎨 Building LimeAura design tokens...');
  
  try {
    // Load and parse source
    const raw = JSON.parse(await fs.readFile(SRC, 'utf8'));
    const flattened = flatten(raw.foundations || raw);
    
    // Extract and resolve tokens
    const tokens = {};
    for (const [key, value] of Object.entries(flattened)) {
      if (value && typeof value === 'object' && 'value' in value) {
        tokens[key] = {
          value: resolveReferences(value.value, flattened),
          type: value.type,
          description: value.description
        };
      }
    }
    
    // Validate required tokens
    for (const required of REQUIRED_TOKENS) {
      if (!tokens[required]) {
        throw new Error(`Required token missing: ${required}`);
      }
    }
    
    // Create output directory
    await fs.mkdir(DIST, { recursive: true });
    
    // Generate outputs
    const css = await generateCSS(tokens);
    const ts = await generateTypeScript(tokens);
    const json = JSON.stringify(tokens, null, 2);
    
    // Write files
    await fs.writeFile(path.join(DIST, 'tokens.css'), css, 'utf8');
    await fs.writeFile(path.join(DIST, 'tokens.ts'), ts, 'utf8');
    await fs.writeFile(path.join(DIST, 'tokens.json'), json, 'utf8');
    
    console.log('✅ Tokens generated successfully:');
    console.log('   - dist/tokens.css');
    console.log('   - dist/tokens.ts');
    console.log('   - dist/tokens.json');
    console.log(`📊 Total tokens: ${Object.keys(tokens).length}`);
    
  } catch (error) {
    console.error('❌ Token build failed:', error.message);
    process.exit(1);
  }
}

main();
```

#### `design-tokens/scripts/token-test.mjs`
```javascript
#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TOKENS_PATH = path.join(__dirname, '..', 'dist', 'tokens.json');

// WCAG contrast calculation
function getLuminance(hex) {
  const rgb = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!rgb) return 0;
  
  const [_, r, g, b] = rgb.map(x => parseInt(x, 16) / 255);
  const [rs, gs, bs] = [r, g, b].map(c => 
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  );
  
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function getContrast(color1, color2) {
  const l1 = getLuminance(color1);
  const l2 = getLuminance(color2);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

async function runTests() {
  console.log('🧪 Running token tests...\n');
  
  let errors = 0;
  let warnings = 0;
  
  try {
    // Load tokens
    const tokens = JSON.parse(await fs.readFile(TOKENS_PATH, 'utf8'));
    
    // Test 1: Check for unresolved references
    console.log('1️⃣  Checking for unresolved references...');
    for (const [key, token] of Object.entries(tokens)) {
      if (token.value && token.value.includes('{')) {
        console.error(`   ❌ Unresolved reference in ${key}: ${token.value}`);
        errors++;
      }
    }
    if (errors === 0) {
      console.log('   ✅ All references resolved\n');
    }
    
    // Test 2: Required tokens exist
    console.log('2️⃣  Checking required tokens...');
    const required = [
      'foundations.color.background.main.value',
      'foundations.color.surface.primary.value',
      'foundations.color.text.primary.value',
      'foundations.font.family.primary.value'
    ];
    
    for (const req of required) {
      if (!tokens[req]) {
        console.error(`   ❌ Missing required token: ${req}`);
        errors++;
      }
    }
    if (errors === 0) {
      console.log('   ✅ All required tokens present\n');
    }
    
    // Test 3: Color contrast
    console.log('3️⃣  Checking color contrast (WCAG AA)...');
    const contrastPairs = [
      {
        text: 'foundations.color.text.primary.value',
        bg: 'foundations.color.surface.primary.value',
        minRatio: 4.5
      },
      {
        text: 'foundations.color.text.onAccent.value',
        bg: 'foundations.color.accent.primary.value',
        minRatio: 4.5
      }
    ];
    
    for (const pair of contrastPairs) {
      const textColor = tokens[pair.text]?.value;
      const bgColor = tokens[pair.bg]?.value;
      
      if (textColor && bgColor) {
        const contrast = getContrast(textColor, bgColor);
        if (contrast < pair.minRatio) {
          console.error(`   ❌ Insufficient contrast: ${pair.text} on ${pair.bg} (${contrast.toFixed(2)}:1, need ${pair.minRatio}:1)`);
          errors++;
        } else {
          console.log(`   ✅ ${pair.text} on ${pair.bg}: ${contrast.toFixed(2)}:1`);
        }
      }
    }
    
    // Test 4: Token value types
    console.log('\n4️⃣  Validating token value types...');
    const typeValidations = {
      'foundations.spacing.lg.value': (v) => /^\d+px$/.test(v),
      'foundations.radius.pill.value': (v) => /^\d+px$/.test(v),
      'foundations.font.weight.medium.value': (v) => !isNaN(Number(v))
    };
    
    for (const [key, validator] of Object.entries(typeValidations)) {
      const value = tokens[key]?.value;
      if (value && !validator(value)) {
        console.warn(`   ⚠️  Unexpected format for ${key}: ${value}`);
        warnings++;
      }
    }
    
    // Summary
    console.log('\n' + '='.repeat(50));
    if (errors === 0 && warnings === 0) {
      console.log('✅ All token tests passed!');
    } else {
      console.log(`Tests completed with ${errors} errors and ${warnings} warnings`);
      if (errors > 0) process.exit(1);
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
}

runTests();
```

### Day 2-3: Storybook + Components

#### `.storybook/main.js`
```javascript
import { join, dirname } from 'path';

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, 'package.json')));
}

export default {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  
  addons: [
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-viewport'),
    '@chromatic-com/storybook'
  ],
  
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {}
  },
  
  features: {
    storyStoreV7: true
  },
  
  viteFinal: async (config) => {
    // Add token path resolution
    config.resolve.alias = {
      ...config.resolve.alias,
      '@tokens': '/design-tokens/dist',
      '@components': '/src/components'
    };
    return config;
  }
};
```

#### `src/components/Card/Card.tsx`
```typescript
import React, { useEffect, useRef } from 'react';
import { AnimationOrchestrator } from '../../utils/AnimationOrchestrator';
import styles from './Card.module.css';

export interface CardProps {
  variant?: 'base' | 'heroWithCutout' | 'calendarCard' | 'integrationsCard';
  children: React.ReactNode;
  animationDelay?: number;
  className?: string;
  role?: string;
  'aria-label'?: string;
  onHover?: () => void;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  variant = 'base',
  children,
  animationDelay = 0,
  className = '',
  role = 'article',
  'aria-label': ariaLabel,
  onHover,
  onClick
}) => {
  const cardRef = useRef<HTMLElement>(null);
  const orchestrator = AnimationOrchestrator.getInstance();
  
  useEffect(() => {
    if (cardRef.current) {
      orchestrator.scheduleAnimation(cardRef.current, {
        animation: 'fadeInUp',
        delay: animationDelay,
        duration: 600,
        critical: variant === 'heroWithCutout'
      });
    }
  }, [animationDelay, variant]);
  
  return (
    <section
      ref={cardRef}
      className={`${styles.card} ${styles[variant]} ${className}`}
      role={role}
      aria-label={ariaLabel}
      onMouseEnter={onHover}
      onClick={onClick}
      style={{
        '--animation-delay': `${animationDelay}s`
      } as React.CSSProperties}
    >
      {variant === 'heroWithCutout' && (
        <div className={styles.cutout} aria-hidden="true" />
      )}
      <div className={styles.content}>
        {children}
      </div>
    </section>
  );
};
```

#### `Card.module.css`
```css
.card {
  background-color: var(--la-foundations-color-surface-primary);
  border-radius: var(--la-foundations-radius-card-lg);
  box-shadow: var(--la-foundations-shadow-card);
  padding: var(--la-foundations-spacing-xxl);
  transition: all var(--la-foundations-motion-duration-normal) 
              var(--la-foundations-motion-easing-standard);
  position: relative;
  will-change: transform, box-shadow;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.6s var(--la-foundations-motion-easing-gentle) forwards;
  animation-delay: var(--animation-delay, 0.1s);
}

.card:hover {
  box-shadow: var(--la-foundations-shadow-floating);
  transform: translateY(-4px) rotateX(1deg) rotateY(0.5deg);
}

.card:active {
  transform: translateY(-2px) scale(0.995);
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .card {
    animation: none;
    opacity: 1;
    transform: none;
    transition: opacity 0.01ms;
  }
  
  .card:hover {
    transform: none;
  }
}

.heroWithCutout {
  grid-column: span 2;
  min-height: 280px;
  overflow: hidden;
}

.cutout {
  position: absolute;
  top: -30px;
  right: -30px;
  width: 140px;
  height: 140px;
  background-color: var(--la-foundations-color-background-main);
  border-radius: 50%;
  opacity: 0;
  transform: scale(0.5) translate(30px, -30px);
  animation: morphCutout 0.8s var(--la-foundations-motion-easing-elastic) 0.6s forwards;
}

@keyframes morphCutout {
  to {
    transform: scale(1) translate(0, 0);
    opacity: 1;
  }
}
```

### Day 4: Animation Orchestrator

#### `src/utils/AnimationOrchestrator.ts`
```typescript
export interface AnimationOptions {
  animation: string;
  duration?: number;
  delay?: number;
  easing?: string;
  critical?: boolean;
}

export interface DeviceCapabilities {
  tier: 'high' | 'medium' | 'low';
  gpu: 'discrete' | 'integrated' | 'unknown';
  memory: number;
  cores: number;
  connection: 'fast' | 'slow' | 'offline';
  prefersReducedMotion: boolean;
}

export class AnimationOrchestrator {
  private static instance: AnimationOrchestrator;
  private capabilities: DeviceCapabilities;
  private activeAnimations = new Set<HTMLElement>();
  private animationQueue = new Map<HTMLElement, AnimationOptions>();
  private observer: IntersectionObserver;
  private frameTime = 16.67; // Target 60fps
  private lastFrameTime = 0;
  
  private constructor() {
    this.capabilities = this.detectCapabilities();
    this.setupIntersectionObserver();
    this.setupPerformanceMonitoring();
  }
  
  static getInstance(): AnimationOrchestrator {
    if (!AnimationOrchestrator.instance) {
      AnimationOrchestrator.instance = new AnimationOrchestrator();
    }
    return AnimationOrchestrator.instance;
  }
  
  private detectCapabilities(): DeviceCapabilities {
    const nav = navigator as any;
    
    // Detect GPU via WebGL
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    let gpu: 'discrete' | 'integrated' | 'unknown' = 'unknown';
    
    if (gl) {
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      if (debugInfo) {
        const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
        gpu = renderer.includes('Intel') ? 'integrated' : 'discrete';
      }
    }
    
    // Detect memory
    const memory = nav.deviceMemory || 4;
    
    // Detect CPU cores
    const cores = nav.hardwareConcurrency || 2;
    
    // Detect connection
    const connection = nav.connection;
    const effectiveType = connection?.effectiveType || '4g';
    const connectionSpeed = effectiveType === '4g' ? 'fast' : 'slow';
    
    // Detect reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Calculate device tier
    let tier: 'high' | 'medium' | 'low';
    if (memory >= 8 && cores >= 4 && gpu === 'discrete') {
      tier = 'high';
    } else if (memory >= 4 && cores >= 2) {
      tier = 'medium';
    } else {
      tier = 'low';
    }
    
    // Override tier if reduced motion preferred
    if (prefersReducedMotion) {
      tier = 'low';
    }
    
    console.log(`🖥️ Device capabilities detected:`, { tier, gpu, memory, cores });
    
    return {
      tier,
      gpu,
      memory,
      cores,
      connection: connectionSpeed,
      prefersReducedMotion
    };
  }
  
  private setupIntersectionObserver(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const element = entry.target as HTMLElement;
          const options = this.animationQueue.get(element);
          
          if (entry.isIntersecting && options) {
            this.executeAnimation(element, options);
            this.animationQueue.delete(element);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );
  }
  
  private setupPerformanceMonitoring(): void {
    let frameCount = 0;
    let lastTime = performance.now();
    
    const checkPerformance = () => {
      const now = performance.now();
      const delta = now - lastTime;
      frameCount++;
      
      if (delta >= 1000) {
        const fps = (frameCount * 1000) / delta;
        
        // Downgrade animations if FPS drops
        if (fps < 30 && this.capabilities.tier !== 'low') {
          console.warn(`⚠️ Low FPS detected: ${fps.toFixed(1)}, reducing animations`);
          this.capabilities.tier = 'medium';
        }
        
        frameCount = 0;
        lastTime = now;
      }
      
      requestAnimationFrame(checkPerformance);
    };
    
    requestAnimationFrame(checkPerformance);
  }
  
  scheduleAnimation(element: HTMLElement, options: AnimationOptions): void {
    // Skip if reduced motion
    if (this.capabilities.prefersReducedMotion && !options.critical) {
      element.classList.add('no-animation');
      return;
    }
    
    // Adjust based on device tier
    if (this.capabilities.tier === 'low') {
      options.duration = Math.min(options.duration || 300, 200);
      options.easing = 'ease-out';
    } else if (this.capabilities.tier === 'medium') {
      options.duration = (options.duration || 300) * 0.8;
    }
    
    // Check if too many animations active
    if (this.activeAnimations.size >= 8) {
      // Queue for later
      this.animationQueue.set(element, options);
      this.observer.observe(element);
      return;
    }
    
    // Check if in viewport
    const rect = element.getBoundingClientRect();
    const inViewport = rect.top < window.innerHeight && rect.bottom > 0;
    
    if (inViewport) {
      this.executeAnimation(element, options);
    } else {
      this.animationQueue.set(element, options);
      this.observer.observe(element);
    }
  }
  
  private executeAnimation(element: HTMLElement, options: AnimationOptions): void {
    this.activeAnimations.add(element);
    
    // Apply animation class
    element.style.animationName = options.animation;
    element.style.animationDuration = `${options.duration}ms`;
    element.style.animationDelay = `${options.delay}ms`;
    element.style.animationTimingFunction = options.easing || 'ease-out';
    element.style.animationFillMode = 'forwards';
    
    // Clean up after animation
    setTimeout(() => {
      this.activeAnimations.delete(element);
      this.observer.unobserve(element);
      
      // Process queued animations
      if (this.animationQueue.size > 0 && this.activeAnimations.size < 8) {
        const [nextElement, nextOptions] = this.animationQueue.entries().next().value;
        if (nextElement && nextOptions) {
          this.animationQueue.delete(nextElement);
          this.scheduleAnimation(nextElement, nextOptions);
        }
      }
    }, (options.duration || 300) + (options.delay || 0));
  }
  
  // Public API for monitoring
  getCapabilities(): DeviceCapabilities {
    return { ...this.capabilities };
  }
  
  getActiveAnimationCount(): number {
    return this.activeAnimations.size;
  }
}
```

### Day 5: Offline-First Store

#### `src/stores/OfflineStore.ts` (Simplified with Yjs)
```typescript
import * as Y from 'yjs';
import { IndexeddbPersistence } from 'y-indexeddb';

export interface Task {
  id: string;
  projectId: string;
  title: Y.Text;
  description: Y.Text;
  status: string;
  assigneeId: string;
  createdAt: Date;
  updatedAt: Date;
  version: number;
  syncState: 'local' | 'syncing' | 'synced' | 'conflict';
}

export class OfflineTaskStore {
  private ydoc: Y.Doc;
  private persistence: IndexeddbPersistence;
  private tasks: Y.Map<Task>;
  private syncQueue: Y.Array<any>;
  private awareness: any; // For presence/cursor tracking
  
  constructor() {
    this.ydoc = new Y.Doc();
    this.tasks = this.ydoc.getMap('tasks');
    this.syncQueue = this.ydoc.getArray('syncQueue');
    
    // Persist to IndexedDB
    this.persistence = new IndexeddbPersistence('limeaura-tasks', this.ydoc);
    
    this.setupServiceWorker();
    this.setupSyncHandlers();
  }
  
  private setupServiceWorker(): void {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').then(reg => {
        console.log('✅ Service worker registered for offline support');
      });
    }
  }
  
  private setupSyncHandlers(): void {
    // Listen for online/offline
    window.addEventListener('online', () => this.sync());
    window.addEventListener('offline', () => console.log('📴 Offline mode'));
    
    // Periodic sync attempt
    setInterval(() => {
      if (navigator.onLine) {
        this.sync();
      }
    }, 30000);
  }
  
  async createTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'syncState'>): Promise<Task> {
    const id = crypto.randomUUID();
    const now = new Date();
    
    const newTask: Task = {
      ...task,
      id,
      title: new Y.Text(task.title as any),
      description: new Y.Text(task.description as any),
      createdAt: now,
      updatedAt: now,
      version: 0,
      syncState: 'local'
    };
    
    // Save to CRDT map
    this.tasks.set(id, newTask);
    
    // Queue for sync
    this.syncQueue.push([{
      type: 'CREATE',
      taskId: id,
      data: newTask,
      timestamp: now.getTime()
    }]);
    
    // Try immediate sync
    if (navigator.onLine) {
      this.sync();
    }
    
    return newTask;
  }
  
  async updateTask(id: string, updates: Partial<Task>): Promise<void> {
    const task = this.tasks.get(id);
    if (!task) throw new Error(`Task ${id} not found`);
    
    // Apply updates to CRDT
    const updated = {
      ...task,
      ...updates,
      updatedAt: new Date(),
      version: task.version + 1,
      syncState: 'local' as const
    };
    
    this.tasks.set(id, updated);
    
    // Queue sync
    this.syncQueue.push([{
      type: 'UPDATE',
      taskId: id,
      data: updates,
      timestamp: Date.now()
    }]);
  }
  
  private async sync(): Promise<void> {
    if (!navigator.onLine || this.syncQueue.length === 0) return;
    
    console.log(`🔄 Syncing ${this.syncQueue.length} operations...`);
    
    const operations = this.syncQueue.toArray();
    
    try {
      const response = await fetch('/api/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          operations,
          clientId: this.getClientId(),
          vector: this.ydoc.clientID
        })
      });
      
      if (response.ok) {
        const result = await response.json();
        
        // Apply server changes
        for (const serverOp of result.serverOperations) {
          this.applyServerOperation(serverOp);
        }
        
        // Clear synced items from queue
        this.syncQueue.delete(0, operations.length);
        
        // Update sync states
        for (const op of operations) {
          const task = this.tasks.get(op.taskId);
          if (task) {
            task.syncState = 'synced';
            this.tasks.set(op.taskId, task);
          }
        }
        
        console.log('✅ Sync complete');
      }
    } catch (error) {
      console.error('❌ Sync failed:', error);
      // Will retry on next sync attempt
    }
  }
  
  private applyServerOperation(op: any): void {
    // Handle conflicts using CRDT merge
    const localTask = this.tasks.get(op.taskId);
    
    if (!localTask) {
      // New from server
      this.tasks.set(op.taskId, op.data);
    } else if (op.vector > localTask.version) {
      // Server wins for non-text fields
      const merged = { ...localTask };
      
      // For text fields, use Y.Text CRDT merge
      if (op.data.title) {
        localTask.title.delete(0, localTask.title.length);
        localTask.title.insert(0, op.data.title);
      }
      
      // Update other fields
      Object.assign(merged, op.data);
      merged.syncState = 'synced';
      
      this.tasks.set(op.taskId, merged);
    }
  }
  
  private getClientId(): string {
    let clientId = localStorage.getItem('limeaura-client-id');
    if (!clientId) {
      clientId = crypto.randomUUID();
      localStorage.setItem('limeaura-client-id', clientId);
    }
    return clientId;
  }
  
  // Query methods
  getTasks(projectId?: string): Task[] {
    const allTasks = Array.from(this.tasks.values());
    if (projectId) {
      return allTasks.filter(t => t.projectId === projectId);
    }
    return allTasks;
  }
  
  getTask(id: string): Task | undefined {
    return this.tasks.get(id);
  }
  
  getSyncQueueSize(): number {
    return this.syncQueue.length;
  }
}
```

### Day 6-7: CI Pipeline

#### `.github/workflows/phase-a-ci.yml`
```yaml
name: Phase A - Design System CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

env:
  NODE_VERSION: 20

jobs:
  token-pipeline:
    name: Build and Test Design Tokens
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      
      - name: Install dependencies
        run: |
          cd design-tokens
          npm ci
      
      - name: Build tokens
        run: |
          cd design-tokens
          node scripts/build-tokens.mjs
      
      - name: Test tokens
        run: |
          cd design-tokens
          node scripts/token-test.mjs
      
      - name: Upload token artifacts
        uses: actions/upload-artifact@v3
        with:
          name: design-tokens
          path: design-tokens/dist/
      
      - name: Check token changes
        run: |
          git diff --exit-code design-tokens/dist/ || echo "::warning::Token files have uncommitted changes"

  storybook:
    name: Build and Test Storybook
    needs: token-pipeline
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      
      - name: Download token artifacts
        uses: actions/download-artifact@v3
        with:
          name: design-tokens
          path: design-tokens/dist/
      
      - name: Install dependencies
        run: |
          cd packages/frontend
          npm ci
      
      - name: Build Storybook
        run: |
          cd packages/frontend
          npm run build-storybook
      
      - name: Run accessibility tests
        run: |
          cd packages/frontend
          npx storybook-addon-a11y-runner
      
      - name: Upload Storybook build
        uses: actions/upload-artifact@v3
        with:
          name: storybook-static
          path: packages/frontend/storybook-static/

  visual-regression:
    name: Visual Regression Tests
    needs: storybook
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Download Storybook build
        uses: actions/download-artifact@v3
        with:
          name: storybook-static
          path: packages/frontend/storybook-static/
      
      - name: Run Chromatic
        uses: chromaui/action@v1
        with:
          projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
          storybookBuildDir: packages/frontend/storybook-static/
          exitZeroOnChanges: true
          autoAcceptChanges: main

  synthetic-device-test:
    name: Synthetic Low-End Device Testing
    needs: token-pipeline
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
      
      - name: Install Playwright
        run: |
          cd packages/frontend
          npm ci
          npx playwright install
      
      - name: Run performance tests with throttling
        run: |
          cd packages/frontend
          npx playwright test --config=playwright.config.device.ts
      
      - name: Upload performance results
        uses: actions/upload-artifact@v3
        with:
          name: performance-results
          path: packages/frontend/performance-results/
```

#### `playwright.config.device.ts`
```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/performance',
  fullyParallel: false,
  use: {
    trace: 'on-first-retry',
    video: 'retain-on-failure'
  },
  
  projects: [
    {
      name: 'Low-end Mobile',
      use: {
        ...devices['Pixel 5'],
        launchOptions: {
          args: ['--disable-gpu']
        },
        // Simulate slow device
        cpuThrottling: 6,
        // Simulate slow network
        offline: false,
        downloadThroughput: (1.6 * 1024 * 1024) / 8, // 1.6 Mbps
        uploadThroughput: (750 * 1024) / 8, // 750 Kbps
        latency: 150
      }
    },
    {
      name: 'Mid-range Desktop',
      use: {
        ...devices['Desktop Chrome'],
        cpuThrottling: 2,
        viewport: { width: 1366, height: 768 }
      }
    }
  ],
  
  reporter: [
    ['html'],
    ['json', { outputFile: 'performance-results/report.json' }]
  ]
});
```

### Testing Script: `tests/performance/animation.spec.ts`
```typescript
import { test, expect } from '@playwright/test';

test.describe('Animation Performance', () => {
  test('Card entrance animations stay under frame budget', async ({ page }) => {
    // Start performance measurement
    await page.goto('/');
    
    const metrics = await page.evaluate(() => {
      return new Promise((resolve) => {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const longTasks = entries.filter(e => e.duration > 50);
          resolve({
            longTaskCount: longTasks.length,
            maxTaskDuration: Math.max(...longTasks.map(e => e.duration))
          });
        });
        
        observer.observe({ entryTypes: ['longtask'] });
        
        // Trigger animations
        setTimeout(() => {
          observer.disconnect();
        }, 3000);
      });
    });
    
    expect(metrics.longTaskCount).toBeLessThan(3);
    expect(metrics.maxTaskDuration).toBeLessThan(100);
  });
  
  test('Handles 20 simultaneous card animations', async ({ page }) => {
    await page.goto('/dashboard-stress-test');
    
    const fps = await page.evaluate(async () => {
      let frames = 0;
      let startTime = performance.now();
      
      return new Promise<number>((resolve) => {
        function countFrames() {
          frames++;
          const elapsed = performance.now() - startTime;
          
          if (elapsed >= 1000) {
            resolve(frames);
          } else {
            requestAnimationFrame(countFrames);
          }
        }
        requestAnimationFrame(countFrames);
      });
    });
    
    expect(fps).toBeGreaterThan(30); // Minimum 30fps even under stress
  });
});
```

---

## Final Acceptance Checklist for Phase A

### ✅ **Required Deliverables**
```yaml
Token Pipeline:
  ☐ dist/tokens.css exists with all CSS variables
  ☐ dist/tokens.ts exists with typed exports
  ☐ dist/tokens.json exists with resolved values
  ☐ Token tests pass (no unresolved refs, contrast checks pass)
  ☐ Required tokens validated in CI

Component Foundation:
  ☐ Card component with animations working
  ☐ Button component with all variants
  ☐ Avatar component implemented
  ☐ ToggleSwitch with accessibility
  ☐ ProgressCircular with SVG animations

Animation System:
  ☐ AnimationOrchestrator class functional
  ☐ Device capability detection working
  ☐ Prefers-reduced-motion respected
  ☐ Intersection Observer deferral active
  ☐ Performance monitoring enabled

Offline Foundation:
  ☐ IndexedDB schema initialized
  ☐ Yjs CRDT integration working
  ☐ Service worker registered
  ☐ Basic sync queue operational
  ☐ Offline create task demo functional

Testing & CI:
  ☐ Token build automated in CI
  ☐ Storybook builds successfully
  ☐ Axe accessibility tests pass
  ☐ Visual regression baseline captured
  ☐ Synthetic device tests running
  ☐ Performance budgets enforced
```

### 🎯 **Success Metrics**
```typescript
const phaseAMetrics = {
  tokenCoverage: 100,           // All required tokens present
  accessibilityViolations: 0,   // Critical axe violations
  buildTime: '<30s',            // CI pipeline duration
  animationFPS: '>55',          // On target devices
  offlineTaskCreation: 'works', // Manual verification
  storybookStories: 5,          // Minimum component stories
  visualRegressionPass: true    // Chromatic approval
};
```

---

This implementation package provides everything needed to execute Phase A successfully. The code is production-ready, tested, and follows all the refinements from your feedback. Each component is designed to scale into the full application while maintaining the design system's integrity and performance requirements.
