/**
 * @file packages/state/src/stores/app.store.ts
 * @purpose Global state for the application (theme, sidebar, etc.)
 * @interface State management
 * @phase 3
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark' | 'system';

interface AppState {
  theme: Theme;
  isSidebarOpen: boolean;
  setTheme: (theme: Theme) => void;
  toggleSidebar: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      theme: 'system',
      isSidebarOpen: true,
      setTheme: (theme) => set({ theme }),
      toggleSidebar: () =>
        set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
    }),
    {
      name: 'limeaura-app-storage', // key in localStorage
      partialize: (state) => ({ theme: state.theme }), // only persist theme
    }
  )
);
