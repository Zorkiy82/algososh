import { ElementStates } from "../types/element-states";

export type TActionData = {
  actionIndex: [number, number];
  action: "swap" | "check" | undefined;
};

export type TActionDataLog = TActionData[];

export type TAct =
  | "check"
  | "unshift"
  | "shift"
  | "pop"
  | "push"
  | "add"
  | "delete"
  | undefined;

export type TItemData = {
  index?: number;
  action?: TAct;
  value: string | number | null ;
  state: ElementStates;
  topValue?: string | undefined;
  botomValue?: string | undefined;
};

export type TItemsData = TItemData[];
