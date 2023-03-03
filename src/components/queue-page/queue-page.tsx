import React, { useEffect, useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { Queue } from "../../utils/queue/queue";
import { TItemsData } from "../../utils/types";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { SectionContainer } from "../ui/container/section-container/section-container";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./queue-page.module.css";

enum Action {
  Dequeue = "dequeue",
  Enqueue = "enqueue",
  Clear = "clear",
}

type TSetttings = {
  action: Action;
};

export const QueuePage: React.FC = () => {
  const [settings, setSettings] = useState<TSetttings>({
    action: Action.Clear,
  });
  const [inputValue, setInputValue] = useState("");
  const [queue, setqueue] = useState(new Queue<string>(7));
  const [isLoading, setIsLoading] = useState(false);
  const [itemsData, setItemsData] = useState<TItemsData>([]);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    setItemsData(queue.getElements());
  }, []);

  function onChangeHandler(evt: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(evt.target.value.toUpperCase());
  }

  function onClickHandler(action: Action) {
    if (inputValue === "" && action === Action.Enqueue) {
      return;
    } else {
      settings.action = action;
      setIsLoading(true);

      if (action === Action.Clear) {
        itemsData.forEach((_, index) => {
          itemsData[index].state = ElementStates.Changing;
        });
      }

      if (action === Action.Enqueue) {
        itemsData[queue.getTail()].state = ElementStates.Changing;
      }

      if (action === Action.Dequeue) {
        itemsData[queue.getHead()].state = ElementStates.Changing;
      }

      setUpdate(!update);

      setTimeout(() => {
        queue[action](inputValue);
        setItemsData(queue.getElements());
        setInputValue("");
        setIsLoading(false);
      }, SHORT_DELAY_IN_MS);
    }
  }

  return (
    <SolutionLayout title="Очередь">
      <SectionContainer>
        <div className={styles.inputContainer}>
          <Input
            onChange={onChangeHandler}
            placeholder="Введите значение"
            value={inputValue}
            maxLength={4}
            isLimitText={true}
            disabled={isLoading}
          />

          <Button
            onClick={() => onClickHandler(Action.Enqueue)}
            linkedList="medium"
            text="Добавить"
            isLoader={isLoading && settings.action === Action.Enqueue}
            disabled={isLoading || queue.isFull() || inputValue === ""}
            extraClass="ml-6"
          />

          <Button
            onClick={() => onClickHandler(Action.Dequeue)}
            linkedList="medium"
            text="Удалить"
            isLoader={isLoading && settings.action === Action.Dequeue}
            disabled={isLoading || queue.isEmpty()}
            extraClass="ml-6"
          />

          <Button
            onClick={() => onClickHandler(Action.Clear)}
            linkedList="medium"
            text="Очистить"
            isLoader={isLoading && settings.action === Action.Clear}
            disabled={isLoading || queue.isEmpty()}
            extraClass="ml-40"
          />
        </div>

        <div className={styles.animaionContainer}>
          {Boolean(itemsData.length) &&
            itemsData.map((elem, index) => (
              <Circle
                letter={elem.value ? String(elem.value) : ""}
                index={index}
                key={index}
                state={elem.state}
                head={
                  queue.getHead() === index && queue.getLength() ? "head" : ""
                }
                tail={
                  queue.getTail() === index && queue.getLength() ? "tail" : ""
                }
              />
            ))}
        </div>
      </SectionContainer>
    </SolutionLayout>
  );
};
