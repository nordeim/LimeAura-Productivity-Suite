/**
 * @file apps/web/src/layouts/AppLayout.tsx
 * @purpose Main application layout wrapper.
 * @interface Layout wrapper
 * @phase 8
 */
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  ProjectSidebar, 
  Icon, 
  GlobalSearch, 
  NotificationCenter, 
  UserMenu,
  Button 
} from '@limeaura/ui';
import { useAuth } from '@limeaura/auth';
import styles from './AppLayout.module.css';

// Mock data for layout components
const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: <Icon name="LayoutDashboard" size={18} />, href: '/dashboard' },
  { id: 'projects', label: 'Projects', icon: <Icon name="Folder" size={18} />, href: '/projects/default' },
  { id: 'settings', label: 'Settings', icon: <Icon name="Settings" size={18} />, href: '/settings' },
];

const notifications = [
  { id: '1', avatarName: 'Jane', content: 'New task assigned', timestamp: '2m', isRead: false },
];

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  // Don't show layout on login/home pages
  const isPublic = ['/', '/login'].includes(location.pathname);

  if (isPublic) {
    return <main className={styles.publicMain}>{children}</main>;
  }

  if (!isAuthenticated) {
    return null; // Or redirect, handled by RequireAuth
  }

  const activeNavId = navItems.find(item => location.pathname.startsWith(item.href))?.id || 'dashboard';

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <ProjectSidebar 
          navItems={navItems} 
          activeId={activeNavId} 
          className={styles.projectSidebar}
        />
      </aside>
      
      <div className={styles.mainWrapper}>
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <Button variant="ghost" onClick={() => setIsSearchOpen(true)} className={styles.searchTrigger}>
              <Icon name="Search" size={16} />
              <span className={styles.searchLabel}>Search or type command...</span>
              <span className={styles.shortcut}>⌘K</span>
            </Button>
          </div>
          
          <div className={styles.headerRight}>
            <div className={styles.notifWrapper}>
              <Button 
                variant="ghost" 
                icon={<Icon name="Bell" size={20} />} 
                onClick={() => setIsNotifOpen(!isNotifOpen)}
              />
              {isNotifOpen && (
                <div className={styles.notifDropdown}>
                  <NotificationCenter 
                    notifications={notifications} 
                    onNotificationClick={() => {}} 
                    onClearAll={() => {}}
                  />
                </div>
              )}
            </div>
            
            <UserMenu 
              userName={user?.full_name || 'User'} 
              userEmail={user?.email || ''} 
              onSelect={(val) => {
                if (val === 'logout') logout();
                else navigate(`/${val}`);
              }} 
            />
          </div>
        </header>

        <main className={styles.content}>
          {children}
        </main>
      </div>

      <GlobalSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
};
