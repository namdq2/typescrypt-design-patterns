// Main entry point for the design patterns library

// Export all creational patterns
export * from './creational/abstract-factory';
export * from './creational/builder';
export * from './creational/factory-method';
export * from './creational/prototype';
export * from './creational/singleton';

// Export common types and utilities
export * from './utils/types';

// TODO: Export structural and behavioral patterns once implemented
// export * from './structural/adapter';
// export * from './structural/bridge';
// export * from './structural/composite';
// export * from './structural/decorator';
// export * from './structural/facade';
// export * from './structural/flyweight';
// export * from './structural/proxy';

// export * from './behavioral/chain-of-responsibility';
// export * from './behavioral/command';
// export * from './behavioral/interpreter';
// export * from './behavioral/iterator';
// export * from './behavioral/mediator';
// export * from './behavioral/memento';
// export * from './behavioral/observer';
// export * from './behavioral/state';
// export * from './behavioral/strategy';
// export * from './behavioral/template-method';
// export * from './behavioral/visitor';

// Pattern registry for discovery
export const PATTERNS = {
  CREATIONAL: [
    'AbstractFactory',
    'Builder',
    'FactoryMethod',
    'Prototype',
    'Singleton',
  ],
  STRUCTURAL: [
    'Adapter',
    'Bridge',
    'Composite',
    'Decorator',
    'Facade',
    'Flyweight',
    'Proxy',
  ],
  BEHAVIORAL: [
    'ChainOfResponsibility',
    'Command',
    'Interpreter',
    'Iterator',
    'Mediator',
    'Memento',
    'Observer',
    'State',
    'Strategy',
    'TemplateMethod',
    'Visitor',
  ],
} as const;