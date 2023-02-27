import { ElementStates } from "../../types/element-states";
import { TItemsData } from "../types";

export class LinkedListNode<T> {
  value: T;
  next: LinkedListNode<T> | null;
  constructor(value: T, next?: LinkedListNode<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

interface ILinkedList<T> {
  append: (element: T) => void;
  addByIndex: (element: T, position: number) => void;
  getSize: () => number;
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: LinkedListNode<T> | null;
  private tail: LinkedListNode<T> | null;
  private size: number;
  constructor(array: T[] | undefined = []) {
    this.head = null;
    this.tail = null;
    this.size = 0;
    if (array) {
      array.forEach((val) => {
        this.append(val);
      });
    }
  }

  deleteByIndex(_: any, index: number | "") {
    if (index < 0 || index > this.size - 1) {
      console.log("Enter a valid index");
      return;
    }
    let dummyHead = { ...this.head };
    dummyHead.next = this.head;
    let curr = dummyHead.next;
    let currIndex = 0;
    let prev = dummyHead;

    while (currIndex !== index && curr) {
      prev = curr;
      curr = curr.next;
      currIndex++;
    }

    if (curr) {
      prev.next = curr.next;
      this.head = dummyHead.next;
      this.size--;

      curr = this.head;
      while (curr && curr.next) {
        curr = curr.next;
      }

      this.tail = curr;
    }
  }

  addByIndex(element: T, index: number) {
    if (index < 0 || index > this.size - 1) {
      console.log("Enter a valid index");
      return;
    } else {
      const node = new LinkedListNode(element);
      if (index === 0) {
        node.next = this.head;
        this.head = node;
      } else {
        let curr = this.head;
        let currIndex = 0;

        while (currIndex < index - 1) {
          curr = curr && curr.next;
          currIndex++;
        }

        node.next = curr && curr.next;
        if (curr) {
          curr.next = node;
        }
      }

      this.size++;
    }
  }

  deleteHead() {
    this.deleteByIndex("", 0);
  }

  deleteTail() {
    this.deleteByIndex("", this.size - 1);
  }

  prepend(element: T) {
    const node = new LinkedListNode(element);

    if (this.head === null || this.tail === null) {
      this.head = node;
      this.tail = node;
    } else {
      if (this.head) {
        node.next = this.head;
      }
      this.head = node;
    }
    this.size++;
  }

  append(element: T) {
    const node = new LinkedListNode(element);

    if (this.head === null || this.tail === null) {
      this.head = node;
      this.tail = node;
    } else {
      if (this.tail) {
        this.tail.next = node;
      }
      this.tail = node;
    }
    this.size++;
  }

  getSize() {
    return this.size;
  }

  toArray() {
    let curr = this.head;
    const res: TItemsData = [];
    while (curr) {
      res.push({ value: String(curr.value), state: ElementStates.Default });
      curr = curr.next;
    }

    return res.slice();
  }
}
