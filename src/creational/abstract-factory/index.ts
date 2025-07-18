// Abstract Factory Pattern - Implementation coming soon

export interface AbstractFactory {
  createProductA(): ProductA;
  createProductB(): ProductB;
}

export interface ProductA {
  name: string;
}

export interface ProductB {
  name: string;
}

export class ConcreteFactory implements AbstractFactory {
  createProductA(): ProductA {
    return { name: 'Product A' };
  }
  
  createProductB(): ProductB {
    return { name: 'Product B' };
  }
}