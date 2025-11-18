/**
 * @file apps/web/src/utils/router.ts
 * @purpose Router utility helpers.
 * @interface Navigation helpers
 * @phase 8
 */

/**
 * Type-safe route builder.
 * Ideally this would be inferred from route definitions.
 */
export const routes = {
  home: () => '/',
  login: () => '/login',
  dashboard: () => '/dashboard',
  project: (id: string) => `/projects/${id}`,
  settings: () => '/settings',
};

export const getBreadcrumbs = (pathname: string) => {
  const parts = pathname.split('/').filter(Boolean);
  return parts.map((part, index) => ({
    label: part.charAt(0).toUpperCase() + part.slice(1),
    href: '/' + parts.slice(0, index + 1).join('/'),
  }));
};
