// Common type definitions used across design patterns

// Base interface for all design pattern implementations
export interface Pattern {
  readonly name: string;
  readonly category: PatternCategory;
  readonly description: string;
}

// Pattern categories
export type PatternCategory = 'Creational' | 'Structural' | 'Behavioral';

// Common utility types
export type Constructor<T = {}> = new (...args: any[]) => T;
export type Mixin<T> = Constructor<T>;

// Observer pattern types
export interface Observer<T = any> {
  update(data: T): void;
}

export interface Subject<T = any> {
  attach(observer: Observer<T>): void;
  detach(observer: Observer<T>): void;
  notify(data: T): void;
}

// Command pattern types
export interface Command {
  execute(): void;
  undo?(): void;
}

// Strategy pattern types
export interface Strategy {
  execute(...args: any[]): any;
}

// State pattern types
export interface State {
  handle(context: any): void;
}

// Visitor pattern types
export interface Visitor {
  visit(element: any): void;
}

export interface Visitable {
  accept(visitor: Visitor): void;
}

// Factory pattern types
export interface Factory<T> {
  create(...args: any[]): T;
}

// Builder pattern types
export interface Builder<T> {
  build(): T;
  reset(): this;
}

// Prototype pattern types
export interface Prototype<T> {
  clone(): T;
}

// Adapter pattern types
export interface Adapter {
  request(): void;
}

// Common event types
export interface Event {
  type: string;
  data?: any;
  timestamp: Date;
}

// Logging levels for examples
export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

// Common result type for operations
export type Result<T, E = Error> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: E;
    };

// Utility function to create successful result
export const success = <T>(data: T): Result<T> => ({
  success: true,
  data,
});

// Utility function to create error result
export const error = <E = Error>(error: E): Result<never, E> => ({
  success: false,
  error,
});
