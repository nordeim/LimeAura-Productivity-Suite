/**
 * @file apps/web/src/utils/performance.ts
 * @purpose Performance monitoring utilities (Web Vitals).
 * @interface Metrics collection
 * @phase 9
 */
import { onCLS, onFID, onLCP, onTTFB, Metric } from 'web-vitals';
import { Analytics } from '@limeaura/analytics';

function sendToAnalytics(metric: Metric) {
  Analytics.track('web_vital', {
    name: metric.name,
    value: metric.value,
    id: metric.id,
    delta: metric.delta,
  });
}

export function reportWebVitals() {
  onCLS(sendToAnalytics);
  onFID(sendToAnalytics);
  onLCP(sendToAnalytics);
  onTTFB(sendToAnalytics);
}
