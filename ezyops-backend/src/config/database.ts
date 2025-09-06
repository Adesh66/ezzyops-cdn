import { db } from './firebase.js';
import { logger } from '../utils/logger.js';

export class DatabaseConnection {
  private static instance: DatabaseConnection;
  private isConnected: boolean = false;

  private constructor() {}

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  public async connect(): Promise<void> {
    try {
      // Test Firestore connection by attempting to read from a test collection
      await db.collection('_health_check').limit(1).get();
      this.isConnected = true;
      logger.info('Successfully connected to Firestore');
    } catch (error) {
      this.isConnected = false;
      logger.error('Failed to connect to Firestore', { error });
      throw new Error('Database connection failed');
    }
  }

  public async disconnect(): Promise<void> {
    try {
      // Firebase Admin SDK doesn't require explicit disconnection
      // but we can mark as disconnected for our tracking
      this.isConnected = false;
      logger.info('Disconnected from Firestore');
    } catch (error) {
      logger.error('Error during database disconnection', { error });
    }
  }

  public isHealthy(): boolean {
    return this.isConnected;
  }

  public async healthCheck(): Promise<{ status: string; timestamp: string; latency?: number }> {
    const startTime = Date.now();
    
    try {
      await db.collection('_health_check').limit(1).get();
      const latency = Date.now() - startTime;
      
      return {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        latency
      };
    } catch (error) {
      logger.error('Database health check failed', { error });
      return {
        status: 'unhealthy',
        timestamp: new Date().toISOString()
      };
    }
  }
}

// Export singleton instance
export const dbConnection = DatabaseConnection.getInstance();

// Initialize database connection
export const initializeDatabase = async (): Promise<void> => {
  try {
    await dbConnection.connect();
    logger.info('Database initialization completed');
  } catch (error) {
    logger.error('Database initialization failed', { error });
    throw error;
  }
};
