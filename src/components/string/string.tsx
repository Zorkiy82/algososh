import React, { useEffect, useState } from "react";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./string.module.css";
import { ElementStates } from "../../types/element-states";
import { reverseString } from "../../utils/string/string-reverse";
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from "../../constants/delays";
import { SectionContainer } from "../ui/container/section-container/section-container";
import { TItemsData, TActionDataLog } from "../../utils/types";
import { getAnimaionData, swapArrayElement } from "../../utils/utils";

export const StringComponent: React.FC = () => {
  const [update, setUpdate] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [itemsData, setItemsData] = useState<TItemsData>([]);
  const [actionDataLog, setActionDataLog] = useState<TActionDataLog>([]);
  const [counter, setCounter] = useState(-1);

  useEffect(() => {
    if (counter > -1) {
      const actionIndex = actionDataLog[counter].actionIndex;
      const [firstIndex, secondIndex] = actionIndex;

      actionIndex.forEach((position) => {
        itemsData[position].state = ElementStates.Changing;
      });

      setUpdate(!update);

      setTimeout(() => {
        actionIndex.forEach((position) => {
          itemsData[position].state = ElementStates.Modified;
        });

        swapArrayElement(itemsData, firstIndex, secondIndex);

        if (counter + 1 < actionDataLog.length) {
          setCounter(counter + 1);
        } else {
          setCounter(-1);
          toogleIsLoading();
        }
      }, DELAY_IN_MS);
    }
  }, [counter]);

  function onChangeHandler(evt: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(evt.target.value.toUpperCase());
    if (itemsData.length) {
      setItemsData([]);
    }
  }

  function onClickHandler() {
    if (inputValue) {
      const itemsData = getAnimaionData(inputValue.split(""));
      const { res, actionDataLog } = reverseString(inputValue);

      setActionDataLog(actionDataLog);
      setItemsData(itemsData);
      toogleIsLoading();

      setTimeout(() => {
        setCounter(0);
      }, SHORT_DELAY_IN_MS);
    }
  }

  function toogleIsLoading() {
    setIsLoading(!isLoading);
  }

  return (
    <SolutionLayout title="Строка">
      <SectionContainer>
        <div className={styles.inputContainer}>
          <Input
            onChange={onChangeHandler}
            value={inputValue}
            maxLength={11}
            isLimitText={true}
            disabled={isLoading}
          />

          <Button
            isLoader={isLoading}
            onClick={onClickHandler}
            text="Развернуть"
            linkedList="small"
          />
        </div>

        <div className={styles.animaionContainer}>
          {inputValue &&
            !itemsData.length &&
            inputValue
              .split("")
              .map((ltr, index) => <Circle letter={ltr} key={index} />)}

          {Boolean(itemsData.length) &&
            itemsData.map((elem, index) => (
              <Circle
                letter={String(elem.value)}
                key={index}
                state={elem.state}
              />
            ))}
        </div>
      </SectionContainer>
    </SolutionLayout>
  );
};
