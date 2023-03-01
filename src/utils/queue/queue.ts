import { ElementStates } from "../../types/element-states";

interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peak: () => T | null;
}

export class Queue<T> implements IQueue<T> {
  private container: (T | null)[] = [];
  private head = 0;
  private tail = 0;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size).fill(null);
  }

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    }

    this.container[this.tail] = item;
    this.tail = (this.tail + 1) % this.size;
    this.length += 1;
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }

    this.container[this.head] = null;
    this.head = (this.head + 1) % this.size;
    this.length -= 1;
    if (this.length === 0) {
      this.head = 0;
      this.tail = 0;
    }
  };

  peak = (): T | null => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    return this.container[this.head % this.size];
  };

  isEmpty = () => this.length === 0;

  isFull = () => this.length === this.size;

  getHead = () => this.head;

  getTail = () => this.tail;

  getLength = () => this.length;

  getElements = () =>
    this.container.map((val) => {
      return { value: val, state: ElementStates.Default };
    });

  clear = (): void => {
    this.container.fill(null);
    this.head = 0;
    this.tail = 0;
    this.length = 0;
  };
}
