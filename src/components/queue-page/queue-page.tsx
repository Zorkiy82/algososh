import React, { useEffect, useState } from "react";
import { Queue } from "../../utils/queue/queue";
import { TItemsData } from "../../utils/types";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { SectionContainer } from "../ui/container/section-container/section-container";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./queue-page.module.css";

export const QueuePage: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [queue, setqueue] = useState(new Queue<string>(7));
  const [isLoading, setIsLoading] = useState(false);
  const [itemsData, setItemsData] = useState<TItemsData>([]);

  useEffect(() => {
    setItemsData(queue.getElements());
  }, []);

  function onChangeHandler(evt: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(evt.target.value.toUpperCase());
  }

  function onClickHandler(action: "dequeue" | "enqueue" | "clear") {
    queue[action](inputValue);
    setItemsData(queue.getElements());
  }

  return (
    <SolutionLayout title="Очередь">
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
            onClick={() => onClickHandler("enqueue")}
            linkedList="medium"
            text="Добавить"
            disabled={isLoading || queue.isFull()}
            extraClass="ml-6"
          />

          <Button
            onClick={() => onClickHandler("dequeue")}
            linkedList="medium"
            text="Удалить"
            disabled={isLoading || queue.isEmpty()}
            extraClass="ml-6"
          />

          <Button
            onClick={() => onClickHandler("clear")}
            linkedList="medium"
            text="Очистить"
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
                head={queue.getHead() === index ? "head" : ""}
                tail={queue.getTail() === index ? "tail" : ""}
              />
            ))}
        </div>
      </SectionContainer>
    </SolutionLayout>
  );
};
