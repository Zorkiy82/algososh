import { TActionDataLog } from "../types";
import { getAnimaionData, swapArrayElement } from "../utils";

export function reverseString(str: string) {
  const res = str.split("");
  const actionDataLog: TActionDataLog = [];
  let first = 0;
  let second = res.length - 1;

  while (first <= second) {
    actionDataLog.push({ actionIndex: [first, second], action: undefined });
    swapArrayElement(res, first, second);
    first++;
    second--;
  }

  return { res: res.join(""), actionDataLog };
}
