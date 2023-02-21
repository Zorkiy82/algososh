import React, { useEffect, useState } from "react";
import { SectionContainer } from "../ui/container/section-container/section-container";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import styles from "./sorting-page.module.css";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { getNewArray, sortingAlgorithms } from "../../utils/sorting/sorting";
import { Column } from "../ui/column/column";

type TAlgorithm = "selection" | "bubble";

export const SortingPage: React.FC = () => {
  const settings: { algorithm: TAlgorithm } = { algorithm: "selection" };

  const [arr, setArr] = useState<Array<number>>([]);

  useEffect(() => {
    newArrayHandler();
  }, []);

  function onChangeHandler(evt: React.ChangeEvent<HTMLInputElement>) {
    const value = evt.target.value;
    if (value === "selection" || value === "bubble") {
      settings.algorithm = value;
    }
  }

  function onClickHandler(direction: Direction) {
    sortingAlgorithms[settings.algorithm]([2, 3], direction);
  }

  function newArrayHandler() {
    const newArr = getNewArray();
    setArr(newArr);
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <SectionContainer>
        <div className={styles.inputContainer}>
          <RadioInput
            onChange={onChangeHandler}
            label="Выбор"
            name="algorithm"
            value="selection"
            defaultChecked
          />

          <RadioInput
            onChange={onChangeHandler}
            label="Пузырёк"
            name="algorithm"
            value="bubble"
          />

          <Button
            onClick={() => onClickHandler(Direction.Ascending)}
            linkedList="medium"
            text="По возрастанию"
            sorting={Direction.Ascending}
          />

          <Button
            onClick={() => onClickHandler(Direction.Descending)}
            linkedList="medium"
            text="По убыванию"
            sorting={Direction.Descending}
          />
          <Button
            onClick={newArrayHandler}
            linkedList="medium"
            text="Новый массив"
          />
        </div>

        <div className={styles.animaionContainer}>
          {Boolean(arr.length) &&
            arr.map((val, index) => (
                <Column index={val} key={index} />
              ))}
        </div>
      </SectionContainer>
    </SolutionLayout>
  );
};
