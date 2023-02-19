import React, { useEffect, useState } from "react";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./string.module.css";
import { ElementStates } from "../../types/element-states";
import { reverseString, swapArrayElement } from "../../utils/string/string-reverse";
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from "../../constants/delays";
import { SectionContainer } from "../ui/container/section-container/section-container";
import { TSwapLog } from "../../utils/types";

type TAnimationData<T> = {
  value: T;
  state: ElementStates;
}[];

export const StringComponent: React.FC = () => {
  const [update, setUpdate] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [animationData, setAnimationData] = useState<TAnimationData<string>>(
    []
  );
  const [swapLog, setSwapLog] = useState<TSwapLog>([]);
  const [counter, setCounter] = useState(-1);

  useEffect(() => {
    if (counter > -1) {
      const swapData = swapLog[counter];
      const [firstIndex, secondIndex] = swapData;

      swapData.forEach((position) => {
        animationData[position].state = ElementStates.Changing;
      });

      setUpdate(!update);

      setTimeout(() => {
        swapData.forEach((position) => {
          animationData[position].state = ElementStates.Modified;
        });

        swapArrayElement(animationData, firstIndex, secondIndex);

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
    if (animationData.length) {
      setAnimationData([]);
    }
  }

  function onClickHandler() {
    if (inputValue) {
      const { animationData, swapLog } = reverseString(inputValue);

      setSwapLog(swapLog);
      setAnimationData(animationData);
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
            style={{ width: "178px" }}
          />
        </div>

        <div className={styles.animaionContainer}>
          {inputValue &&
            !animationData.length &&
            inputValue
              .split("")
              .map((ltr, index) => <Circle letter={ltr} key={index} />)}

          {Boolean(animationData.length) &&
            animationData.map((elem, index) => (
              <Circle letter={elem.value} key={index} state={elem.state} />
            ))}
        </div>
      </SectionContainer>
    </SolutionLayout>
  );
};
