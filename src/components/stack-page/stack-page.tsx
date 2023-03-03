import React, { useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { Stack } from "../../utils/stack/stack";
import { TItemsData } from "../../utils/types";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { SectionContainer } from "../ui/container/section-container/section-container";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./stack-page.module.css";

enum Action {
  Push = "push",
  Pop = "pop",
  Clear = "clear",
}

type TSetttings = {
  action: Action;
};

export const StackPage: React.FC = () => {
  const [settings, setSettings] = useState<TSetttings>({
    action: Action.Clear,
  });

  const [inputValue, setInputValue] = useState("");
  const [stack, setStack] = useState(new Stack<string>());
  const [isLoading, setIsLoading] = useState(false);
  const [itemsData, setItemsData] = useState<TItemsData>([]);
  const [update, setUpdate] = useState(false);

  function onChangeHandler(evt: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(evt.target.value.toUpperCase());
  }

  function onClickHandler(action: Action) {
    if (inputValue === "" && action === Action.Push) {
      return;
    } else {
      settings.action = action;
      setIsLoading(true);

      if (action === Action.Clear) {
        itemsData.forEach((_, index) => {
          itemsData[index].state = ElementStates.Changing;
        });
      }

      if (action === Action.Push) {
        itemsData.push({ value: inputValue, state: ElementStates.Changing });
      }

      if (action === Action.Pop) {
        itemsData[itemsData.length - 1].state = ElementStates.Changing;
      }

      setUpdate(!update);

      setTimeout(() => {
        stack[action](inputValue);
        setItemsData(stack.getElements());
        setInputValue("");
        setIsLoading(false);
      }, SHORT_DELAY_IN_MS);
    }
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
            onClick={() => onClickHandler(Action.Push)}
            linkedList="medium"
            text="Добавить"
            isLoader={isLoading && settings.action === Action.Push}
            disabled={isLoading || stack.getSize() >= 11 || inputValue === ""}
            extraClass="ml-6"
          />

          <Button
            onClick={() => onClickHandler(Action.Pop)}
            linkedList="medium"
            text="Удалить"
            isLoader={isLoading && settings.action === Action.Pop}
            disabled={isLoading || stack.getSize() === 0}
            extraClass="ml-6"
          />

          <Button
            onClick={() => onClickHandler(Action.Clear)}
            linkedList="medium"
            text="Очистить"
            isLoader={isLoading && settings.action === Action.Clear}
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
