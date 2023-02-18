import { ElementStates } from "../types/element-states";

export function swapArrayElement(
  arr: Array<any>,
  firstIndex: number,
  secondIndex: number
) {
  const tmp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = tmp;
}

export function reverseString(str: string) {
  const res = str.split("");
  const workArr = res.map((val) => {
    return { value: val, state: ElementStates.Default };
  });
  const swapLog = [];
  let first = 0;
  let second = res.length - 1;

  while (first <= second) {
    swapLog.push({ first, second });
    swapArrayElement(res, first, second);
    first++;
    second--;
  }

  return { res: res.join(""), workArr, swapLog };
}
