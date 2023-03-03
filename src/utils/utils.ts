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

export function randomArr(
  minValue = 0,
  maxValue = 100,
  minLength = 3,
  maxLength = 17
) {
  const length = Math.round(
    Math.random() * (maxLength - minLength) + minLength
  );
  const res: Array<number> = [];

  for (let i = 0; i < length; i++) {
    const val = Math.round(Math.random() * (maxValue - minValue) + minValue);
    res.push(val);
  }

  return res.slice();
}
