/**
 * @file apps/web/src/hooks/useAppInit.ts
 * @purpose Application initialization logic.
 * @interface Init hook
 * @phase 8
 */
import { useState, useEffect } from 'react';
import { authService } from '@limeaura/auth';
import { Analytics } from '@limeaura/analytics';

export function useAppInit() {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        // 1. Initialize Auth (loads token from storage)
        authService.init();

        // 2. Initialize Analytics
        Analytics.init();

        // 3. Other global async init tasks can go here
        // e.g., await syncEngine.start();

      } catch (error) {
        console.error('App Initialization failed:', error);
      } finally {
        setIsInitialized(true);
      }
    };

    init();
  }, []);

  return { isInitialized };
}
