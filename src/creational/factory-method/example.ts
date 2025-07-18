import {
  ConcreteCreatorA,
  ConcreteCreatorB,
  ProductFactory,
  ParameterizedFactory,
  MySQLFactory,
  PostgreSQLFactory,
  GenericFactory,
  GenericProduct
} from './index';

/**
 * Real-world example: Vehicle Factory
 */
interface Vehicle {
  type: string;
  brand: string;
  start(): string;
  stop(): string;
}

class Car implements Vehicle {
  type = 'Car';
  brand: string;
  
  constructor(brand: string) {
    this.brand = brand;
  }
  
  start(): string {
    return `${this.brand} car engine started`;
  }
  
  stop(): string {
    return `${this.brand} car engine stopped`;
  }
}

class Motorcycle implements Vehicle {
  type = 'Motorcycle';
  brand: string;
  
  constructor(brand: string) {
    this.brand = brand;
  }
  
  start(): string {
    return `${this.brand} motorcycle engine started`;
  }
  
  stop(): string {
    return `${this.brand} motorcycle engine stopped`;
  }
}

class Truck implements Vehicle {
  type = 'Truck';
  brand: string;
  
  constructor(brand: string) {
    this.brand = brand;
  }
  
  start(): string {
    return `${this.brand} truck engine started`;
  }
  
  stop(): string {
    return `${this.brand} truck engine stopped`;
  }
}

abstract class VehicleFactory {
  abstract createVehicle(brand: string): Vehicle;
  
  public createFleet(brands: string[]): Vehicle[] {
    return brands.map(brand => this.createVehicle(brand));
  }
}

class CarFactory extends VehicleFactory {
  createVehicle(brand: string): Vehicle {
    return new Car(brand);
  }
}

class MotorcycleFactory extends VehicleFactory {
  createVehicle(brand: string): Vehicle {
    return new Motorcycle(brand);
  }
}

class TruckFactory extends VehicleFactory {
  createVehicle(brand: string): Vehicle {
    return new Truck(brand);
  }
}

/**
 * Real-world example: Document Factory
 */
interface Document {
  title: string;
  content: string;
  format: string;
  save(): string;
  print(): string;
}

class PDFDocument implements Document {
  title: string;
  content: string;
  format = 'PDF';
  
  constructor(title: string, content: string) {
    this.title = title;
    this.content = content;
  }
  
  save(): string {
    return `PDF document "${this.title}" saved`;
  }
  
  print(): string {
    return `PDF document "${this.title}" printed`;
  }
}

class WordDocument implements Document {
  title: string;
  content: string;
  format = 'DOCX';
  
  constructor(title: string, content: string) {
    this.title = title;
    this.content = content;
  }
  
  save(): string {
    return `Word document "${this.title}" saved`;
  }
  
  print(): string {
    return `Word document "${this.title}" printed`;
  }
}

class TextDocument implements Document {
  title: string;
  content: string;
  format = 'TXT';
  
  constructor(title: string, content: string) {
    this.title = title;
    this.content = content;
  }
  
  save(): string {
    return `Text document "${this.title}" saved`;
  }
  
  print(): string {
    return `Text document "${this.title}" printed`;
  }
}

class DocumentFactory {
  private static factories: Map<string, (title: string, content: string) => Document> = new Map([
    ['pdf', (title, content) => new PDFDocument(title, content)],
    ['docx', (title, content) => new WordDocument(title, content)],
    ['txt', (title, content) => new TextDocument(title, content)]
  ]);
  
  public static createDocument(format: string, title: string, content: string): Document {
    const factory = this.factories.get(format.toLowerCase());
    if (!factory) {
      throw new Error(`Unsupported document format: ${format}`);
    }
    return factory(title, content);
  }
  
  public static getSupportedFormats(): string[] {
    return Array.from(this.factories.keys());
  }
}

/**
 * Real-world example: Logger Factory
 */
interface Logger {
  log(message: string, level: 'INFO' | 'WARN' | 'ERROR'): void;
}

class ConsoleLogger implements Logger {
  log(message: string, level: 'INFO' | 'WARN' | 'ERROR'): void {
    console.log(`[${level}] ${message}`);
  }
}

class FileLogger implements Logger {
  private filename: string;
  
  constructor(filename: string) {
    this.filename = filename;
  }
  
  log(message: string, level: 'INFO' | 'WARN' | 'ERROR'): void {
    console.log(`[${level}] Writing to ${this.filename}: ${message}`);
  }
}

class DatabaseLogger implements Logger {
  private tableName: string;
  
  constructor(tableName: string) {
    this.tableName = tableName;
  }
  
  log(message: string, level: 'INFO' | 'WARN' | 'ERROR'): void {
    console.log(`[${level}] Inserting into ${this.tableName}: ${message}`);
  }
}

