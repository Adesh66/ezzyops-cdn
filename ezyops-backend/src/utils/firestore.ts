import { db } from '../config/firebase.js';
import { logger } from './logger.js';

export class FirestoreService {
  private collection: string;

  constructor(collectionName: string) {
    this.collection = collectionName;
  }

  async create<T extends { id?: string; createdAt?: Date }>(data: Omit<T, 'id' | 'createdAt'>): Promise<T> {
    try {
      const ref = db.collection(this.collection).doc();
      const document: T = {
        ...data,
        id: ref.id,
        createdAt: new Date()
      } as T;
      
      await ref.set(document);
      logger.info(`Document created in ${this.collection}`, { id: ref.id });
      return document;
    } catch (error) {
      logger.error(`Failed to create document in ${this.collection}`, { error });
      throw error;
    }
  }

  async getById<T>(id: string): Promise<T | null> {
    try {
      const doc = await db.collection(this.collection).doc(id).get();
      if (!doc.exists) {
        logger.debug(`Document not found in ${this.collection}`, { id });
        return null;
      }
      return doc.data() as T;
    } catch (error) {
      logger.error(`Failed to get document from ${this.collection}`, { id, error });
      throw error;
    }
  }

  async getAll<T>(limit?: number, orderBy?: string, direction: 'asc' | 'desc' = 'desc'): Promise<T[]> {
    try {
      let query: FirebaseFirestore.Query = db.collection(this.collection);
      
      if (orderBy) {
        query = query.orderBy(orderBy, direction);
      }
      
      if (limit) {
        query = query.limit(limit);
      }
      
      const snapshot = await query.get();
      const documents = snapshot.docs.map((doc: FirebaseFirestore.QueryDocumentSnapshot) => doc.data() as T);
      
      logger.debug(`Retrieved ${documents.length} documents from ${this.collection}`);
      return documents;
    } catch (error) {
      logger.error(`Failed to get documents from ${this.collection}`, { error });
      throw error;
    }
  }

  async update<T>(id: string, data: Partial<T>): Promise<T> {
    try {
      const ref = db.collection(this.collection).doc(id);
      const updateData = {
        ...data,
        updatedAt: new Date()
      };
      
      await ref.update(updateData);
      const doc = await ref.get();
      
      if (!doc.exists) {
        throw new Error(`Document ${id} not found in ${this.collection}`);
      }
      
      logger.info(`Document updated in ${this.collection}`, { id });
      return doc.data() as T;
    } catch (error) {
      logger.error(`Failed to update document in ${this.collection}`, { id, error });
      throw error;
    }
  }

  async delete(id: string): Promise<{ success: boolean }> {
    try {
      await db.collection(this.collection).doc(id).delete();
      logger.info(`Document deleted from ${this.collection}`, { id });
      return { success: true };
    } catch (error) {
      logger.error(`Failed to delete document from ${this.collection}`, { id, error });
      throw error;
    }
  }

  async query<T>(
    field: string, 
    operator: FirebaseFirestore.WhereFilterOp, 
    value: any,
    limit?: number
  ): Promise<T[]> {
    try {
      let query = db.collection(this.collection).where(field, operator, value);
      
      if (limit) {
        query = query.limit(limit);
      }
      
      const snapshot = await query.get();
      const documents = snapshot.docs.map(doc => doc.data() as T);
      
      logger.debug(`Query returned ${documents.length} documents from ${this.collection}`, {
        field, operator, value
      });
      
      return documents;
    } catch (error) {
      logger.error(`Failed to query documents from ${this.collection}`, { 
        field, operator, value, error 
      });
      throw error;
    }
  }

  async exists(id: string): Promise<boolean> {
    try {
      const doc = await db.collection(this.collection).doc(id).get();
      return doc.exists;
    } catch (error) {
      logger.error(`Failed to check document existence in ${this.collection}`, { id, error });
      throw error;
    }
  }

  async count(): Promise<number> {
    try {
      const snapshot = await db.collection(this.collection).get();
      return snapshot.size;
    } catch (error) {
      logger.error(`Failed to count documents in ${this.collection}`, { error });
      throw error;
    }
  }
}

// Utility function to handle Firestore batch operations
export class FirestoreBatch {
  private batch: FirebaseFirestore.WriteBatch;
  private operations: number = 0;
  private readonly MAX_OPERATIONS = 500;

  constructor() {
    this.batch = db.batch();
  }

  set(ref: FirebaseFirestore.DocumentReference, data: any) {
    if (this.operations >= this.MAX_OPERATIONS) {
      throw new Error('Batch operation limit exceeded');
    }
    this.batch.set(ref, data);
    this.operations++;
  }

  update(ref: FirebaseFirestore.DocumentReference, data: any) {
    if (this.operations >= this.MAX_OPERATIONS) {
      throw new Error('Batch operation limit exceeded');
    }
    this.batch.update(ref, data);
    this.operations++;
  }

  delete(ref: FirebaseFirestore.DocumentReference) {
    if (this.operations >= this.MAX_OPERATIONS) {
      throw new Error('Batch operation limit exceeded');
    }
    this.batch.delete(ref);
    this.operations++;
  }

  async commit() {
    try {
      await this.batch.commit();
      logger.info(`Batch operation completed with ${this.operations} operations`);
    } catch (error) {
      logger.error('Batch operation failed', { operations: this.operations, error });
      throw error;
    }
  }
}
