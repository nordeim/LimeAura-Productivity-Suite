/**
 * @file apps/web/src/services/notification-service.ts
 * @purpose Client-side notification handling service.
 * @interface Alert service
 * @phase 8
 */
import { webSocketClient } from '@limeaura/websocket';

class NotificationService {
  private permission: NotificationPermission = 'default';

  constructor() {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      this.permission = Notification.permission;
    }
  }

  public async requestPermission(): Promise<void> {
    if (typeof window === 'undefined' || !('Notification' in window)) return;
    
    this.permission = await Notification.requestPermission();
  }

  public show(title: string, options?: NotificationOptions): void {
    if (this.permission === 'granted') {
      new Notification(title, options);
    } else {
      console.log('Notification permission not granted:', title);
    }
  }

  public initListeners(): void {
    // Listen for real-time notification events
    webSocketClient.subscribe('notification.received', (payload: any) => {
      this.show(payload.title, { body: payload.message });
    });
  }
}

export const notificationService = new NotificationService();
