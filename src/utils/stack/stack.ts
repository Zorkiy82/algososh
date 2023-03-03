import { ElementStates } from "../../types/element-states";

interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  peak: () => T | null;
  getSize: () => number;
}

export class Stack<T> implements IStack<T> {
  private container: T[] = [];

  push = (item: T): void => {
    this.container.push(item);
  };

  pop = (): void => {
    this.container.pop();
  };

  peak = (): T | null => {
    const size = this.getSize();
    return size ? this.container[size - 1] : null;
  };

  getSize = () => this.container.length;

  getElements = () =>
    this.container.map((val) => {
      return { value: val, state: ElementStates.Default };
    });

  clear = (): void => {
    this.container = [];
  };
}
