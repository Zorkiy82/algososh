import React, { useEffect, useState } from "react";
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { defaultLinkedList, LinkedList } from "../../utils/list/list";
import { TItemData, TItemsData } from "../../utils/types";
import { randomArr } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { SectionContainer } from "../ui/container/section-container/section-container";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./list-page.module.css";

enum ListAction {
  Prepend = "prepend",
  Append = "append",
  DeleteHead = "deleteHead",
  DeleteTail = "deleteTail",
  DeleteByIndex = "deleteByIndex",
  AddByIndex = "addByIndex",
}

type TSetttings = {
  action: ListAction | null;
  actionDataLog: TItemsDataAction[];
};

export type TItemsDataAction = [TItemData, TItemData];

export const ListPage: React.FC = () => {
  const maxSize = 8;
  const [settings, setSettings] = useState<TSetttings>({
    action: null,
    actionDataLog: [],
  });
  const [inputValue, setInputValue] = useState("");
  const [counter, setCounter] = useState(-1);
  const [update, setUpdate] = useState(false);
  const [inputIndex, setInputIndex] = useState<number | "">("");
  const [list, setList] = useState(
    new LinkedList<string>(defaultLinkedList.map((val) => val.toUpperCase()))
  );
  const [isLoading, setIsLoading] = useState(false);
  const [itemsData, setItemsData] = useState<TItemsData>([]);

  useEffect(() => {
    const data = list.toArray();
    setItemsData(data);
  }, []);

  useEffect(() => {
    if (counter > -1) {
      const [first, second] = settings.actionDataLog[counter];

      if (first.action === "check") {
        if (second.action === "delete") {
          itemsData.forEach((_, index) => {
            itemsData[index].state = ElementStates.Default;
          });
        }
        if (first.index !== undefined) {
          if (itemsData.length === 0) {
            itemsData.push({ value: "", state: ElementStates.Changing });
          }
          itemsData[first.index].value = first.value;
          itemsData[first.index].state = first.state;
          itemsData[first.index].topValue = first.topValue;
          itemsData[first.index].botomValue = first.botomValue;
        }
      }

      if (first.action === "unshift" || first.action === "push") {
        itemsData[first.action]({
          value: first.value,
          state: first.state,
        });
      }

      if (first.action === "add") {
        itemsData.forEach((_, index) => {
          itemsData[index].state = ElementStates.Default;
        });
        itemsData.splice(Number(first.index), 0, {
          value: first.value,
          state: first.state,
        });
      }

      setUpdate(!update);

      setTimeout(() => {
        if (second.action === "check") {
          if (second.index !== undefined) {
            itemsData[second.index].value = second.value;
            itemsData[second.index].state = second.state;
            itemsData[second.index].topValue = second.topValue;
            itemsData[second.index].botomValue = second.botomValue;
          }
        }

        if (second.action === "shift" || second.action === "pop") {
          itemsData[second.action]();
        }

        if (second.action === "delete") {
          itemsData.splice(Number(second.index), 1);
        }

        if (counter + 1 < settings.actionDataLog.length) {
          setCounter(counter + 1);
        } else {
          setCounter(-1);
          setIsLoading(false);
        }
      }, DELAY_IN_MS);
    }
  }, [counter]);

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
    if (action === ListAction.Prepend || action === ListAction.Append) {
      if (value === "") {
        return;
      }

      setInputValue("");
    }

    if (action === ListAction.DeleteByIndex) {
      if (index === "") {
        return;
      }

      setInputIndex("");
    }

    if (action === ListAction.AddByIndex) {
      if (index === "" || value === "") {
        return;
      }

      setInputIndex("");
      setInputValue("");
    }

    settings.action = action;

    setIsLoading(true);

    const actionDataLog = list[action](value, Number(index));
    settings.actionDataLog = actionDataLog ? actionDataLog : [];

    setCounter(0);
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
            onClick={() => onClickHandler(ListAction.Prepend)}
            linkedList="small"
            text="Добавить в head"
            isLoader={isLoading && settings.action === ListAction.Prepend}
            disabled={
              isLoading || list.getSize() >= maxSize || inputValue === ""
            }
          />

          <Button
            onClick={() => onClickHandler(ListAction.Append)}
            linkedList="small"
            text="Добавить в tail"
            isLoader={isLoading && settings.action === ListAction.Append}
            disabled={
              isLoading || list.getSize() >= maxSize || inputValue === ""
            }
          />

          <Button
            onClick={() => onClickHandler(ListAction.DeleteHead)}
            linkedList="small"
            text="Удалить из head"
            isLoader={isLoading && settings.action === ListAction.DeleteHead}
            disabled={isLoading || list.getSize() === 0}
          />

          <Button
            onClick={() => onClickHandler(ListAction.DeleteTail)}
            linkedList="small"
            text="Удалить из tail"
            isLoader={isLoading && settings.action === ListAction.DeleteTail}
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
            onClick={() => onClickHandler(ListAction.AddByIndex)}
            linkedList="big"
            text="Добавить по индексу"
            isLoader={isLoading && settings.action === ListAction.AddByIndex}
            disabled={
              isLoading ||
              list.getSize() >= maxSize ||
              inputIndex === "" ||
              inputValue === ""
            }
          />

          <Button
            onClick={() => onClickHandler(ListAction.DeleteByIndex)}
            linkedList="big"
            text="Удалить по индексу"
            isLoader={isLoading && settings.action === ListAction.DeleteByIndex}
            disabled={isLoading || list.getSize() === 0 || inputIndex === ""}
          />
        </div>

        <div className={styles.animaionContainer} id="animaionContainer">
          {Boolean(itemsData.length) &&
            itemsData.map((elem, index, arr) => (
              <div key={index} className={styles.elementContainer}>
                <Circle
                  letter={String(elem.value)}
                  index={index}
                  key={index}
                  state={elem.state}
                  tail={
                    elem.botomValue !== undefined ? (
                      <Circle
                        letter={String(elem.botomValue)}
                        isSmall={true}
                        state={ElementStates.Changing}
                      />
                    ) : index === itemsData.length - 1 ? (
                      "tail"
                    ) : (
                      ""
                    )
                  }
                  head={
                    elem.topValue ? (
                      <Circle
                        letter={String(elem.topValue)}
                        isSmall={true}
                        state={ElementStates.Changing}
                      />
                    ) : index === 0 ? (
                      "head"
                    ) : (
                      ""
                    )
                  }
                />

                {index < arr.length - 1 && (
                  <div
                    className={styles.arrowContainer}
                    data-testid="arrowContainer-id"
                  >
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
