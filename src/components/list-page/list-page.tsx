import React, { useEffect, useState } from "react";
import { LinkedList } from "../../utils/list/list";
import { TItemsData } from "../../utils/types";
import { randomArr } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { SectionContainer } from "../ui/container/section-container/section-container";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./list-page.module.css";

enum ListAction {
  Appstart = "appstart",
  Append = "append",
  RemoveAtHead = "removeAtHead",
  RemoveAtTail = "removeAtTail",
  RemoveAtIndex = "removeAtIndex",
  InsertAtIndex = "insertAtIndex",
}

type TSetttings = {
  action: ListAction | null;
};

export const ListPage: React.FC = () => {
  const maxSize = 8;
  const [settings, setSettings] = useState<TSetttings>({ action: null });
  const [inputValue, setInputValue] = useState("");
  const [inputIndex, setInputIndex] = useState<number | "">("");
  const [list, setList] = useState(new LinkedList<string>());
  const [isLoading, setIsLoading] = useState(false);
  const [itemsData, setItemsData] = useState<TItemsData>([]);

  useEffect(() => {
    const newArr = randomArr(0, 9999, 2, 6);
    newArr.forEach((val) => {
      list.append(String(val));
    });
    const data = list.getItemsData();
    setItemsData(data);
  }, []);

  function onChangeValue(evt: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(evt.target.value.toUpperCase());
  }

  function onChangeIndex(evt: React.ChangeEvent<HTMLInputElement>) {
    let index: number | "" =
      evt.target.value === "" ? "" : Number(evt.target.value);

    index =
      index < 0
        ? ""
        : index >= list.getSize()
        ? list.getSize()
          ? list.getSize() - 1
          : 0
        : index;

    setInputIndex(index);
  }

  function onClickHandler(action: ListAction) {
    const value = inputValue;
    const index = inputIndex;
    if (action === ListAction.Appstart || action === ListAction.Append) {
      if (value === "") {
        return;
      }

      setInputValue("");
    }

    if (action === ListAction.RemoveAtIndex) {
      if (index === "") {
        return;
      }

      setInputIndex("");
    }

    if (action === ListAction.InsertAtIndex) {
      if (index === "" || value === "") {
        return;
      }

      setInputIndex("");
      setInputValue("");
    }

    settings.action = action;
    // setIsLoading(true);

    list[action](value, Number(index));
    const data = list.getItemsData();
    setItemsData(data);
  }

  return (
    <SolutionLayout title="Связный список">
      <SectionContainer>
        <div className={styles.inputContainer}>
          <Input
            onChange={onChangeValue}
            placeholder="Введите значение"
            value={inputValue}
            maxLength={4}
            isLimitText={true}
            disabled={isLoading}
            extraClass={styles.input}
          />

          <Button
            onClick={() => onClickHandler(ListAction.Appstart)}
            linkedList="small"
            text="Добавить в head"
            isLoader={isLoading && settings.action === ListAction.Appstart}
            disabled={isLoading || list.getSize() >= maxSize}
          />

          <Button
            onClick={() => onClickHandler(ListAction.Append)}
            linkedList="small"
            text="Добавить в tail"
            isLoader={isLoading && settings.action === ListAction.Append}
            disabled={isLoading || list.getSize() >= maxSize}
          />

          <Button
            onClick={() => onClickHandler(ListAction.RemoveAtHead)}
            linkedList="small"
            text="Удалить из head"
            isLoader={isLoading && settings.action === ListAction.RemoveAtHead}
            disabled={isLoading || list.getSize() === 0}
          />

          <Button
            onClick={() => onClickHandler(ListAction.RemoveAtTail)}
            linkedList="small"
            text="Удалить из tail"
            isLoader={isLoading && settings.action === ListAction.RemoveAtTail}
            disabled={isLoading || list.getSize() === 0}
          />
        </div>

        <div className={styles.inputContainer}>
          <Input
            onChange={onChangeIndex}
            placeholder="Введите индекс"
            value={inputIndex}
            type="number"
            max={list.getSize() ? list.getSize() - 1 : 0}
            min={0}
            isLimitText={true}
            disabled={isLoading}
            extraClass={styles.input}
          />

          <Button
            onClick={() => onClickHandler(ListAction.InsertAtIndex)}
            linkedList="big"
            text="Добавить по индексу"
            isLoader={isLoading && settings.action === ListAction.InsertAtIndex}
            disabled={isLoading || list.getSize() >= maxSize}
          />

          <Button
            onClick={() => onClickHandler(ListAction.RemoveAtIndex)}
            linkedList="big"
            text="Удалить по индексу"
            isLoader={isLoading && settings.action === ListAction.RemoveAtIndex}
            disabled={isLoading || list.getSize() === 0}
          />
        </div>

        <div className={styles.animaionContainer}>
          {Boolean(itemsData.length) &&
            itemsData.map((elem, index, arr) => (
              <div key={index} className={styles.elementContainer}>
                <Circle
                  letter={String(elem.value)}
                  index={index}
                  key={index}
                  state={elem.state}
                  tail={index === itemsData.length - 1 ? "tail" : ""}
                  head={index === 0 ? "head" : ""}
                />

                {index < arr.length - 1 && (
                  <div className={styles.arrowContainer}>
                    <ArrowIcon />
                  </div>
                )}
              </div>
            ))}
        </div>
      </SectionContainer>
    </SolutionLayout>
  );
};
