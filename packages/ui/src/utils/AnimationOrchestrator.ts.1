/**
 * @file packages/ui/src/utils/AnimationOrchestrator.ts
 * @purpose Animation performance management. Manages staggering and frame budgeting.
 * @interface Animation controller singleton.
 * @phase 1
 */

import { detectCapabilities, shouldReduceAnimations, isLowSpecDevice } from './DeviceCapabilities';

export interface AnimationOptions {
  /** The CSS animation name */
  animation: string;
  /** Duration in ms */
  duration: number;
  /** Easing function */
  easing?: string;
  /** Delay in ms */
  delay?: number;
  /** Is this animation critical? (runs even on low-spec) */
  critical?: boolean;
}

/**
 * Manages and schedules animations to prevent jank and respect device capabilities.
 * Implemented as a singleton.
 */
export class AnimationOrchestrator {
  private static instance: AnimationOrchestrator;
  private queue: Array<() => void> = [];
  private isProcessing = false;
  private maxConcurrentAnimations = 5;

  private constructor() {
    const caps = detectCapabilities();
    if (caps.tier === 'high') {
      this.maxConcurrentAnimations = 20;
    } else if (caps.tier === 'medium') {
      this.maxConcurrentAnimations = 10;
    }
    // 'low' tier stays at 5
  }

  /**
   * Gets the singleton instance of the Orchestrator.
   * @returns {AnimationOrchestrator} The singleton instance.
   */
  public static getInstance(): AnimationOrchestrator {
    if (!AnimationOrchestrator.instance) {
      AnimationOrchestrator.instance = new AnimationOrchestrator();
    }
    return AnimationOrchestrator.instance;
  }

  /**
   * Schedules an animation to run on an element.
   * Respects reduced motion and device load.
   * @param {HTMLElement} element - The element to animate.
   * @param {AnimationOptions} options - The animation configuration.
   */
  public scheduleAnimation(element: HTMLElement, options: AnimationOptions): void {
    if (shouldReduceAnimations() && !options.critical) {
      // Apply end-state styles immediately without animation
      element.style.opacity = '1';
      element.style.transform = 'none';
      return;
    }
    
    // Low-spec devices get simpler animations or none
    if (isLowSpecDevice() && !options.critical) {
       element.style.opacity = '1';
       element.style.transform = 'none';
      return;
    }

    const task = () => {
      element.style.animation = `${options.animation} ${options.duration}ms ${
        options.easing || 'ease-out'
      } ${options.delay || 0}ms forwards`;

      // Clean up after animation
      element.addEventListener(
        'animationend',
        () => {
          element.style.animation = ''; // Clear animation property
          this.onTaskComplete();
        },
        { once: true }
      );
    };

    this.queue.push(task);
    this.processQueue();
  }

  /**
   * Processes the animation queue using requestAnimationFrame for staggering.
   */
  private processQueue(): void {
    if (this.isProcessing || this.queue.length === 0) {
      return;
    }

    this.isProcessing = true;
    const tasksToRun = this.queue.splice(0, this.maxConcurrentAnimations);

    tasksToRun.forEach((task, index) => {
      // Stagger tasks slightly even within a batch
      setTimeout(() => {
        window.requestAnimationFrame(task);
      }, index * 30); // 30ms stagger
    });
  }

  /**
   * Called when an animation task completes, allowing the queue to advance.
   */
  private onTaskComplete(): void {
    this.isProcessing = false;
    this.processQueue();
  }
  
  /**
   * Gets the device capabilities.
   * @returns {DeviceCapabilities} The detected capabilities.
   */
  public getCapabilities() {
    return detectCapabilities();
  }
}
