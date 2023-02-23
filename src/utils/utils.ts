import { ElementStates } from "../types/element-states";
import { TItemsData } from "./types";

export const getAnimaionData = (arr: Array<string | number>) => {
  const animaionData: TItemsData = arr.map((val) => {
    return { value: val, state: ElementStates.Default };
  });

  return animaionData;
};

export function swapArrayElement(
  arr: Array<any>,
  firstIndex: number,
  secondIndex: number
) {
  const tmp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = tmp;
}
