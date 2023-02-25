import { ElementStates } from "../types/element-states";

export type TActionData = {
  actionIndex: [number, number];
  action: "swap" | "check" | undefined;
};

export type TActionDataLog = TActionData[];

export type TItemsData = Array<{
  value: string | number | null;
  state: ElementStates;
}>;
