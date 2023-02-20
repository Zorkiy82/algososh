import React from "react";
import { SectionContainer } from "../ui/container/section-container/section-container";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import styles from "./sorting-page.module.css";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";

export const SortingPage: React.FC = () => {
  const data = { algoritm: "selectionSort" };
  function onChangeHandler(evt: React.ChangeEvent<HTMLInputElement>) {
    data.algoritm = evt.target.value;
  }

  function onClickHandler(id:string) {
    console.log(data.algoritm, id);
  }


  return (
    <SolutionLayout title="Сортировка массива">
      <SectionContainer>
        <div className={styles.inputContainer}>
          <RadioInput
            onChange={onChangeHandler}
            label="Выбор"
            name="algoritm"
            value="selectionSort"
            defaultChecked
          />

          <RadioInput
            onChange={onChangeHandler}
            label="Пузырёк"
            name="algoritm"
            value="bubbleSort"
          />

          <Button
            onClick={()=>onClickHandler(Direction.Ascending)}
            linkedList="medium"
            text="По возрастанию"
            sorting={Direction.Ascending}
            id={Direction.Ascending}
          />

          <Button
            onClick={()=>onClickHandler(Direction.Descending)}
            linkedList="medium"
            text="По убыванию"
            sorting={Direction.Descending}
            id={Direction.Descending}
          />
          <Button
            onClick={()=>onClickHandler("newArray")}
            linkedList="medium"
            text="Новый массив"
            id="newArray"
          />
        </div>
      </SectionContainer>
    </SolutionLayout>
  );
};
