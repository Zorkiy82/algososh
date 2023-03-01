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

  if (res.length) {
    for (let i = 0; i < res.length; i++) {
      let isSorting = true;
      let fIndex = 0;
      for (let first = 0; first < res.length - i - 1; first++) {
        const second = first + 1;
        fIndex = second;
        const actionData: TActionData = {
          actionIndex: [first, second],
          action: "check",
        };
        if (sortDirection[direction](res[first], res[second])) {
          swapArrayElement(res, first, second);
          actionData.action = "swap";
          isSorting = false;
        }

        actionDataLog.push(actionData);
      }
      if (isSorting) {
        actionDataLog.push({ actionIndex: [0, fIndex], action: "fix" });
        return { res, actionDataLog };
      } else {
        actionDataLog.push({ actionIndex: [fIndex, fIndex], action: "fix" });
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

      actionDataLog.push({
        actionIndex: [first, first],
        action: "fix",
      });
    }
  }
  actionDataLog.push({
    actionIndex: [res.length - 1, res.length - 1],
    action: "fix",
  });
  return { res, actionDataLog };
}
