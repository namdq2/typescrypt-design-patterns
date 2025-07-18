import { Singleton, LazySingleton, SingletonRegistry } from './index';

describe('Singleton Pattern', () => {
  afterEach(() => {
    // Reset singletons after each test
    Singleton.reset();
    LazySingleton.reset();
    SingletonRegistry.resetAll();
  });

  describe('Basic Singleton', () => {
    it('should create only one instance', () => {
      const instance1 = Singleton.getInstance();
      const instance2 = Singleton.getInstance();
      
      expect(instance1).toBe(instance2);
    });

    it('should throw error when trying to instantiate directly', () => {
      expect(() => {
        // @ts-ignore - accessing private constructor for testing
        new Singleton();
      }).toThrow('Cannot instantiate Singleton directly. Use getInstance() instead.');
    });

    it('should have correct pattern properties', () => {
      const instance = Singleton.getInstance();
      
      expect(instance.name).toBe('Singleton');
      expect(instance.category).toBe('Creational');
      expect(instance.description).toBe('Ensures a class has only one instance and provides global access to it');
    });

    it('should execute methods correctly', () => {
      const instance = Singleton.getInstance();
      
      expect(instance.doSomething()).toBe('Singleton instance is working!');
    });

    it('should reset instance correctly', () => {
      const instance1 = Singleton.getInstance();
      Singleton.reset();
      const instance2 = Singleton.getInstance();
      
      expect(instance1).not.toBe(instance2);
    });
  });

  describe('Lazy Singleton', () => {
    it('should create instance only when accessed', () => {
      const instance1 = LazySingleton.instance;
      const instance2 = LazySingleton.instance;
      
      expect(instance1).toBe(instance2);
    });

    it('should have timestamp data', () => {
      const instance = LazySingleton.instance;
      const data = instance.getData();
      
      expect(data).toContain('Created at');
      expect(data).toMatch(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
    });

    it('should reset instance correctly', () => {
      const instance1 = LazySingleton.instance;
      const data1 = instance1.getData();
      
      LazySingleton.reset();
      
      // Wait a bit to ensure different timestamp
      setTimeout(() => {
        const instance2 = LazySingleton.instance;
        const data2 = instance2.getData();
        
        expect(instance1).not.toBe(instance2);
        expect(data1).not.toBe(data2);
      }, 10);
    });
  });

  describe('Singleton Registry', () => {
    class TestSingleton {
      private value: string;

      private constructor() {
        this.value = 'test';
      }

      public static getInstance(): TestSingleton {
        return SingletonRegistry.getInstance('TestSingleton', () => new TestSingleton());
      }

      public getValue(): string {
        return this.value;
      }

      public setValue(value: string): void {
        this.value = value;
      }
    }

    class AnotherSingleton {
      private constructor() {}

      public static getInstance(): AnotherSingleton {
        return SingletonRegistry.getInstance('AnotherSingleton', () => new AnotherSingleton());
      }
    }

    afterEach(() => {
      // Reset all registry singletons after each test
      SingletonRegistry.resetAll();
    });

    it('should create separate instances for different classes', () => {
      const test1 = TestSingleton.getInstance();
      const test2 = TestSingleton.getInstance();
      const another = AnotherSingleton.getInstance();
      
      expect(test1).toBe(test2);
      expect(test1).not.toBe(another);
    });

    it('should maintain state across getInstance calls', () => {
      const instance1 = TestSingleton.getInstance();
      instance1.setValue('modified');
      
      const instance2 = TestSingleton.getInstance();
      
      expect(instance2.getValue()).toBe('modified');
    });

    it('should check if instance exists', () => {
      expect(SingletonRegistry.hasInstance('TestSingleton')).toBe(false);
      
      TestSingleton.getInstance();
      
      expect(SingletonRegistry.hasInstance('TestSingleton')).toBe(true);
    });

    it('should reset specific instance', () => {
      const instance1 = TestSingleton.getInstance();
      
      SingletonRegistry.reset('TestSingleton');
      
      const instance2 = TestSingleton.getInstance();
      
      expect(instance1).not.toBe(instance2);
    });
  });

  describe('Thread Safety', () => {
    it('should handle concurrent access correctly', async () => {
      // Reset to ensure clean state
      Singleton.reset();
      
      const promises = Array.from({ length: 100 }, () => 
        Promise.resolve().then(() => Singleton.getInstance())
      );
      
      const instances = await Promise.all(promises);
      
      // All instances should be the same
      const firstInstance = instances[0];
      instances.forEach(instance => {
        expect(instance).toBe(firstInstance);
      });
    });
  });

  describe('Memory Management', () => {
    it('should not create multiple instances even with multiple calls', () => {
      const instances = [];
      
      for (let i = 0; i < 1000; i++) {
        instances.push(Singleton.getInstance());
      }
      
      // All instances should be the same object
      const firstInstance = instances[0];
      instances.forEach(instance => {
        expect(instance).toBe(firstInstance);
      });
    });
  });
});