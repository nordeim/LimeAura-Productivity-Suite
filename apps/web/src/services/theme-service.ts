/**
 * @file apps/web/src/services/theme-service.ts
 * @purpose Theme management service.
 * @interface Theme control
 * @phase 8
 */
import { useAppStore } from '@limeaura/state';

class ThemeService {
  public init(): void {
    // Subscribe to store changes
    useAppStore.subscribe((state) => {
      this.applyTheme(state.theme);
    });
    
    // Initial apply
    this.applyTheme(useAppStore.getState().theme);
  }

  private applyTheme(theme: 'light' | 'dark' | 'system'): void {
    if (typeof window === 'undefined') return;

    const root = window.document.documentElement;
    const isDark =
      theme === 'dark' ||
      (theme === 'system' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);

    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }
}

export const themeService = new ThemeService();
