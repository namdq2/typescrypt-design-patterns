import { Pattern, Factory } from '../../utils/types';

/**
 * Factory Method Pattern Implementation
 * 
 * Intent: Define an interface for creating objects, but let subclasses decide 
 * which class to instantiate. Factory Method lets a class defer instantiation 
 * to subclasses.
 * 
 * Use Cases:
 * - Creating objects without specifying exact classes
 * - When a class needs to delegate object creation to subclasses
 * - When you want to provide a library of products
 */

// Product interface
export interface Product {
  name: string;
  price: number;
  category: string;
  operation(): string;
}

// Concrete Products
export class ConcreteProductA implements Product {
  name = 'Product A';
  price = 100;
  category = 'Electronics';
  
  operation(): string {
    return 'ConcreteProductA operation';
  }
}

export class ConcreteProductB implements Product {
  name = 'Product B';
  price = 200;
  category = 'Clothing';
  
  operation(): string {
    return 'ConcreteProductB operation';
  }
}

// Creator abstract class
export abstract class Creator implements Pattern {
  public readonly name = 'Factory Method';
  public readonly category = 'Creational' as const;
  public readonly description = 'Define an interface for creating objects, but let subclasses decide which class to instantiate';
  
  // Factory method - to be implemented by subclasses
  public abstract factoryMethod(): Product;
  
  // Template method that uses the factory method
  public someOperation(): string {
    const product = this.factoryMethod();
    return `Creator: Working with ${product.operation()}`;
  }
}

// Concrete Creators
export class ConcreteCreatorA extends Creator {
  public factoryMethod(): Product {
    return new ConcreteProductA();
  }
}

export class ConcreteCreatorB extends Creator {
  public factoryMethod(): Product {
    return new ConcreteProductB();
  }
}

// Alternative implementation using function factories
export type ProductType = 'A' | 'B';

export class ProductFactory implements Factory<Product> {
  create(type: ProductType): Product {
    switch (type) {
      case 'A':
        return new ConcreteProductA();
      case 'B':
        return new ConcreteProductB();
      default:
        throw new Error(`Unknown product type: ${type}`);
    }
  }
}

// Generic Factory Method
export interface GenericProduct {
  getId(): string;
  getName(): string;
}

export abstract class GenericFactory<T extends GenericProduct> {
  public abstract create(id: string): T;
  
  public createMultiple(ids: string[]): T[] {
    return ids.map(id => this.create(id));
  }
}

// Parameterized Factory Method
export class ParameterizedFactory<T> {
  private creators: Map<string, () => T> = new Map();
  
  public register(type: string, creator: () => T): void {
    this.creators.set(type, creator);
  }
  
  public create(type: string): T {
    const creator = this.creators.get(type);
    if (!creator) {
      throw new Error(`No creator registered for type: ${type}`);
    }
    return creator();
  }
  
  public getAvailableTypes(): string[] {
    return Array.from(this.creators.keys());
  }
}

// Factory Method with dependency injection
export interface DatabaseConnection {
  connect(): void;
  query(sql: string): any[];
}

export class MySQLConnection implements DatabaseConnection {
  connect(): void {
    console.log('Connecting to MySQL database');
  }
  
  query(sql: string): any[] {
    console.log(`Executing MySQL query: ${sql}`);
    return [];
  }
}

export class PostgreSQLConnection implements DatabaseConnection {
  connect(): void {
    console.log('Connecting to PostgreSQL database');
  }
  
  query(sql: string): any[] {
    console.log(`Executing PostgreSQL query: ${sql}`);
    return [];
  }
}

export abstract class DatabaseFactory {
  public abstract createConnection(): DatabaseConnection;
  
  public createAndConnect(): DatabaseConnection {
    const connection = this.createConnection();
    connection.connect();
    return connection;
  }
}

export class MySQLFactory extends DatabaseFactory {
  public createConnection(): DatabaseConnection {
    return new MySQLConnection();
  }
}

export class PostgreSQLFactory extends DatabaseFactory {
  public createConnection(): DatabaseConnection {
    return new PostgreSQLConnection();
  }
}