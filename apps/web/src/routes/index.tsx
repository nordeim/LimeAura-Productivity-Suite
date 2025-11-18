/**
 * @file apps/web/src/routes/index.tsx
 * @purpose Central routing configuration.
 * @interface Routing config
 * @phase 8
 */
import React, { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { RequireAuth } from '@limeaura/auth';

// Lazy load feature pages
const HomePage = lazy(() => import('@/pages/HomePage').then(m => ({ default: m.HomePage })));
const LoginPage = lazy(() => import('@/features/auth/pages/LoginPage').then(m => ({ default: m.LoginPage })));
const DashboardPage = lazy(() => import('@/features/dashboard/pages/DashboardPage').then(m => ({ default: m.DashboardPage })));
const ProjectPage = lazy(() => import('@/features/projects/pages/ProjectPage').then(m => ({ default: m.ProjectPage })));
const SettingsPage = lazy(() => import('@/features/settings/pages/SettingsPage').then(m => ({ default: m.SettingsPage })));

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <RequireAuth fallback={<Navigate to="/login" replace />}>
            <DashboardPage />
          </RequireAuth>
        }
      />
      <Route
        path="/projects/:projectId/*"
        element={
          <RequireAuth fallback={<Navigate to="/login" replace />}>
            <ProjectPage />
          </RequireAuth>
        }
      />
      <Route
        path="/settings/*"
        element={
          <RequireAuth fallback={<Navigate to="/login" replace />}>
            <SettingsPage />
          </RequireAuth>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
