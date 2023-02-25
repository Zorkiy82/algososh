import React, { useState } from "react";
import { Stack } from "../../utils/stack/stack";
import { TItemsData } from "../../utils/types";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { SectionContainer } from "../ui/container/section-container/section-container";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./stack-page.module.css";

export const StackPage: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [stack, setStack] = useState(new Stack<string>());
  const [isLoading, setIsLoading] = useState(false);
  const [itemsData, setItemsData] = useState<TItemsData>([]);

  function onChangeHandler(evt: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(evt.target.value.toUpperCase());
  }

  function onClickHandler(action: "push" | "pop" | "clear") {
    stack[action](inputValue);
    setItemsData(stack.getElements());
  }
  return (
    <SolutionLayout title="Стек">
      <SectionContainer>
        <div className={styles.inputContainer}>
          <Input
            onChange={onChangeHandler}
            value={inputValue}
            maxLength={4}
            isLimitText={true}
            disabled={isLoading}
          />

          <Button
            onClick={() => onClickHandler("push")}
            linkedList="medium"
            text="Добавить"
            disabled={isLoading || stack.getSize() >= 11}
            extraClass="ml-6"
          />

          <Button
            onClick={() => onClickHandler("pop")}
            linkedList="medium"
            text="Удалить"
            disabled={isLoading || stack.getSize() === 0}
            extraClass="ml-6"
          />

          <Button
            onClick={() => onClickHandler("clear")}
            linkedList="medium"
            text="Очистить"
            disabled={isLoading || stack.getSize() === 0}
            extraClass="ml-40"
          />
        </div>
        <div className={styles.animaionContainer}>
          {Boolean(itemsData.length) &&
            itemsData.map((elem, index) => (
              <Circle
                letter={String(elem.value)}
                index={index}
                key={index}
                state={elem.state}
                head={index === itemsData.length - 1 ? "top" : ""}
              />
            ))}
        </div>
      </SectionContainer>
    </SolutionLayout>
  );
};
