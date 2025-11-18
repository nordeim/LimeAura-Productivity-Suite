/**
 * @file apps/web/src/features/settings/pages/SettingsPage.tsx
 * @purpose User settings page.
 * @interface Configuration UI
 * @phase 7
 */
import React from 'react';
import { Card, Input, Button, Toggle } from '@limeaura/ui';
import styles from './SettingsPage.module.css';

export const SettingsPage: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Settings</h1>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <a href="#" className={styles.navItemActive}>Profile</a>
          <a href="#" className={styles.navItem}>Account</a>
          <a href="#" className={styles.navItem}>Notifications</a>
          <a href="#" className={styles.navItem}>Integrations</a>
        </nav>
        <main className={styles.content}>
          <Card>
            <h2 className={styles.sectionTitle}>Profile</h2>
            <form className={styles.form}>
              <Input label="Full Name" defaultValue="Jane Doe" />
              <Input label="Email Address" type="email" defaultValue="jane@acme.com" />
              <Toggle label="Enable Dark Mode" checked={false} onChange={() => {}} />
              <Button>Save Changes</Button>
            </form>
          </Card>
        </main>
      </div>
    </div>
  );
};
