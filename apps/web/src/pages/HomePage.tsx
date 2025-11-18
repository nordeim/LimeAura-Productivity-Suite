/**
 * @file apps/web/src/pages/HomePage.tsx
 * @purpose Landing page for the application.
 * @interface Entry point
 * @phase 9
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Icon } from '@limeaura/ui';
import styles from './HomePage.module.css';

export const HomePage: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <nav className={styles.nav}>
        <div className={styles.logo}>LimeAura</div>
        <div className={styles.navLinks}>
          <Link to="/login">
            <Button variant="ghost">Log In</Button>
          </Link>
          <Link to="/login">
            <Button>Get Started</Button>
          </Link>
        </div>
      </nav>

      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.title}>
            Productivity with <span className={styles.highlight}>Soul</span>
          </h1>
          <p className={styles.subtitle}>
            The project management tool that brings your team together.
            Fast, beautiful, and offline-first.
          </p>
          <div className={styles.cta}>
            <Link to="/login">
              <Button size="lg" icon={<Icon name="ArrowRight" size={20} />}>
                Start for Free
              </Button>
            </Link>
          </div>
        </section>

        <section className={styles.features}>
          <Card className={styles.featureCard} hoverable>
            <div className={styles.featureIcon}>
              <Icon name="Zap" size={32} />
            </div>
            <h3>Lightning Fast</h3>
            <p>Built for speed with optimistic UI updates and local-first data.</p>
          </Card>
          <Card className={styles.featureCard} hoverable>
            <div className={styles.featureIcon}>
              <Icon name="WifiOff" size={32} />
            </div>
            <h3>Offline Capable</h3>
            <p>Keep working without internet. We sync when you're back online.</p>
          </Card>
          <Card className={styles.featureCard} hoverable>
            <div className={styles.featureIcon}>
              <Icon name="Users" size={32} />
            </div>
            <h3>Real-time</h3>
            <p>Collaborate with your team in real-time with live cursors and updates.</p>
          </Card>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} LimeAura. All rights reserved.</p>
      </footer>
    </div>
  );
};
