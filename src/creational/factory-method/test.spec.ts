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

describe('Factory Method Pattern', () => {
  describe('Basic Factory Method', () => {
    it('should create correct products from different creators', () => {
      const creatorA = new ConcreteCreatorA();
      const creatorB = new ConcreteCreatorB();
      
      const productA = creatorA.factoryMethod();
      const productB = creatorB.factoryMethod();
      
      expect(productA.name).toBe('Product A');
      expect(productB.name).toBe('Product B');
      expect(productA.operation()).toBe('ConcreteProductA operation');
      expect(productB.operation()).toBe('ConcreteProductB operation');
    });
    
    it('should have correct pattern properties', () => {
      const creator = new ConcreteCreatorA();
      
      expect(creator.name).toBe('Factory Method');
      expect(creator.category).toBe('Creational');
      expect(creator.description).toBe('Define an interface for creating objects, but let subclasses decide which class to instantiate');
    });
    
    it('should execute template method correctly', () => {
      const creatorA = new ConcreteCreatorA();
      const creatorB = new ConcreteCreatorB();
      
      const resultA = creatorA.someOperation();
      const resultB = creatorB.someOperation();
      
      expect(resultA).toBe('Creator: Working with ConcreteProductA operation');
      expect(resultB).toBe('Creator: Working with ConcreteProductB operation');
    });
  });
  
  describe('Product Factory', () => {
    let factory: ProductFactory;
    
    beforeEach(() => {
      factory = new ProductFactory();
    });
    
    it('should create product A correctly', () => {
      const product = factory.create('A');
      
      expect(product.name).toBe('Product A');
      expect(product.category).toBe('Electronics');
      expect(product.price).toBe(100);
    });
    
    it('should create product B correctly', () => {
      const product = factory.create('B');
      
      expect(product.name).toBe('Product B');
      expect(product.category).toBe('Clothing');
      expect(product.price).toBe(200);
    });
    
    it('should throw error for unknown product type', () => {
      expect(() => {
        // @ts-ignore - testing invalid input
        factory.create('C');
      }).toThrow('Unknown product type: C');
    });
  });
  
  describe('Parameterized Factory', () => {
    it('should register and create products correctly', () => {
      const factory = new ParameterizedFactory<{ name: string }>();
      
      factory.register('test', () => ({ name: 'Test Product' }));
      
      const product = factory.create('test');
      
      expect(product.name).toBe('Test Product');
    });
    
    it('should return available types', () => {
      const factory = new ParameterizedFactory<{ name: string }>();
      
      factory.register('type1', () => ({ name: 'Type 1' }));
      factory.register('type2', () => ({ name: 'Type 2' }));
      
      const types = factory.getAvailableTypes();
      
      expect(types).toEqual(['type1', 'type2']);
    });
    
    it('should throw error for unregistered type', () => {
      const factory = new ParameterizedFactory<{ name: string }>();
      
      expect(() => {
        factory.create('unknown');
      }).toThrow('No creator registered for type: unknown');
    });
  });
  
  describe('Database Factory', () => {
    it('should create MySQL connection correctly', () => {
      const factory = new MySQLFactory();
      const connection = factory.createConnection();
      
      expect(connection).toBeDefined();
      expect(() => connection.connect()).not.toThrow();
    });
    
    it('should create PostgreSQL connection correctly', () => {
      const factory = new PostgreSQLFactory();
      const connection = factory.createConnection();
      
      expect(connection).toBeDefined();
      expect(() => connection.connect()).not.toThrow();
    });
    
    it('should create and connect in one step', () => {
      const factory = new MySQLFactory();
      const connection = factory.createAndConnect();
      
      expect(connection).toBeDefined();
      expect(() => connection.query('SELECT 1')).not.toThrow();
    });
  });
  
  describe('Generic Factory', () => {
    class TestProduct implements GenericProduct {
      constructor(private id: string, private name: string) {}
      
      getId(): string {
        return this.id;
      }
      
      getName(): string {
        return this.name;
      }
    }
    
    class TestFactory extends GenericFactory<TestProduct> {
      create(id: string): TestProduct {
        return new TestProduct(id, `Product ${id}`);
      }
    }
    
    it('should create single product correctly', () => {
      const factory = new TestFactory();
      const product = factory.create('123');
      
      expect(product.getId()).toBe('123');
      expect(product.getName()).toBe('Product 123');
    });
    
    it('should create multiple products correctly', () => {
      const factory = new TestFactory();
      const products = factory.createMultiple(['1', '2', '3']);
      
      expect(products).toHaveLength(3);
      expect(products[0].getId()).toBe('1');
      expect(products[1].getId()).toBe('2');
      expect(products[2].getId()).toBe('3');
    });
  });
  
  describe('Factory Method Behavior', () => {
    it('should allow different factories to create different products', () => {
      const creatorA = new ConcreteCreatorA();
      const creatorB = new ConcreteCreatorB();
      
      const productA = creatorA.factoryMethod();
      const productB = creatorB.factoryMethod();
      
      expect(productA.constructor.name).toBe('ConcreteProductA');
      expect(productB.constructor.name).toBe('ConcreteProductB');
    });
    
    it('should maintain consistency across multiple calls', () => {
      const creator = new ConcreteCreatorA();
      
      const product1 = creator.factoryMethod();
      const product2 = creator.factoryMethod();
      
      expect(product1.name).toBe(product2.name);
      expect(product1.operation()).toBe(product2.operation());
    });
  });
  
  describe('Error Handling', () => {
    it('should handle factory creation errors gracefully', () => {
      const factory = new ProductFactory();
      
      expect(() => {
        // @ts-ignore - testing invalid input
        factory.create('InvalidType');
      }).toThrow('Unknown product type: InvalidType');
    });
  });
});