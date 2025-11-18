/**
 * @file apps/web/src/main.tsx
 * @purpose Application entry point.
 * @interface Bootstrap
 * @phase 8
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { themeService } from './services/theme-service';
import { notificationService } from './services/notification-service';

// Initialize global services that need to run before render
themeService.init();
notificationService.initListeners();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
