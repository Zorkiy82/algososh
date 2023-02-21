import { Direction } from "../../types/direction";

export const sortingAlgorithms: { bubble: Function; selection: Function } = {
  bubble: bubbleSort,
  selection: selectionSort,
};

function bubbleSort(arr: any[], direction: Direction) {
  console.log("сортировка Пузырьком");
  console.log(arr, direction);
}

function selectionSort(arr: any[], direction: Direction) {
  console.log("сортировка Выбором");
  console.log(arr, direction);
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

  console.log(res);

  return res.slice();
}
