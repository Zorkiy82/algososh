import React, { FormEvent, useEffect, useState } from "react";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./string.module.css";
import { ElementStates } from "../../types/element-states";
import { reverseString, swapArrayElement } from "../../utils/string-reverse";
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from "../../constants/delays";

type TWorkArr<T> = {
  value: T;
  state: ElementStates;
}[];

type TSwapLog = { first: number; second: number }[];

export const StringComponent: React.FC = () => {
  const [update, setUpdate] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [workArr, setWorkArr] = useState<TWorkArr<string>>([]);
  const [swapLog, setSwapLog] = useState<TSwapLog>([]);
  const [counter, setCounter] = useState(-1);

  useEffect(() => {
    if (counter > -1) {
      const { first, second } = swapLog[counter];
      [first, second].forEach((position) => {
        workArr[position].state = ElementStates.Changing;
      });
      setUpdate(!update);
      setTimeout(() => {
        [first, second].forEach((position) => {
          workArr[position].state = ElementStates.Modified;
        });
        swapArrayElement(workArr, first, second);
        if (counter + 1 < swapLog.length) {
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
    if (workArr.length) {
      setWorkArr([]);
    }
  }
  function onClickHandler() {
    if (inputValue) {
      const { workArr, swapLog } = reverseString(inputValue);
      setSwapLog(swapLog);
      setWorkArr(workArr);
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
      <div className={styles.section}>
        <div className={styles.container}>
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
            style={{ width: "178px" }}
          />
        </div>

        <div className={styles.animaionContainer}>
          {inputValue &&
            !workArr.length &&
            inputValue
              .split("")
              .map((ltr, index) => <Circle letter={ltr} key={index} />)}

          {Boolean(workArr.length) &&
            workArr.map((elem, index) => (
              <Circle letter={elem.value} key={index} state={elem.state} />
            ))}
        </div>
      </div>
    </SolutionLayout>
  );
};
