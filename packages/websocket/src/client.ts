/**
 * @file packages/websocket/src/client.ts
 * @purpose Manages the Socket.io real-time connection.
 * @interface Real-time service
 * @phase 3
 */

import { io, Socket } from 'socket.io-client';
import { WebSocketEvent } from '@limeaura/types';

// Get API_URL from environment (WS connects to the same base URL)
const baseURL = process.env.API_URL || 'http://localhost:4000';

type EventHandler = (data: any) => void;

class WebSocketClient {
  private socket: Socket | null = null;
  private subscriptions: Map<string, EventHandler[]> = new Map();

  public connect(token: string): void {
    if (this.socket) {
      console.warn('WebSocketClient: Already connected.');
      return;
    }

    this.socket = io(baseURL, {
      auth: { token },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      transports: ['websocket'], // Force websocket
    });

    this.socket.on('connect', () => {
      console.log('WebSocket: Connected', this.socket?.id);
    });

    this.socket.on('disconnect', (reason) => {
      console.warn('WebSocket: Disconnected', reason);
    });

    this.socket.on('connect_error', (err) => {
      console.error('WebSocket: Connection Error', err.message);
    });

    // Generic handler for all subscribed events
    this.socket.onAny((event: WebSocketEvent, data: any) => {
      const handlers = this.subscriptions.get(event);
      if (handlers) {
        handlers.forEach((handler) => handler(data));
      }
    });
  }

  public disconnect(): void {
    this.socket?.disconnect();
    this.socket = null;
    this.subscriptions.clear();
    console.log('WebSocket: Disconnected');
  }

  /**
   * Subscribe to a specific event from the server.
   * @param event - The event name to listen for.
   * @param handler - The callback function to execute.
   * @returns An unsubscribe function.
   */
  public subscribe(event: WebSocketEvent, handler: EventHandler): () => void {
    if (!this.subscriptions.has(event)) {
      this.subscriptions.set(event, []);
    }
    this.subscriptions.get(event)?.push(handler);

    // Return an unsubscribe function
    return () => {
      const handlers = this.subscriptions.get(event);
      if (handlers) {
        const index = handlers.indexOf(handler);
        if (index > -1) {
          handlers.splice(index, 1);
        }
      }
    };
  }

  /**
   * Emit an event to the server.
   * @param event - The event name.
   * @param data - The payload.
   */
  public emit(event: string, data: any): void {
    if (!this.socket) {
      console.error('WebSocket: Not connected. Cannot emit event.');
      return;
    }
    this.socket.emit(event, data);
  }
}

/**
 * Singleton instance of the WebSocketClient.
 */
export const webSocketClient = new WebSocketClient();
