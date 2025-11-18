/**
 * @file apps/web/src/features/auth/pages/LoginPage.tsx
 * @purpose Login page UI component.
 * @interface Authentication UI
 * @phase 7
 */
import React, { useState } from 'react';
import { Button, Input, Card, Icon } from '@limeaura/ui';
import { useAuth } from '../hooks/useAuth';
import styles from './LoginPage.module.css';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <div className={styles.wrapper}>
      <Card className={styles.loginCard}>
        <div className={styles.header}>
          <span className={styles.logo}>L</span>
          <h1>Welcome to LimeAura</h1>
          <p>Sign in to your account to continue</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <p className={styles.error}>{error}</p>}
          <Input
            label="Email"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jane@acme.com"
            disabled={isLoading}
          />
          <Input
            label="Password"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            disabled={isLoading}
          />
          <Button
            type="submit"
            fullWidth
            loading={isLoading}
            size="lg"
          >
            Sign In
          </Button>
        </form>

        <div className={styles.separator}>or</div>

        <div className={styles.oauthButtons}>
          <Button variant="secondary" fullWidth icon={<Icon name="Globe" size={16} />}>
            Sign in with Google
          </Button>
          <Button variant="secondary" fullWidth icon={<Icon name="Github" size={16} />}>
            Sign in with GitHub
          </Button>
        </div>
      </Card>
    </div>
  );
};
