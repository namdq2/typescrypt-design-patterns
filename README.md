# Design Patterns in TypeScript

A comprehensive TypeScript implementation of all 23 Gang of Four (GoF) design patterns with real-world examples, tests, and documentation.

## 📋 Table of Contents

- [Overview](#overview)
- [Design Patterns](#design-patterns)
  - [Creational Patterns](#creational-patterns)
  - [Structural Patterns](#structural-patterns)
  - [Behavioral Patterns](#behavioral-patterns)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Contributing](#contributing)

## 🎯 Overview

This repository contains TypeScript implementations of all 23 design patterns described in the seminal book "Design Patterns: Elements of Reusable Object-Oriented Software" by the Gang of Four (Gamma, Helm, Johnson, and Vlissides).

Each pattern includes:
- ✅ Complete TypeScript implementation
- ✅ Real-world usage examples
- ✅ Unit tests
- ✅ Comprehensive documentation
- ✅ UML diagrams and explanations

## 🏗️ Design Patterns

### Status Legend
- ✅ **Complete** - Full implementation with tests, examples, and documentation
- 🔄 **In Progress** - Basic implementation, needs tests/examples
- ⏳ **Planned** - Not yet implemented

### Creational Patterns (5)
These patterns deal with object creation mechanisms, trying to create objects in a manner suitable to the situation.

| Pattern | Description | Status |
|---------|-------------|--------|
| [Abstract Factory](./src/creational/abstract-factory/) | Creates families of related objects | ⏳ |
| [Builder](./src/creational/builder/) | Constructs complex objects step by step | ⏳ |
| [Factory Method](./src/creational/factory-method/) | Creates objects without specifying exact classes | 🔄 |
| [Prototype](./src/creational/prototype/) | Creates objects by cloning existing instances | ⏳ |
| [Singleton](./src/creational/singleton/) | Ensures only one instance of a class exists | ✅ |

### Structural Patterns (7)
These patterns deal with object composition, creating relationships between objects to form larger structures.

| Pattern | Description | Status |
|---------|-------------|--------|
| [Adapter](./src/structural/adapter/) | Allows incompatible interfaces to work together | ⏳ |
| [Bridge](./src/structural/bridge/) | Separates abstraction from implementation | ⏳ |
| [Composite](./src/structural/composite/) | Composes objects into tree structures | ⏳ |
| [Decorator](./src/structural/decorator/) | Adds behavior to objects dynamically | ⏳ |
| [Facade](./src/structural/facade/) | Provides simplified interface to complex subsystem | ⏳ |
| [Flyweight](./src/structural/flyweight/) | Shares objects efficiently to minimize memory usage | ⏳ |
| [Proxy](./src/structural/proxy/) | Provides placeholder/surrogate for another object | ⏳ |

### Behavioral Patterns (11)
These patterns are concerned with algorithms and the assignment of responsibilities between objects.

| Pattern | Description | Status |
|---------|-------------|--------|
| [Chain of Responsibility](./src/behavioral/chain-of-responsibility/) | Passes requests along handler chain | ⏳ |
| [Command](./src/behavioral/command/) | Encapsulates requests as objects | ⏳ |
| [Interpreter](./src/behavioral/interpreter/) | Defines grammar and interprets sentences | ⏳ |
| [Iterator](./src/behavioral/iterator/) | Provides way to access elements sequentially | ⏳ |
| [Mediator](./src/behavioral/mediator/) | Defines how objects interact with each other | ⏳ |
| [Memento](./src/behavioral/memento/) | Captures and restores object state | ⏳ |
| [Observer](./src/behavioral/observer/) | Notifies multiple objects about state changes | ⏳ |
| [State](./src/behavioral/state/) | Alters object behavior when internal state changes | ⏳ |
| [Strategy](./src/behavioral/strategy/) | Encapsulates algorithms and makes them interchangeable | ⏳ |
| [Template Method](./src/behavioral/template-method/) | Defines skeleton of algorithm in base class | ⏳ |
| [Visitor](./src/behavioral/visitor/) | Separates algorithms from object structure | ⏳ |

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/namdq2/typescrypt-design-patterns.git
cd typescrypt-design-patterns

# Install dependencies
npm install

# Run tests
npm test

# Build the project
npm run build

# Run linting
npm run lint
```

### Running Examples
```bash
# Run a specific pattern example
npm run dev

# Run tests for a specific pattern
npm test -- --testPathPattern=singleton

# Run tests with coverage
npm run test:coverage
```

## 📁 Project Structure

```
design-pattern/
├── src/
│   ├── creational/          # Creational patterns
│   ├── structural/          # Structural patterns
│   ├── behavioral/          # Behavioral patterns
│   └── utils/               # Common utilities and types
├── docs/                    # Documentation
├── examples/                # Real-world examples
├── package.json
├── tsconfig.json
└── jest.config.js
```

Each pattern directory contains:
- `index.ts` - Main pattern implementation
- `example.ts` - Real-world usage example
- `test.spec.ts` - Unit tests
- `README.md` - Pattern documentation

## 🎯 Learning Path

1. **Start with Creational Patterns** - Learn object creation mechanisms
2. **Move to Structural Patterns** - Understand object composition
3. **Explore Behavioral Patterns** - Master object interaction patterns

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📚 Resources

- [Gang of Four Design Patterns Book](https://www.amazon.com/Design-Patterns-Elements-Reusable-Object-Oriented/dp/0201633612)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Jest Testing Framework](https://jestjs.io/docs/getting-started)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

⭐ Star this repo if you find it helpful!