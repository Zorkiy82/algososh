import React, { useEffect, useState } from "react";
import { SectionContainer } from "../ui/container/section-container/section-container";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import styles from "./sorting-page.module.css";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { getNewArray, sortingAlgorithms } from "../../utils/sorting/sorting";
import { Column } from "../ui/column/column";
import { TItemsData, TActionDataLog } from "../../utils/types";
import { getAnimaionData, swapArrayElement } from "../../utils/utils";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from "../../constants/delays";

type TAlgorithm = "selection" | "bubble";

type TSettings = {
  algorithm: TAlgorithm;
  mainArr: number[];
  sortingArr: number[];
  actionDataLog: TActionDataLog;
  direction: Direction | undefined;
};

const defaultSettings: TSettings = {
  algorithm: "selection",
  mainArr: [],
  sortingArr: [],
  actionDataLog: [],
  direction: undefined,
};

export const SortingPage: React.FC = () => {
  const [settings, setSettings] = useState(defaultSettings);
  const [itemsData, setItemsData] = useState<TItemsData>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [counter, setCounter] = useState(-1);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    newArrayHandler();
  }, []);

  useEffect(() => {
    if (counter > -1) {
      const { actionIndex, action } = settings.actionDataLog[counter];
      const [firstIndex, secondIndex] = actionIndex;
      const effectivLength =
        settings.actionDataLog.length - settings.mainArr.length;

      actionIndex.forEach((position) => {
        itemsData[position].state = ElementStates.Changing;
      });

      setUpdate(!update);

      setTimeout(
        () => {
          if (settings.algorithm === "bubble") {
            if (counter <= effectivLength) {
              if (action === "check") {
                itemsData[firstIndex].state = ElementStates.Default;
                if (secondIndex === settings.sortingArr.length - 1) {
                  itemsData[secondIndex].state = ElementStates.Default;
                }
              } else {
                itemsData[secondIndex].state = ElementStates.Default;
                if (secondIndex === settings.sortingArr.length - 1) {
                  itemsData[firstIndex].state = ElementStates.Default;
                }
              }
            } else {
              actionIndex.forEach((position) => {
                itemsData[position].state = ElementStates.Modified;
              });
            }
          }

          if (settings.algorithm === "selection") {
            if (action === "check") {
              itemsData[secondIndex].state = ElementStates.Default;
            } else {
              itemsData[firstIndex].state = ElementStates.Default;
              itemsData[secondIndex].state = ElementStates.Modified;
            }

            if (counter === settings.actionDataLog.length - 1) {
              itemsData[itemsData.length - 1].state = ElementStates.Modified;
              itemsData[itemsData.length - 2].state = ElementStates.Modified;
            }
          }

          if (action === "swap") {
            swapArrayElement(itemsData, firstIndex, secondIndex);
          }

          if (counter + 1 < settings.actionDataLog.length) {
            setCounter(counter + 1);
          } else {
            setCounter(-1);
            setIsLoading(false);
          }
        },
        action === "swap" ? SHORT_DELAY_IN_MS : SHORT_DELAY_IN_MS / 2
      );
    }
  }, [counter]);

  function onChangeHandler(evt: React.ChangeEvent<HTMLInputElement>) {
    const value = evt.target.value;
    if (value === "selection" || value === "bubble") {
      settings.algorithm = value;
    }
  }

  function onClickHandler(direction: Direction) {
    settings.direction = direction;
    const { res, actionDataLog } = sortingAlgorithms[settings.algorithm](
      settings.mainArr,
      direction
    );
    settings.sortingArr = res;
    settings.actionDataLog = actionDataLog;
    setItemsData(getAnimaionData(settings.mainArr));

    setIsLoading(true);
    setTimeout(() => {
      setCounter(0);
    }, SHORT_DELAY_IN_MS);
  }

  function newArrayHandler() {
    settings.mainArr = getNewArray();
    setItemsData(getAnimaionData(settings.mainArr));
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
            disabled={isLoading}
          />

          <RadioInput
            onChange={onChangeHandler}
            label="Пузырёк"
            name="algorithm"
            value="bubble"
            disabled={isLoading}
            extraClass="ml-20"
          />

          <Button
            onClick={() => onClickHandler(Direction.Ascending)}
            linkedList="medium"
            text="По возрастанию"
            sorting={Direction.Ascending}
            isLoader={isLoading && settings.direction === Direction.Ascending}
            disabled={isLoading}
            extraClass="ml-26"
          />

          <Button
            onClick={() => onClickHandler(Direction.Descending)}
            linkedList="medium"
            text="По убыванию"
            sorting={Direction.Descending}
            isLoader={isLoading && settings.direction === Direction.Descending}
            disabled={isLoading}
            extraClass="ml-6"
          />

          <Button
            onClick={newArrayHandler}
            linkedList="medium"
            text="Новый массив"
            disabled={isLoading}
            extraClass="ml-40"
          />
        </div>

        <div className={styles.animaionContainer}>
          {Boolean(itemsData.length) &&
            itemsData.map((val, index) => (
              <Column index={Number(val.value)} state={val.state} key={index} />
            ))}
        </div>
      </SectionContainer>
    </SolutionLayout>
  );
};
