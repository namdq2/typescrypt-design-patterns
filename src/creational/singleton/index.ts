import { Pattern } from '../../utils/types';

/**
 * Singleton Pattern Implementation
 * 
 * Intent: Ensure a class has only one instance and provide global access to it.
 * 
 * Use Cases:
 * - Database connections
 * - Logging services
 * - Configuration settings
 * - Cache managers
 */

export class Singleton implements Pattern {
  private static instance: Singleton;
  private static isCreating = false;
  
  public readonly name = 'Singleton';
  public readonly category = 'Creational' as const;
  public readonly description = 'Ensures a class has only one instance and provides global access to it';
  
  private constructor() {
    // Private constructor prevents instantiation from outside
    if (!Singleton.isCreating) {
      throw new Error('Cannot instantiate Singleton directly. Use getInstance() instead.');
    }
  }
  
  /**
   * Get the singleton instance
   * Thread-safe implementation
   */
  public static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.isCreating = true;
      Singleton.instance = new Singleton();
      Singleton.isCreating = false;
    }
    return Singleton.instance;
  }
  
  /**
   * Reset the singleton instance (useful for testing)
   */
  public static reset(): void {
    Singleton.instance = null as any;
  }
  
  /**
   * Example method to demonstrate singleton behavior
   */
  public doSomething(): string {
    return 'Singleton instance is working!';
  }
}

/**
 * Singleton Registry - manages multiple singleton instances
 */
export class SingletonRegistry {
  private static instances: Map<string, any> = new Map();
  
  public static getInstance<T>(
    key: string,
    factory: () => T
  ): T {
    if (!SingletonRegistry.instances.has(key)) {
      SingletonRegistry.instances.set(key, factory());
    }
    return SingletonRegistry.instances.get(key) as T;
  }
  
  public static reset(key: string): void {
    SingletonRegistry.instances.delete(key);
  }
  
  public static resetAll(): void {
    SingletonRegistry.instances.clear();
  }
  
  public static hasInstance(key: string): boolean {
    return SingletonRegistry.instances.has(key);
  }
}

/**
 * Lazy Singleton - instance created only when needed
 */
export class LazySingleton {
  private static _instance: LazySingleton | null = null;
  private data: string;
  
  private constructor() {
    this.data = `Created at ${new Date().toISOString()}`;
  }
  
  public static get instance(): LazySingleton {
    if (!this._instance) {
      this._instance = new LazySingleton();
    }
    return this._instance;
  }
  
  public getData(): string {
    return this.data;
  }
  
  public static reset(): void {
    this._instance = null;
  }
}

/**
 * Enum Singleton - TypeScript enum-based singleton
 */
export enum SingletonEnum {
  INSTANCE = 'INSTANCE',
}

export namespace SingletonEnum {
  export function doSomething(): string {
    return 'Enum singleton is working!';
  }
}