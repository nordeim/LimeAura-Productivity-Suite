/**
 * @file packages/ui/src/utils/DeviceCapabilities.ts
 * @purpose Hardware capability detection for performance management.
 * @interface Performance detection utility.
 * @phase 1
 */

export interface DeviceCapabilities {
  /** CPU core count */
  cpuCores: number;
  /** Device memory in GB */
  deviceMemory: number;
  /** Network effective type */
  networkType: 'slow-2g' | '2g' | '3g' | '4g' | 'unknown';
  /** Prefers reduced motion */
  prefersReducedMotion: boolean;
  /** Performance tier */
  tier: 'low' | 'medium' | 'high';
}

// Private cache for capabilities
let capabilities: DeviceCapabilities | null = null;

/**
 * Detects the capabilities of the current device.
 * Results are cached for subsequent calls.
 * @returns {DeviceCapabilities} An object detailing device performance.
 */
export function detectCapabilities(): DeviceCapabilities {
  if (capabilities) {
    return capabilities;
  }

  // --- Defaults ---
  let cpuCores = 2;
  let deviceMemory = 2; // in GB
  let networkType: DeviceCapabilities['networkType'] = 'unknown';
  let prefersReducedMotion = true;
  let tier: DeviceCapabilities['tier'] = 'low';

  if (typeof window !== 'undefined') {
    const nav = window.navigator as any;

    // --- Hardware ---
    if (nav.hardwareConcurrency) {
      cpuCores = nav.hardwareConcurrency;
    }
    if (nav.deviceMemory) {
      deviceMemory = nav.deviceMemory;
    }

    // --- Network ---
    if (nav.connection && nav.connection.effectiveType) {
      networkType = nav.connection.effectiveType;
    }

    // --- Accessibility ---
    prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
  }

  // --- Tier Calculation ---
  if (cpuCores >= 8 && deviceMemory >= 8 && networkType === '4g') {
    tier = 'high';
  } else if (cpuCores >= 4 && deviceMemory >= 4 && networkType !== 'slow-2g') {
    tier = 'medium';
  } else {
    tier = 'low';
  }

  // Cache results
  capabilities = {
    cpuCores,
    deviceMemory,
    networkType,
    prefersReducedMotion,
    tier,
  };

  return capabilities;
}

/**
 * Helper function to quickly check for reduced motion preference.
 * @returns {boolean} True if the user prefers reduced motion.
 */
export function shouldReduceAnimations(): boolean {
  return detectCapabilities().prefersReducedMotion;
}

/**
 * Helper function to check if the device is low-spec.
 * @returns {boolean} True if the device is in the low tier.
 */
export function isLowSpecDevice(): boolean {
  return detectCapabilities().tier === 'low';
}
