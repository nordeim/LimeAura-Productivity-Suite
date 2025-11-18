/**
 * @file apps/web/src/utils/sentry.ts
 * @purpose Error monitoring configuration.
 * @interface Error tracking
 * @phase 9
 */

// Placeholder for Sentry initialization
// In a real app, you would import * as Sentry from "@sentry/react";

export const initSentry = () => {
  if (process.env.NODE_ENV === 'production' && process.env.SENTRY_DSN) {
    console.log('Initializing Sentry...');
    // Sentry.init({ dsn: process.env.SENTRY_DSN });
  }
};

export const captureException = (error: any, context?: any) => {
  console.error('Sentry Captured Exception:', error, context);
  // Sentry.captureException(error, { extra: context });
};
