import { Direction } from "../../types/direction";
import { TActionData, TActionDataLog } from "../types";
import { swapArrayElement } from "../utils";

export const sortingAlgorithms: { bubble: Function; selection: Function } = {
  bubble: bubbleSort,
  selection: selectionSort,
};

const sortDirection = {
  [`${Direction.Ascending}`]: (a: number, b: number) => {
    return a > b;
  },

  [`${Direction.Descending}`]: (a: number, b: number) => {
    return a < b;
  },
};

function bubbleSort(arr: any[], direction: Direction) {
  const res = arr.slice();
  const actionDataLog: TActionDataLog = [];
  let isSorting = false;

  if (res.length) {
    while (!isSorting) {
      isSorting = true;
      for (let first = 0; first < res.length - 1; first++) {
        const second = first + 1;
        const actionData: TActionData = {
          actionIndex: [first, second],
          action: "check",
        };
        if (sortDirection[direction](res[first], res[second])) {
          swapArrayElement(res, first, second);
          actionData.action = "swap";

          if (isSorting) {
            isSorting = false;
          }
        }

        actionDataLog.push(actionData);
      }
    }
  }
  return { res, actionDataLog };
}

function selectionSort(arr: any[], direction: Direction) {
  const res = arr.slice();
  const actionDataLog: TActionDataLog = [];
  const length = res.length;
  if (length) {
    for (let first = 0; first < length - 1; first++) {
      let targetIndex = first;
      let targetValue = res[first];
      for (let i = first + 1; i < length; i++) {
        actionDataLog.push({
          actionIndex: [first, i],
          action: "check",
        });
        if (sortDirection[direction](targetValue, res[i])) {
          targetIndex = i;
          targetValue = res[i];
        }
      }
      actionDataLog.push({
        actionIndex: [first, targetIndex],
        action: "swap",
      });
      swapArrayElement(res, first, targetIndex);
    }
  }
  console.log(actionDataLog)
  return { res, actionDataLog };
}

export function getNewArray(
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
