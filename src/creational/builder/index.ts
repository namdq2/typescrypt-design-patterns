import { Pattern, Builder as BuilderInterface } from '../../utils/types';

/**
 * Builder Pattern Implementation
 * 
 * Intent: Separate the construction of a complex object from its representation
 * so that the same construction process can create different representations.
 * 
 * Use Cases:
 * - Creating complex objects step by step
 * - When object creation involves many parameters
 * - When you want to create different representations of the same object
 */

// Product interface for Builder pattern
export interface BuilderProduct {
  name: string;
  features: string[];
  getInfo(): string;
}

// Complex product example
export class Computer implements BuilderProduct {
  name: string;
  features: string[] = [];
  
  constructor(
    public cpu: string,
    public ram: string,
    public storage: string,
    public gpu?: string,
    public powerSupply?: string,
    public motherboard?: string
  ) {
    this.name = 'Custom Computer';
    this.features = [cpu, ram, storage];
    if (gpu) this.features.push(gpu);
    if (powerSupply) this.features.push(powerSupply);
    if (motherboard) this.features.push(motherboard);
  }
  
  getInfo(): string {
    return `${this.name}: ${this.features.join(', ')}`;
  }
}

// Builder interface
export interface ComputerBuilder extends BuilderInterface<Computer> {
  setCPU(cpu: string): this;
  setRAM(ram: string): this;
  setStorage(storage: string): this;
  setGPU(gpu: string): this;
  setPowerSupply(powerSupply: string): this;
  setMotherboard(motherboard: string): this;
}

// Concrete Builder
export class ConcreteComputerBuilder implements ComputerBuilder, Pattern {
  public readonly name = 'Builder';
  public readonly category = 'Creational' as const;
  public readonly description = 'Separate the construction of a complex object from its representation';
  
  private cpu: string = '';
  private ram: string = '';
  private storage: string = '';
  private gpu?: string;
  private powerSupply?: string;
  private motherboard?: string;
  
  setCPU(cpu: string): this {
    this.cpu = cpu;
    return this;
  }
  
  setRAM(ram: string): this {
    this.ram = ram;
    return this;
  }
  
  setStorage(storage: string): this {
    this.storage = storage;
    return this;
  }
  
  setGPU(gpu: string): this {
    this.gpu = gpu;
    return this;
  }
  
  setPowerSupply(powerSupply: string): this {
    this.powerSupply = powerSupply;
    return this;
  }
  
  setMotherboard(motherboard: string): this {
    this.motherboard = motherboard;
    return this;
  }
  
  build(): Computer {
    if (!this.cpu || !this.ram || !this.storage) {
      throw new Error('CPU, RAM, and Storage are required');
    }
    
    return new Computer(
      this.cpu,
      this.ram,
      this.storage,
      this.gpu,
      this.powerSupply,
      this.motherboard
    );
  }
  
  reset(): this {
    this.cpu = '';
    this.ram = '';
    this.storage = '';
    this.gpu = '';
    this.powerSupply = '';
    this.motherboard = '';
    return this;
  }
}

// Director class
export class ComputerDirector {
  constructor(private builder: ComputerBuilder) {}
  
  buildGamingComputer(): Computer {
    return this.builder
      .reset()
      .setCPU('Intel i9-11900K')
      .setRAM('32GB DDR4')
      .setStorage('1TB NVMe SSD')
      .setGPU('RTX 3080')
      .setPowerSupply('850W Gold')
      .setMotherboard('ASUS ROG Strix Z590-E')
      .build();
  }
  
  buildOfficeComputer(): Computer {
    return this.builder
      .reset()
      .setCPU('Intel i5-11400')
      .setRAM('16GB DDR4')
      .setStorage('512GB SSD')
      .setMotherboard('MSI B560M Pro')
      .build();
  }
  
  buildServerComputer(): Computer {
    return this.builder
      .reset()
      .setCPU('AMD EPYC 7742')
      .setRAM('128GB DDR4 ECC')
      .setStorage('2TB NVMe SSD')
      .setPowerSupply('1200W Platinum')
      .setMotherboard('Supermicro H12SSL-i')
      .build();
  }
}

// Fluent Builder Pattern
export class FluentComputerBuilder {
  private computer: Partial<Computer> = {};
  
  cpu(cpu: string): this {
    this.computer.cpu = cpu;
    return this;
  }
  
  ram(ram: string): this {
    this.computer.ram = ram;
    return this;
  }
  
  storage(storage: string): this {
    this.computer.storage = storage;
    return this;
  }
  
  gpu(gpu: string): this {
    this.computer.gpu = gpu;
    return this;
  }
  
  powerSupply(powerSupply: string): this {
    this.computer.powerSupply = powerSupply;
    return this;
  }
  
  motherboard(motherboard: string): this {
    this.computer.motherboard = motherboard;
    return this;
  }
  
  build(): Computer {
    const { cpu, ram, storage, gpu, powerSupply, motherboard } = this.computer;
    
    if (!cpu || !ram || !storage) {
      throw new Error('CPU, RAM, and Storage are required');
    }
    
    return new Computer(cpu, ram, storage, gpu, powerSupply, motherboard);
  }
}

// Generic Builder
export abstract class GenericBuilder<T> {
  protected abstract buildImplementation(): T;
  
  public build(): T {
    const result = this.buildImplementation();
    this.reset();
    return result;
  }
  
  protected abstract reset(): void;
}

// Step Builder Pattern with proper typing
export class StepComputerBuilder {
  private cpuValue: string = '';
  private ramValue: string = '';
  private storageValue: string = '';
  private gpuValue?: string;
  private powerSupplyValue?: string;
  private motherboardValue?: string;
  
  static create(): StepComputerBuilder {
    return new StepComputerBuilder();
  }
  
  cpu(cpu: string): StepComputerBuilder {
    this.cpuValue = cpu;
    return this;
  }
  
  ram(ram: string): StepComputerBuilder {
    this.ramValue = ram;
    return this;
  }
  
  storage(storage: string): StepComputerBuilder {
    this.storageValue = storage;
    return this;
  }
  
  gpu(gpu: string): StepComputerBuilder {
    this.gpuValue = gpu;
    return this;
  }
  
  powerSupply(powerSupply: string): StepComputerBuilder {
    this.powerSupplyValue = powerSupply;
    return this;
  }
  
  motherboard(motherboard: string): StepComputerBuilder {
    this.motherboardValue = motherboard;
    return this;
  }
  
  build(): Computer {
    if (!this.cpuValue || !this.ramValue || !this.storageValue) {
      throw new Error('CPU, RAM, and Storage are required');
    }
    
    return new Computer(
      this.cpuValue,
      this.ramValue,
      this.storageValue,
      this.gpuValue,
      this.powerSupplyValue,
      this.motherboardValue
    );
  }
}