class LoggerFactory {
  public static createLogger(type: 'console' | 'file' | 'database', config?: any): Logger {
    switch (type) {
      case 'console':
        return new ConsoleLogger();
      case 'file':
        return new FileLogger(config?.filename || 'app.log');
      case 'database':
        return new DatabaseLogger(config?.tableName || 'logs');
      default:
        throw new Error(`Unknown logger type: ${type}`);
    }
  }
}

/**
 * Example with Generic Factory
 */
class User implements GenericProduct {
  constructor(private id: string, private name: string) {}
  
  getId(): string {
    return this.id;
  }
  
  getName(): string {
    return this.name;
  }
}

class UserFactory extends GenericFactory<User> {
  private users: Map<string, User> = new Map([
    ['1', new User('1', 'John Doe')],
    ['2', new User('2', 'Jane Smith')],
    ['3', new User('3', 'Bob Johnson')]
  ]);
  
  create(id: string): User {
    const user = this.users.get(id);
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    return user;
  }
}

// Usage demonstrations
export function demonstrateFactoryMethod(): void {
  console.log('=== Factory Method Pattern Examples ===\n');
  
  // Basic Factory Method
  console.log('1. Basic Factory Method:');
  const creatorA = new ConcreteCreatorA();
  const creatorB = new ConcreteCreatorB();
  
  console.log(creatorA.someOperation());
  console.log(creatorB.someOperation());
  
  // Product Factory
  console.log('\n2. Product Factory:');
  const productFactory = new ProductFactory();
  const productA = productFactory.create('A');
  const productB = productFactory.create('B');
  
  console.log(`Created: ${productA.name} - ${productA.operation()}`);
  console.log(`Created: ${productB.name} - ${productB.operation()}`);
  
  // Vehicle Factory
  console.log('\n3. Vehicle Factory:');
  const carFactory = new CarFactory();
  const motorcycleFactory = new MotorcycleFactory();
  const truckFactory = new TruckFactory();
  
  const car = carFactory.createVehicle('Toyota');
  const motorcycle = motorcycleFactory.createVehicle('Harley-Davidson');
  const truck = truckFactory.createVehicle('Ford');
  
  console.log(car.start());
  console.log(motorcycle.start());
  console.log(truck.start());
  
  // Document Factory
  console.log('\n4. Document Factory:');
  const pdf = DocumentFactory.createDocument('pdf', 'Report', 'This is a PDF report');
  const word = DocumentFactory.createDocument('docx', 'Letter', 'This is a Word letter');
  const text = DocumentFactory.createDocument('txt', 'Notes', 'This is a text note');
  
  console.log(pdf.save());
  console.log(word.save());
  console.log(text.save());
  
  console.log('Supported formats:', DocumentFactory.getSupportedFormats());
  
  // Logger Factory
  console.log('\n5. Logger Factory:');
  const consoleLogger = LoggerFactory.createLogger('console');
  const fileLogger = LoggerFactory.createLogger('file', { filename: 'app.log' });
  const dbLogger = LoggerFactory.createLogger('database', { tableName: 'application_logs' });
  
  consoleLogger.log('Application started', 'INFO');
  fileLogger.log('File operation completed', 'INFO');
  dbLogger.log('Database error occurred', 'ERROR');
  
  // Database Factory
  console.log('\n6. Database Factory:');
  const mysqlFactory = new MySQLFactory();
  const postgresFactory = new PostgreSQLFactory();
  
  const mysqlConnection = mysqlFactory.createAndConnect();
  const postgresConnection = postgresFactory.createAndConnect();
  
  mysqlConnection.query('SELECT * FROM users');
  postgresConnection.query('SELECT * FROM products');
  
  // Parameterized Factory
  console.log('\n7. Parameterized Factory:');
  const vehicleFactory = new ParameterizedFactory<Vehicle>();
  vehicleFactory.register('car', () => new Car('Generic'));
  vehicleFactory.register('motorcycle', () => new Motorcycle('Generic'));
  vehicleFactory.register('truck', () => new Truck('Generic'));
  
  const vehicle1 = vehicleFactory.create('car');
  const vehicle2 = vehicleFactory.create('motorcycle');
  
  console.log(vehicle1.start());
  console.log(vehicle2.start());
  console.log('Available types:', vehicleFactory.getAvailableTypes());
  
  // Generic Factory
  console.log('\n8. Generic Factory:');
  const userFactory = new UserFactory();
  const user1 = userFactory.create('1');
  const user2 = userFactory.create('2');
  
  console.log(`User: ${user1.getName()}`);
  console.log(`User: ${user2.getName()}`);
  
  const multipleUsers = userFactory.createMultiple(['1', '2', '3']);
  console.log(`Created ${multipleUsers.length} users`);
}

// Run the demonstration
if (require.main === module) {
  demonstrateFactoryMethod();
}