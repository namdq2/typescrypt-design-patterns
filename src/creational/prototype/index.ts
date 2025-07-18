// Prototype Pattern - Implementation coming soon

export interface PrototypeInterface<T> {
  clone(): T;
}

export class ConcretePrototype implements PrototypeInterface<ConcretePrototype> {
  constructor(public value: string) {}
  
  clone(): ConcretePrototype {
    return new ConcretePrototype(this.value);
  }
}