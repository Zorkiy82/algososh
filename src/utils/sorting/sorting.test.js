import { Direction } from "../../types/direction";
import { randomArr } from "../utils";
import { bubbleSort, selectionSort } from "./sorting";

describe("Тесты функций сортировки", () => {
  describe("сортировка Пузырьком", () => {
    it("#1 пустой массив", () => {
      expect(bubbleSort([], Direction.Ascending).res).toEqual([]);
      expect(bubbleSort([], Direction.Descending).res).toEqual([]);
    });

    it("#2 массив из одного элемента", () => {
      expect(bubbleSort([1], Direction.Ascending).res).toEqual([1]);
      expect(bubbleSort([1], Direction.Descending).res).toEqual([1]);
    });

    it("#3 массив из нескольких элементов", () => {
      expect(bubbleSort([2, 3, 1], Direction.Ascending).res).toEqual([1, 2, 3]);
      expect(bubbleSort([2, 3, 1], Direction.Descending).res).toEqual([
        3, 2, 1,
      ]);
    });
  });

  describe("сортировка Выбором", () => {
    it("#1 пустой массив", () => {
      expect(selectionSort([], Direction.Ascending).res).toEqual([]);
      expect(selectionSort([], Direction.Descending).res).toEqual([]);
    });

    it("#2 массив из одного элемента", () => {
      expect(selectionSort([1], Direction.Ascending).res).toEqual([1]);
      expect(selectionSort([1], Direction.Descending).res).toEqual([1]);
    });

    it("#3 массив из нескольких элементов", () => {
      expect(selectionSort([2, 3, 1], Direction.Ascending).res).toEqual([
        1, 2, 3,
      ]);
      expect(selectionSort([2, 3, 1], Direction.Descending).res).toEqual([
        3, 2, 1,
      ]);
    });
  });
});
