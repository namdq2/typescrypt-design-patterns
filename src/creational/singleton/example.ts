import { Singleton, LazySingleton, SingletonRegistry } from './index';

/**
 * Real-world example: Database Connection Manager
 */
class DatabaseConnection {
  private isConnected = false;
  private connectionString: string;

  private constructor() {
    this.connectionString = 'mongodb://localhost:27017/myapp';
  }

  public static getInstance(): DatabaseConnection {
    return SingletonRegistry.getInstance('DatabaseConnection', () => new DatabaseConnection());
  }

  public connect(): void {
    if (!this.isConnected) {
      console.log(`Connecting to database: ${this.connectionString}`);
      this.isConnected = true;
    }
  }

  public disconnect(): void {
    if (this.isConnected) {
      console.log('Disconnecting from database');
      this.isConnected = false;
    }
  }

  public isConnectionOpen(): boolean {
    return this.isConnected;
  }

  public query(sql: string): any[] {
    if (!this.isConnected) {
      throw new Error('Database not connected');
    }
    console.log(`Executing query: ${sql}`);
    return [{ id: 1, name: 'Sample Data' }];
  }
}

/**
 * Real-world example: Application Logger
 */
class Logger {
  private static instance: Logger;
  private logs: string[] = [];

  private constructor() {}

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  public log(message: string, level: 'INFO' | 'WARN' | 'ERROR' = 'INFO'): void {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${level}: ${message}`;
    this.logs.push(logEntry);
    console.log(logEntry);
  }

  public getLogs(): string[] {
    return [...this.logs];
  }

  public clearLogs(): void {
    this.logs = [];
  }
}

/**
 * Real-world example: Configuration Manager
 */
class ConfigManager {
  private static instance: ConfigManager;
  private config: Record<string, any> = {};

  private constructor() {
    // Load default configuration
    this.config = {
      apiUrl: 'https://api.example.com',
      timeout: 5000,
      retries: 3,
      debug: false,
    };
  }

  public static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }

  public get(key: string): any {
    return this.config[key];
  }

  public set(key: string, value: any): void {
    this.config[key] = value;
  }

  public getAll(): Record<string, any> {
    return { ...this.config };
  }
}

// Usage examples
export function demonstrateSingleton(): void {
  console.log('=== Singleton Pattern Examples ===\n');

  // Basic Singleton
  console.log('1. Basic Singleton:');
  const singleton1 = Singleton.getInstance();
  const singleton2 = Singleton.getInstance();
  console.log('Same instance?', singleton1 === singleton2);
  console.log('Result:', singleton1.doSomething());

  // Lazy Singleton
  console.log('\n2. Lazy Singleton:');
  const lazy1 = LazySingleton.instance;
  const lazy2 = LazySingleton.instance;
  console.log('Same instance?', lazy1 === lazy2);
  console.log('Data:', lazy1.getData());

  // Database Connection
  console.log('\n3. Database Connection Singleton:');
  const db1 = DatabaseConnection.getInstance();
  const db2 = DatabaseConnection.getInstance();
  console.log('Same instance?', db1 === db2);

  db1.connect();
  console.log('Connection status:', db1.isConnectionOpen());

  const results = db1.query('SELECT * FROM users');
  console.log('Query results:', results);

  db1.disconnect();

  // Logger
  console.log('\n4. Logger Singleton:');
  const logger1 = Logger.getInstance();
  const logger2 = Logger.getInstance();
  console.log('Same instance?', logger1 === logger2);

  logger1.log('Application started');
  logger1.log('User logged in', 'INFO');
  logger1.log('Invalid input detected', 'WARN');
  logger1.log('Database connection failed', 'ERROR');

  console.log('Total logs:', logger1.getLogs().length);

  // Configuration
  console.log('\n5. Configuration Manager:');
  const config1 = ConfigManager.getInstance();
  const config2 = ConfigManager.getInstance();
  console.log('Same instance?', config1 === config2);

  console.log('API URL:', config1.get('apiUrl'));
  config1.set('apiUrl', 'https://api-v2.example.com');
  console.log('Updated API URL:', config2.get('apiUrl'));

  console.log('All config:', config1.getAll());
}

// Run the demonstration
if (require.main === module) {
  demonstrateSingleton();
}
