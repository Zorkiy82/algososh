import { ElementStates } from "../../types/element-states";
import { TItemsData } from "../types";

export class Node<T> {
  value: T;
  next: Node<T> | null;
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

interface ILinkedList<T> {
  append: (element: T) => void;
  insertAt: (element: T, position: number) => void;
  getSize: () => number;
  print: () => void;
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private size: number;
  constructor() {
    this.head = null;
    this.size = 0;
  }

  insertAt(element: T, index: number) {
    if (index < 0 || index > this.size) {
      console.log("Enter a valid index");
      return;
    } else {
      const node = new Node(element);
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

  append(element: T) {
    const node = new Node(element);
    let current;

    if (this.head === null) {
      this.head = node;
    } else {
      current = this.head;
      while (current.next) {
        current = current.next;
      }

      current.next = node;
    }
    this.size++;
  }

  getSize() {
    return this.size;
  }

  print() {
    let curr = this.head;
    let res = "";
    while (curr) {
      res += `${curr.value} `;
      curr = curr.next;
    }
    console.log(res);
  }

  getItemsData() {
    let curr = this.head;
    const res: TItemsData = [];
    while (curr) {
      res.push({ value: String(curr.value), state: ElementStates.Default });
      curr = curr.next;
    }

    return res.slice();
  }
}

const removeElements = (
  head: Node<number> | null,
  val: number
): Node<number> | null => {
  let dummyHead = new Node(0); // добавим в начало пустой узел
  dummyHead.next = head;
  let curr = dummyHead.next;
  let prev = dummyHead;

  while (curr) {
    if (curr.value === val) {
      prev.next = curr.next;
    } else {
      prev = curr;
    }
    curr = curr.next;
  }

  return dummyHead.next; // возвращаем список без пустого узла
};
