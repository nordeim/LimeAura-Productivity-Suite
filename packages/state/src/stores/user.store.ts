/**
 * @file packages/state/src/stores/user.store.ts
 * @purpose Global state for the authenticated user.
 * @interface User store
 * @phase 3
 */

import { create } from 'zustand';
import { User } from '@limeaura/types';

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: true }),
  clearUser: () => set({ user: null, isAuthenticated: false }),
}));
