import { TItemsDataAction } from "../../components/list-page/list-page";
import { ElementStates } from "../../types/element-states";
import { TItemData, TItemsData } from "../types";

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
    const IData: TItemsDataAction[] = [];
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
      const first: TItemData = {
        index: currIndex,
        value: String(curr?.value),
        state: ElementStates.Default,
        botomValue: "",
        action: "check",
      };

      IData.push([
        first,
        { ...first, state: ElementStates.Changing, botomValue: undefined },
      ]);

      prev = curr;
      curr = curr.next;
      currIndex++;
    }

    const next: TItemData = {
      index: currIndex,
      value: String(curr?.value),
      state: ElementStates.Default,
      botomValue: "",
      action: "check",
    };

    IData.push([next, { ...next, state: ElementStates.Default }]);

    const final: TItemData = {
      index: currIndex,
      value: "",
      state: ElementStates.Changing,
      botomValue: String(curr?.value),
      action: "check",
    };

    IData.push([
      final,
      { ...final, action: "delete", state: ElementStates.Default },
    ]);

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
    return IData;
  }

  addByIndex(element: T, index: number) {
    const IData: TItemsDataAction[] = [];

    const node = new LinkedListNode(element);
    if (index === 0) {
      return this.prepend(element);
    } else {
      let curr = this.head;
      let currIndex = 0;

      while (currIndex < index - 1) {
        const first: TItemData = {
          index: currIndex,
          value: String(curr?.value),
          state: ElementStates.Default,
          topValue: String(element),
          action: "check",
        };

        IData.push([
          first,
          { ...first, state: ElementStates.Changing, topValue: undefined },
        ]);
        
        curr = curr && curr.next;
        currIndex++;
      }

      const first: TItemData = {
        index: currIndex,
        value: String(curr?.value),
        state: ElementStates.Default,
        topValue: String(element),
        action: "check",
      };

      IData.push([
        first,
        { ...first, state: ElementStates.Changing, topValue: undefined },
      ]);

      const second: TItemData = {
        index: currIndex + 1,
        value: String(curr?.next?.value),
        state: ElementStates.Default,
        topValue: String(element),
        action: "check",
      };

      IData.push([second, { ...second, topValue: undefined }]);

      const final: TItemData = {
        index: currIndex + 1,
        value: String(element),
        state: ElementStates.Modified,
        action: "add",
      };

      IData.push([
        final,
        { ...final, action: "check", state: ElementStates.Default },
      ]);

      node.next = curr && curr.next;
      if (curr) {
        curr.next = node;
      }
    }

    this.size++;
    return IData;
  }

  deleteHead() {
    const IData: TItemsDataAction[] = [];
    let first: TItemData = {
      index: 0,
      value: "",
      state: ElementStates.Default,
      botomValue: String(this.head?.value),
      action: "check",
    };

    IData.push([first, { ...first, action: "shift" }]);

    this.deleteByIndex("", 0);

    return IData;
  }

  deleteTail() {
    const IData: TItemsDataAction[] = [];
    let first: TItemData = {
      index: this.size - 1,
      value: "",
      state: ElementStates.Default,
      botomValue: String(this.tail?.value),
      action: "check",
    };

    IData.push([first, { ...first, action: "pop" }]);

    this.deleteByIndex("", this.size - 1);

    return IData;
  }

  prepend(element: T): TItemsDataAction[] {
    const IData: TItemsDataAction[] = [];
    const node = new LinkedListNode(element);

    let first: TItemData = {
      index: 0,
      value: String(this.head === null ? "" : this.head.value),
      state: ElementStates.Default,
      topValue: String(element),
      action: "check",
    };

    IData.push([first, { ...first, topValue: undefined }]);

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

    if (this.size === 1) {
      IData.push([
        {
          index: 0,
          value: String(element),
          state: ElementStates.Modified,
          action: "check",
          topValue: undefined,
          botomValue: undefined,
        },
        {
          index: 0,
          value: String(element),
          state: ElementStates.Default,
          action: "check",
        },
      ]);
    } else {
      IData.push([
        {
          index: 0,
          value: String(element),
          state: ElementStates.Modified,
          action: "unshift",
        },
        {
          index: 0,
          value: String(element),
          state: ElementStates.Default,
          action: "check",
        },
      ]);
    }

    return IData;
  }

  append(element: T) {
    const node = new LinkedListNode(element);
    if (this.size === 0) {
      return this.prepend(element);
    }

    const IData: TItemsDataAction[] = [];
    let first: TItemData = {
      index: this.size - 1,
      value: String(this.tail === null ? "" : this.tail.value),
      state: ElementStates.Default,
      topValue: String(element),
      action: "check",
    };

    IData.push([first, { ...first, topValue: undefined }]);

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

    IData.push([
      {
        index: 0,
        value: String(element),
        state: ElementStates.Modified,
        action: "push",
      },
      {
        index: this.size - 1,
        value: String(element),
        state: ElementStates.Default,
        action: "check",
      },
    ]);

    return IData;
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
